/**
 * 在球场
 * zaiqiuchang.com
 */

import {Keyboard, NetInfo, Platform} from 'react-native';
import {Provider} from 'react-redux';
import compareVersions from 'compare-versions';
import AMapLocation from 'react-native-amap-location';
import coordtransform from 'coordtransform';
import * as WeChat from 'react-native-wechat';

import {VERSION, WECHAT} from './config';
import logger from './logger';
import {createPersistAppStore} from './store';
import {loadIconImages} from './iconImages';
import {registerScreens, navToBootstrap} from './navigation';
import * as actions from './actions';

export default function setup() {
  loadIconImages()
    .then(() => createPersistAppStore())
    .then(({store, state}) => {
      let {dispatch, getState} = store;

      let version = state.store ? state.store.version : undefined;
      if (version === undefined || compareVersions(version, VERSION) < 0) {
        dispatch(actions.reset());
        dispatch(actions.setStoreVersion(VERSION));
      }
      dispatch(actions.resetScreenLastRefreshTime());

      if (Platform.OS != 'ios') {
        NetInfo.isConnected.fetch().then(isConnected => 
          dispatch(actions.setNetwork({isConnected}))
        );
        NetInfo.fetch().then(reach => {
          reach = (reach == 'cell' || 
            reach.startsWith('MOBILE')) ? 'mobile' : 'wifi';
          dispatch(actions.setNetwork({reach}));
        });
      }
      NetInfo.isConnected.addEventListener(
        'change', 
        isConnected => {
          let {network} = getState();
          dispatch(actions.setNetwork({isConnected}));
          if (network.isConnected !== undefined) {
            dispatch(actions.errorFlash(
              isConnected === true ? '网络已恢复。' : '网络不可用。'));
          }
        },
      );
      NetInfo.addEventListener(
        'change',
        reach => {
          reach = (reach == 'cell' || 
            reach.startsWith('MOBILE')) ? 'mobile' : 'wifi';
          let {network} = getState();
          dispatch(actions.setNetwork({reach}));
          if (network.reach !== undefined) {
            actions.errorFlash(
              reach == 'mobile' ? '当前为移动网络。' : '当前为WIFI网络。');
          }
        },
      );

      let getPositionSuccess = position => 
        dispatch(actions.setLocationPosition(position));
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
        let cbSuccess = position => {
          if (position) {
            let gcj02 = coordtransform.wgs84togcj02(
              position.coords.longitude, position.coords.latitude);
            position.coords.longitude = gcj02[0];
            position.coords.latitude = gcj02[1];
          }
          getPositionSuccess(position);
        };
        navigator.geolocation.getCurrentPosition(
          cbSuccess, getPositionError, getPositionOptions);
        navigator.geolocation.watchPosition(
          cbSuccess, getPositionError, getPositionOptions);
      }

      Keyboard.addListener('keyboardDidShow',
        event => dispatch(actions.setKeyboard({coords: event.endCoordinates})));
      Keyboard.addListener('keyboardDidHide', 
        event => dispatch(actions.setKeyboard({coords: null})));

      WeChat.registerApp(WECHAT.app.id);

      registerScreens(store, Provider);
      navToBootstrap();
    })
    .catch(error => logger.warn(error));
}
