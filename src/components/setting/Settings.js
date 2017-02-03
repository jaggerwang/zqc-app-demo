/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, Switch} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {COLOR, DEFAULT_NAV_BAR_STYLE} from '../../config';
import {VIDEO_RATES} from '../../const';
import * as components from '../';
import * as helpers from '../../helpers';
import * as actions from '../../actions';

class Settings extends Component {
  static navigatorStyle = DEFAULT_NAV_BAR_STYLE;

  constructor(props) {
    super(props);
    
    this.screenId = props.screenId || 'Settings';
  }
  
  render() {
    let {navigator, loading, processing, error, account, setAccountSettings, 
      updateAccountSettings} = this.props;
    let {settings} = account;

    let playRateWifi = VIDEO_RATES.find(v => v.value == settings.video.playRate.wifi);
    let playRateMobile = VIDEO_RATES.find(v => v.value == settings.video.playRate.mobile);
    let uploadRateWifi = VIDEO_RATES.find(v => v.value == settings.video.uploadRate.wifi);
    let uploadRateMobile = VIDEO_RATES.find(v => v.value == settings.video.uploadRate.mobile);

    let usedAmountMonth = (settings.storage.usedAmountMonth / Math.pow(1024, 3)).toFixed(2);
    let quota = Math.round(settings.storage.quota / Math.pow(1024, 3));

    return (
      <components.Layout screenId={this.screenId}>
        <components.Block containerStyle={{marginTop: 10, paddingVertical: 0}}>
          <components.BlockItem
            leftText='本月已用存储'
            rightText={`${usedAmountMonth}G / ${quota}G`}
            containerStyle={{borderTopWidth: 0}}
          />
        </components.Block>

        <components.Block containerStyle={{marginTop: 10, paddingVertical: 0}}>
          <components.BlockItem
            leftText='WIFI网络自动播放'
            rightComponent={
              <Switch 
                value={settings.video.autoPlay.wifi} 
                onValueChange={value => {
                  let newSettings = {
                    ...settings,
                    video: {
                      ...settings.video,
                      autoPlay: {
                        ...settings.video.autoPlay,
                        wifi: value,
                      },
                    },
                  };
                  setAccountSettings(newSettings);
                  updateAccountSettings(newSettings);
                }}
              />
            }
            containerStyle={{borderTopWidth: 0}}
          />
          <components.BlockItem
            leftText='移动网络自动播放'
            rightComponent={
              <Switch 
                value={settings.video.autoPlay.mobile} 
                onValueChange={value => {
                  let newSettings = {
                    ...settings,
                    video: {
                      ...settings.video,
                      autoPlay: {
                        ...settings.video.autoPlay,
                        mobile: value,
                      },
                    },
                  };
                  setAccountSettings(newSettings);
                  updateAccountSettings(newSettings);
                }}
              />
            }
          />
        </components.Block>

        <components.Block containerStyle={{marginTop: 10, paddingVertical: 0}}>
          <components.BlockItem
            leftText='WIFI网络播放画质'
            rightText={playRateWifi.label}
            rightIcon='keyboard-arrow-right'
            onPress={() => navigator.push({
              screen: 'zqc.SelectRate', 
              title: '选择播放画质', 
              passProps: {
                selected: playRateWifi.value, 
                onSelect: rate => {
                  let newSettings = {
                    ...settings,
                    video: {
                      ...settings.video,
                      playRate: {
                        ...settings.video.playRate,
                        wifi: rate,
                      },
                    },
                  };
                  setAccountSettings(newSettings);
                  updateAccountSettings(newSettings);
                },
              },
            })}
            containerStyle={{borderTopWidth: 0}}
          />
          <components.BlockItem
            leftText='移动网络播放画质'
            rightText={playRateMobile.label}
            rightIcon='keyboard-arrow-right'
            onPress={() => navigator.push({
              screen: 'zqc.SelectRate', 
              title: '选择播放画质', 
              passProps: {
                selected: playRateMobile.value, 
                onSelect: rate => {
                  let newSettings = {
                    ...settings,
                    video: {
                      ...settings.video,
                      playRate: {
                        ...settings.video.playRate,
                        mobile: rate,
                      },
                    },
                  };
                  setAccountSettings(newSettings);
                  updateAccountSettings(newSettings);
                },
              },
            })}
          />
        </components.Block>

        <components.Block containerStyle={{marginTop: 10, paddingVertical: 0}}>
          <components.BlockItem
            leftText='WIFI网络上传画质'
            rightText={uploadRateWifi.label}
            rightIcon='keyboard-arrow-right'
            onPress={() => navigator.push({
              screen: 'zqc.SelectRate', 
              title: '选择上传画质', 
              passProps: {
                selected: uploadRateWifi.value, 
                onSelect: rate => {
                  let newSettings = {
                    ...settings,
                    video: {
                      ...settings.video,
                      uploadRate: {
                        ...settings.video.uploadRate,
                        wifi: rate,
                      },
                    },
                  };
                  setAccountSettings(newSettings);
                  updateAccountSettings(newSettings);
                },
              },
            })}
            containerStyle={{borderTopWidth: 0}}
          />
          <components.BlockItem
            leftText='移动网络上传画质'
            rightText={uploadRateMobile.label}
            rightIcon='keyboard-arrow-right'
            onPress={() => navigator.push({
              screen: 'zqc.SelectRate', 
              title: '选择上传画质', 
              passProps: {
                selected: uploadRateMobile.value, 
                onSelect: rate => {
                  let newSettings = {
                    ...settings,
                    video: {
                      ...settings.video,
                      uploadRate: {
                        ...settings.video.uploadRate,
                        mobile: rate,
                      },
                    },
                  };
                  setAccountSettings(newSettings);
                  updateAccountSettings(newSettings);
                },
              },
            })}
          />
        </components.Block>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center', 
    marginVertical: 50, 
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

function mapStateToProps(state) {
  let {account} = state;
  return {
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
