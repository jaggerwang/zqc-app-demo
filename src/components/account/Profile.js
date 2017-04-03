/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../';
import * as helpers from '../../helpers';
import * as actions from '../../actions';

function Profile({navigator, object, account}) {
  let user = helpers.userFromCache(object, account.id);
  
  return (
    <View>
      <components.TextNotice>基本资料</components.TextNotice>
      <components.Block containerStyle={{paddingVertical: 0}}>
        <components.BlockItem
          leftText="昵称"
          rightText={user.nickname || '未填写'}
          rightIcon="keyboard-arrow-right"
          onPress={() => navigator.push(
            {screen: 'zqc.EditProfileNickname', title: '修改昵称'})}
          containerStyle={{borderTopWidth: 0}}
        />
        <components.BlockItem
          leftText="头像"
          rightImage={helpers.userAvatarSource(user)}
          rightIcon="keyboard-arrow-right"
          onPress={() => navigator.push(
            {screen: 'zqc.EditProfileAvatar', title: '设置头像'})}
          imageStyle={{borderRadius: 5}}
          containerStyle={{height: 60}}
        />
        <components.BlockItem
          leftText="性别"
          rightText={user.gender ? (user.gender == 'm' ? '男' : '女') : '未选择'}
          rightIcon="keyboard-arrow-right"
          onPress={() => navigator.showModal(
            {screen: 'zqc.EditProfileGender'})}
        />
      </components.Block>
      
      <components.TextNotice>可选资料</components.TextNotice>
      <components.Block containerStyle={{paddingVertical: 0}}>
        <components.BlockItem
          leftText="邮箱"
          rightText={user.email || '可用于登录和找回密码'}
          rightIcon="keyboard-arrow-right"
          onPress={() => navigator.push(
            {screen: 'zqc.EditProfileEmail', title: '修改邮箱'})}
          containerStyle={{borderTopWidth: 0}}
        />
        <components.BlockItem
          leftText="个性签名"
          rightText={user.intro ? user.intro.substring(0, 20) : '未填写'}
          rightIcon="keyboard-arrow-right"
          onPress={() => navigator.push(
            {screen: 'zqc.EditProfileIntro', title: '修改签名'})}
        />
        <components.BlockItem
          leftText="主页背景"
          rightImage={helpers.userBackgroundSource(user)}
          rightIcon="keyboard-arrow-right"
          onPress={() => navigator.push(
            {screen: 'zqc.EditProfileBackground', title: '设置主页背景'})}
          containerStyle={{height: 60}}
        />
      </components.Block>
    </View>
  );
}

function mapStateToProps(state) {
  let {object, account} = state;
  return {
    object,
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
