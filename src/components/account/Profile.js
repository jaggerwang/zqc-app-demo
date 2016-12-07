/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, Platform, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR, RES_USER_AVATARS, GENDERS} from '../../config';
import logger from '../../logger';
import * as components from '../';
import * as helpers from '../helpers';

export default class Profile extends Component {
  render() {
    let {navigator, input, screen, object, account, screenName, saveInput, setScreenState, 
      submitGender} = this.props;
    let user = helpers.userFromCache(object, account.userId);
    return (
      <View>
        <components.TextNotice>基本资料</components.TextNotice>
        <components.Block>
          <components.BlockItem
            leftText='昵称'
            rightText={user.nickname || '未填写'}
            rightIcon='angle-right'
            onPress={() => navigator.push({screen: 'zqc.EditProfileNickname', title: '修改昵称'})}
            containerStyle={{borderTopWidth: 0}}
          />
          <components.BlockItem
            leftText='头像'
            rightImage={helpers.userAvatarSource(user)}
            rightIcon='angle-right'
            onPress={() => navigator.push({screen: 'zqc.EditProfileAvatar', title: '修改头像'})}
            imageStyle={{borderRadius: 5}}
            containerStyle={{height: 60}}
          />
          <components.BlockItem
            leftText='性别'
            rightText={user.gender ? (user.gender == 'm' ? '男' : '女') : '未选择'}
            rightIcon='angle-right'
            onPress={() => setScreenState(screenName, {genderPickerVisible: true})}
          />
        </components.Block>
        <components.GenderPicker
          visible={screen[screenName].genderPickerVisible}
          setVisible={(visible) => setScreenState(screenName, {genderPickerVisible: visible})}
          items={GENDERS}
          selectedValue={input[screenName].gender}
          onShow={() => saveInput(screenName, {gender: user.gender})}
          onValueChange={(value, index) => saveInput(screenName, {gender: value})}
          submit={() => submitGender(screenName)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
