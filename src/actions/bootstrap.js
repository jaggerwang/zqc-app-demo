/**
 * 在球场
 * zaiqiuchang.com
 */

import {Alert, Keyboard, NetInfo, Platform} from 'react-native';
import AMapLocation from 'react-native-amap-location';
import geolib from 'geolib';

import logger from '../logger';
import {navToTab} from '../navigation';
import * as apis from '../apis';
import * as utils from '../utils';
import * as actions from './';

let {geolocation} = navigator;

export const RESET = 'reset';

export function reset() {
  return {
    type: RESET,
  };
}

let booted = false;

export function bootstrap(navigator) {
  return (dispatch, getState) => {
    if (!booted) {
      if (Platform.OS != 'ios') {
        NetInfo.isConnected.fetch().then(isConnected => dispatch(actions.setNetwork({isConnected})));
      }
      NetInfo.isConnected.addEventListener(
        'change', 
        isConnected => {
          let {network} = getState();
          dispatch(actions.setNetwork({isConnected}));
          if (network.isConnected === true && !isConnected) {
            dispatch(actions.errorFlash('网络不可用。'));
          } else if (network.isConnected === false && isConnected) {
            dispatch(actions.errorFlash('网络已恢复。'));
          }
        },
      );

      let getPositionSuccess = position => dispatch(actions.setLocationPosition(position));
      let getPositionError = error => logger.warn(error);
      let getPositionOptions = {
        enableHighAccuracy: Platform.OS == 'ios',
        timeout: 5000,
        maximumAge: 600000,
      };
      if (Platform.OS == 'android') {
        AMapLocation.addEventListener(position => {
          if (position.latitude && position.longitude) {
            getPositionSuccess({
              coords: {
                latitude: position.latitude,
                longitude: position.longitude,
                altitude: 0,
              },
              timestamp: new Date().getTime(),
            });
          } else {
            getPositionError(position);
          }
        });
        AMapLocation.startLocation({
          interval: 5000,
          httpTimeOut: 5000,
        });
      } else {
        geolocation.getCurrentPosition(getPositionSuccess, getPositionError, getPositionOptions);
        geolocation.watchPosition(getPositionSuccess, getPositionError, getPositionOptions);
      }

      let keyboardShowListener = Keyboard.addListener('keyboardDidShow', event => {
        dispatch(actions.setKeyboard({coords: event.endCoordinates}));
      });
      let keyboardHideListener = Keyboard.addListener('keyboardDidHide', event => {
        dispatch(actions.resetKeyboard());
      });

      booted = true;
    }

    dispatch(actions.processingTask('正在检测网络和获取位置'));
    utils.waitingFor({
      condition: () => {
        let {location, network} = getState();
        return (network.isConnected && location.position);
      },
      cbOk: () => {
        dispatch(actions.processingTask(''));
        login(navigator, dispatch, getState);
      },
      cbFail: () => {
        dispatch(actions.processingTask(''));
        let {location, network} = getState();

        if (!location.position) {
          dispatch(actions.errorFlash('获取位置失败。为了获得更好体验，请授权在球场使用定位服务。'));
        }

        if (!network.isConnected) {
          Alert.alert(
            '网络不可用',
            '请打开WIFI或移动网络后重试。',
            [
              {text: '重试', onPress: () => dispatch(bootstrap(navigator))},
              {text: '离线模式', onPress: () => {
                let {object, account} = getState();
                let user = object.users[account.userId];
                if (user) {
                  if (user.nickname && user.avatarType && user.gender) {
                    navToTab();
                  } else {
                    navigator.push({screen: 'zqc.RegisterProfile', title: '完善资料'});
                  }
                } else {
                  dispatch(actions.errorFlash('尚未登录过任何帐号。'));
                  dispatch(bootstrap(navigator));
                }
              }},
            ],
          );
        } else {
          login(navigator, dispatch, getState);
        }
      },
      maxTimes: 5,
    });
  };
}

function login(navigator, dispatch, getState) {
  apis.isLogined()
    .then(response => {
      let {data: {user}} = response;
      if (user) {
        let cbOk = () => {
          if (user.nickname && user.avatarType && user.gender) {
            navToTab();
          } else {
            navigator.resetTo({screen: 'zqc.RegisterProfile', title: '完善资料'});
          }
        };
        dispatch(actions.setAccount({user, cbOk}));
      } else {
        navigator.resetTo({screen: 'zqc.PreLogin', title: ''});
      }
    })
    .catch(error => {
      Alert.alert(
        '启动出错',
        error.message,
        [
          {text: '重试', onPress: () => dispatch(bootstrap(navigator))},
          {text: '清缓存', onPress: () => {
            dispatch(reset());
            dispatch(bootstrap(navigator));
          }},
        ],
      );
    });
}
