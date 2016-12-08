/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ListView, ScrollView, RefreshControl, 
  TouchableOpacity, InteractionManager} from 'react-native';

import {COLOR, DEFAULT_NAV_BAR_STYLE} from '../config';
import logger from '../logger';
import * as utils from '../utils';
import * as components from './';
import * as helpers from './helpers';

export default class Me extends Component {
  static navigatorStyle = DEFAULT_NAV_BAR_STYLE;

  render() {
    let {navigator, loading, processing, error, location, object, 
      disableLoading, enableLoading, errorFlash} = this.props;
    let {account, logoutRequest} = this.props;

    let user = helpers.userFromCache(object, account.userId);
    if (!user) {
      return null;
    }

    return (
      <components.Layout
        loading={loading}
        processing={processing}
        errorFlash={error.flash}
      >
        <ScrollView>
          <components.Block containerStyle={{flexDirection: 'row'}}>
            <components.Image 
              source={helpers.userAvatarSource(user, 'middle')}
              style={styles.userAvatar}
              containerStyle={{marginRight: 5}}
            />
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 25}}>
                <components.TextWithIcon 
                  iconName={user.gender == 'm' ? 'mars' : 'venus'} 
                  text={user.nickname} 
                  styleKind='emphaBig' 
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
                    iconName='thumbs-o-up' 
                    text={helpers.numberText(user.stat.liked)}
                    containerStyle={{marginRight: 5}}
                  />
                  <components.TextWithIcon 
                    iconName='plus-square-o' 
                    text={helpers.numberText(user.stat.post)}
                  />
                </View>
              </View>
              <View style={{justifyContent: 'center', height: 50}}>
                <components.Text>{user.intro || '暂无签名'}</components.Text>
              </View>
            </View>
          </components.Block>
          <components.Block containerStyle={{marginTop: 10}}>
            <components.BlockItem
              leftIcon='info-circle'
              leftText='关于'
              rightIcon='angle-right'
              onPress={() => navigator.push({screen: 'zqc.About', title: '关于'})}
              leftIconStyle={{color: COLOR.theme}}
              containerStyle={{borderTopWidth: 0}}
            />
          </components.Block>
          <components.ButtonWithBg
            text='退出当前帐号'
            onPress={() => logoutRequest()}
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
