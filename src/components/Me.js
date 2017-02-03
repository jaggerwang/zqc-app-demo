/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ListView, ScrollView, RefreshControl, 
  TouchableOpacity, InteractionManager} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {COLOR, DEFAULT_NAV_BAR_STYLE, SCREEN_WIDTH, SCREEN_HEIGHT} from '../config';
import {navToBootstrap, navToUserDetail} from '../navigation';
import logger from '../logger';
import * as utils from '../utils';
import * as components from './';
import * as helpers from '../helpers';
import * as actions from '../actions';

class Me extends Component {
  static navigatorStyle = DEFAULT_NAV_BAR_STYLE;

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'Me';
  }
  
  refresh(cbFinish) {
    let {accountInfo} = this.props;

    let finished = 0;
    accountInfo({cbFinish: () => finished++});
    utils.waitingFor({
      condition: () => finished == 1,
      cbFinish,
    });
  }
  
  render() {
    let {navigator, screen, object, account, disableLoading, enableLoading, 
      setScreenState, logout} = this.props;
    let {refreshing} = screen[this.screenId];

    let user = helpers.userFromCache(object, account.id);
    if (!user) {
      return null;
    }

    return (
      <components.Layout screenId={this.screenId}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                disableLoading();
                setScreenState(this.screenId, {refreshing: true});
                this.refresh(() => {
                  setScreenState(this.screenId, {refreshing: false});
                  enableLoading();
                });
              }}
            />
          }
        >
          <components.Block containerStyle={{flexDirection: 'row'}}>
            <components.Image 
              source={helpers.userAvatarSource(user, 'middle')}
              onPress={() => navToUserDetail(navigator, user)} 
              style={styles.userAvatar}
              containerStyle={{marginRight: 5}}
            />
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 25}}>
                <components.TextWithIcon 
                  icon={user.gender == 'm' ? 'person' : 'person'} 
                  text={user.nickname} 
                  style={{fontSize: 14, color: COLOR.textEmpha}} 
                  onPress={() => navToUserDetail(navigator, user)}
                />
                <components.Button
                  text='编辑资料'
                  onPress={() => navigator.push({screen: 'zqc.EditProfile', title: '编辑资料'})}
                  containerStyle={{margin: 0, padding: 5}}
                  textStyle={{fontSize: 12}}
                />
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 25}}>
                <View style={{flexDirection: 'row'}}>
                  <components.TextWithIcon 
                    icon='thumb-up' 
                    text={helpers.numberText(user.stat.liked)}
                    containerStyle={{marginRight: 5}}
                  />
                  <components.TextWithIcon 
                    icon='add-box' 
                    text={helpers.numberText(user.stat.post)}
                  />
                </View>
              </View>
              <View style={{justifyContent: 'center', height: 50}}>
                <components.Text>{user.intro || '暂无签名'}</components.Text>
              </View>
            </View>
          </components.Block>

          <components.Block containerStyle={{marginTop: 10, paddingVertical: 0}}>
            <components.BlockItem
              leftIcon='settings'
              leftText='设置'
              rightIcon='keyboard-arrow-right'
              onPress={() => navigator.push({screen: 'zqc.Settings', title: '设置'})}
              leftIconStyle={{color: COLOR.theme}}
              containerStyle={{borderTopWidth: 0}}
            />
          </components.Block>

          <components.Block containerStyle={{marginTop: 10, paddingVertical: 0}}>
            <components.BlockItem
              leftIcon='info'
              leftText='关于'
              rightIcon='keyboard-arrow-right'
              onPress={() => navigator.push({screen: 'zqc.About', title: '关于'})}
              leftIconStyle={{color: COLOR.theme}}
              containerStyle={{borderTopWidth: 0}}
            />
          </components.Block>
          <components.ButtonWithBg
            text='退出当前帐号'
            onPress={() => logout(() => navToBootstrap({isReset: true}))}
            textStyle={{fontSize: 16}}
            containerStyle={{marginTop: 20}}
          />
        </ScrollView>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

function mapStateToProps(state) {
  let {screen, object, account} = state;
  return {
    screen,
    object,
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Me);
