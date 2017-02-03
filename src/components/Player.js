/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, CameraRoll, TouchableWithoutFeedback, 
  Alert, Platform, ActivityIndicator} from 'react-native';
import flattenStyle from 'flattenStyle';
import Video from 'react-native-video';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Orientation from 'react-native-orientation';

import {COLOR, DEFAULT_NAV_BAR_STYLE, SCREEN_WIDTH, SCREEN_HEIGHT} from '../config';
import logger from '../logger';
import {navToPostDetail} from '../navigation';
import {VIDEO_RATES} from '../const';
import * as components from './';
import * as helpers from '../helpers';
import * as actions from '../actions';

class Player extends Component {
  static navigatorStyle = Object.assign({}, DEFAULT_NAV_BAR_STYLE, {
    navBarBackgroundColor: COLOR.backgroundDarkLighter,
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarHideOnScroll: true,
    tabBarHidden: true,
  });

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'Player';

    let {navigator} = props;
    navigator.setButtons({
      rightButtons: [
        {
          title: '分享',
          id: 'share',
        },
      ], 
      leftButtons: [
        {
          title: '返回',
          id: 'back',
        },
      ],
    });
    navigator.setOnNavigatorEvent(event => this.onNavigatorEvent(event));
  }

  componentDidMount() {
    let {navigator, network} = this.props;
    if (!network.isConnected || !network.reach) {
      let message = (!network.isConnected ? '网络未连接。' : '未知网络类型');
      Alert.alert(
        '播放出错',
        message,
        [
          {text: '确认', onPress: () => navigator.pop()},
        ],
      );
      return;
    }

    let {autoPlay, account, setPlayerState} = this.props;
    if (autoPlay === undefined) {
      autoPlay = account.settings.video.autoPlay[network.reach];
    }
    setPlayerState({paused: !autoPlay});

    this.autoHideNavBar();

    if (Platform.OS == 'ios') {
      this.orientationListener = orientation => {
        let {setPlayerState} = this.props;
        if (orientation == 'LANDSCAPE-LEFT') {
          setPlayerState({orientation: 'LANDSCAPE-LEFT'});
        } else if (orientation == 'LANDSCAPE-RIGHT') {
          setPlayerState({orientation: 'LANDSCAPE-RIGHT'});
        } else {
          setPlayerState({orientation: 'PORTRAIT'});
        }
      };
      Orientation.addSpecificOrientationListener(this.orientationListener);
      Orientation.unlockAllOrientations();
    }
  }

  componentWillUnmount() {
    let {resetPlayerState} = this.props;
    resetPlayerState();

    if (Platform.OS == 'ios') {
      Orientation.removeOrientationListener(this.orientationListener);
      Orientation.lockToPortrait();
    }
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'share') {
        this.shareVideoToWeChat();
      } else if (event.id == 'back') {
        this.back();
      }
    }
  }

  autoHideNavBar(seconds=3000) {
    clearTimeout(this.navBarHiddenTimeout);
    this.navBarHiddenTimeout = setTimeout(() => {
      let {player, setPlayerState} = this.props;
      let {paused} = player;
      if (!paused) {
        setPlayerState({navBarHidden: true, rateSelectorVisible: false});
      }
    }, seconds);
  }

  back() {
    let {navigator} = this.props;
    clearTimeout(this.navBarHiddenTimeout);
    navigator.pop();
  }

  shareVideoToWeChat() {
    let {file, shareVideoToWeChatTimeline, shareVideoToWeChatSession} = this.props;
    let options = ['朋友圈', '好友', '取消']
    this.actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: options.findIndex(v => v == '取消'),
        title: '分享到微信',
      },
      buttonIndex => {
        let url = helpers.fileVideoSource(file, 'hd').uri;
        let thumbUrl = helpers.fileImageSource(file, 'middle').uri;
        if (buttonIndex == options.findIndex(v => v == '朋友圈')) {
          shareVideoToWeChatTimeline({url, thumbUrl});
        } else if (buttonIndex == options.findIndex(v => v == '好友')) {
          shareVideoToWeChatSession({url, thumbUrl});
        }
      }
    );
  }

  render() {
    let {navigator, network, object, file, prevScreen, account, player, 
      errorFlash, setPlayerState} = this.props;

    if (!network.isConnected || !network.reach) {
      return null;
    }

    let {navBarHidden, orientation, isBuffering, loaded, paused, ended, rate, 
      rateSelectorVisible, naturalSize, currentTime, duration} = player;
    let pixelSize = helpers.filePixelSize(file);

    let maxRate = 'fhd';
    if (pixelSize[0] < 1280) {
      maxRate = 'ld';
    } else if (pixelSize[0] < 1920) {
      maxRate = 'hd';
    }
    rate = rate || account.settings.video.playRate[network.reach];
    if (maxRate == 'ld' && (rate == 'hd' || rate == 'fhd')) {
      rate = 'ld';
    } else if (maxRate == 'hd' && rate == 'fhd') {
      rate = 'hd';
    }

    navigator.toggleNavBar({'to': (navBarHidden ? 'hidden' : 'shown')});

    let width = orientation == 'PORTRAIT' ? SCREEN_WIDTH : SCREEN_HEIGHT;
    let height = orientation == 'PORTRAIT' ? SCREEN_HEIGHT : SCREEN_WIDTH;

    let {width: opBarWidth, height: opBarHeight} = flattenStyle(styles.opBar);
    let opBarLeft = Math.round((width - opBarWidth) / 2);
    let opBarTop = Math.round((height - opBarHeight) / 2);

    return (
      <components.Layout screenId={this.screenId}>
        <components.ActionSheet ref={ref => this.actionSheet = ref} />
        <TouchableWithoutFeedback
          onPress={() => {
            this.autoHideNavBar();
            setPlayerState({navBarHidden: !navBarHidden});
          }}
        >
          <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'black'}}>
            <Video 
              source={helpers.fileVideoSource(file, rate)}
              repeat={false}
              paused={paused}
              onLoadStart={event => {
                let {src} = event;
                setPlayerState({src});
              }}
              onLoad={event => {
                let {duration, naturalSize} = event;
                setPlayerState({duration, naturalSize, loaded: true});
                this.player.seek(0);
              }}
              onProgress={event => {
                if (Math.round(currentTime) != Math.round(event.currentTime)) {
                  let {currentTime, playableDuration} = event;
                  setPlayerState({currentTime, playableDuration});
                }
              }}
              onEnd={event => {
                setPlayerState({
                  navBarHidden: false, 
                  paused: true, 
                  ended: true,
                });
              }}
              onBuffer={event => {
                let {isBuffering} = event;
                setPlayerState({isBuffering});
              }}
              onError={error => logger.warn(error)}
              ref={ref => this.player = ref}
              style={[styles.video, {width, height: Math.round(width * pixelSize[1] / pixelSize[0])}]}
            />

            <View style={[styles.opBar, {top: opBarTop, left: opBarLeft}]}>
              {isBuffering ? 
              <ActivityIndicator color={COLOR.textNormal} size='small' /> : 
              (!navBarHidden ? 
              <View style={styles.opContainer}>
                {ended ? 
                <components.Icon 
                  name='replay' 
                  onPress={() => {
                    this.autoHideNavBar();
                    this.player.seek(0);
                    setPlayerState({ended: false, paused: false});
                  }}
                  style={styles.opText}
                /> : 
                <components.Icon 
                  name={paused ? 'play-circle-outline' : 'pause-circle-outline'} 
                  onPress={() => {
                    this.autoHideNavBar();
                    setPlayerState({paused: !paused});
                  }}
                  style={styles.opText}
                />}
              </View> : 
              null)}
            </View>
            
            {!navBarHidden ? 
            <View style={styles.ctlBar}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <components.Text style={styles.ctlBarText}>{helpers.durationText(currentTime)} / {helpers.durationText(duration)}</components.Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <components.Text style={styles.ctlBarText}
                  onPress={() => {
                    this.autoHideNavBar();
                    setPlayerState({rateSelectorVisible: !rateSelectorVisible});
                  }}
                >
                {helpers.videoRateText(rate)}
                </components.Text>

                {Platform.OS == 'ios' ? 
                <components.Icon 
                  name={orientation == 'PORTRAIT' ? 'fullscreen' : 'fullscreen-exit'}
                  onPress={() => {
                    this.autoHideNavBar();
                    if (orientation == 'PORTRAIT') {
                      setPlayerState({orientation: 'LANDSCAPE-LEFT'});
                      Orientation.lockToLandscapeLeft();
                    } else {
                      setPlayerState({orientation: 'PORTRAIT'});
                      Orientation.lockToPortrait();
                    }
                  }}
                  style={[styles.ctlBarText, {padding: 5, fontSize: 22}]}
                /> : 
                null}
              </View>
            </View> :
            null}

            {!navBarHidden && rateSelectorVisible ?
            <View style={styles.rateSelector}>
              {VIDEO_RATES.filter(v => {
                if (v.value == rate) {
                  return false;
                }
                if (maxRate == 'ld' && (v.value == 'hd' || v.value == 'fhd')) {
                  return false;
                } else if (maxRate == 'hd' && v.value == 'fhd') {
                  return false;
                }
                return true;
              })
                .map(({label, value}) => 
                  <components.Text
                    key={value}
                    onPress={() => {
                      this.autoHideNavBar();
                      setPlayerState({
                        rate: value, 
                        rateSelectorVisible: false, 
                        loaded: false,
                        paused: false, 
                        ended: false,
                      });
                    }}
                    style={styles.rateSelectorText}
                  >
                    {label}
                  </components.Text>
                )
            }
            </View> :
            null}
          </View>
        </TouchableWithoutFeedback>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({
  video: {},
  opBar: {
    position: 'absolute',
    width: 300,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  opContainer: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 10,
    backgroundColor: COLOR.backgroundDarkLighter + '80',
  },
  opText: {
    color: COLOR.textLightNormal,
    opacity: 0.8,
    backgroundColor: 'transparent',
    fontSize: 48,
    margin: 5,
  },
  ctlBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLOR.backgroundDarkLighter + '80',
  },
  ctlBarText: {
    color: COLOR.textLightNormal,
    fontSize: 12,
    padding: 10,
  },
  rateSelector: {
    position: 'absolute',
    bottom: 42,
    right: (Platform.OS == 'ios' ? 37 : 5),
    alignItems: 'flex-end',
  },
  rateSelectorText: {
    color: COLOR.textLightNormal,
    fontSize: 12,
    padding: 10,
  },
});

function mapStateToProps(state) {
  let {network, object, account, player} = state;
  return {
    network,
    object,
    account,
    player,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
