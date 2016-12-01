/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, Platform, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR, RES_USER_AVATARS, GENDERS} from '../../config';
import logger from '../../logger';
import * as components from '../';
import * as helpers from '../helpers';

export default class EditProfileNickname extends Component {
  render() {
    let {sceneKey, loading, processing, error, input, sceneState, object, 
      account, saveInput, setSceneState, submitGender} = this.props;
    let user = helpers.userFromCache(object, account.userId);
    return (
      <View>
        <components.TextNotice>基本资料</components.TextNotice>
        <components.Block>
          <components.BlockItem
            leftText='昵称'
            rightText={user.nickname || '未填写'}
            rightIcon='angle-right'
            onPress={() => Actions.EditProfileNickname()}
            containerStyle={{borderTopWidth: 0}}
          />
          <components.BlockItem
            leftText='头像'
            rightImage={helpers.userAvatarSource(user)}
            rightIcon='angle-right'
            onPress={() => Actions.EditProfileAvatar()}
            imageStyle={{borderRadius: 5}}
            containerStyle={{height: 60}}
          />
          <components.BlockItem
            leftText='性别'
            rightText={user.gender ? (user.gender == 'm' ? '男' : '女') : '未选择'}
            rightIcon='angle-right'
            onPress={() => setSceneState(sceneKey, {genderPickerVisible: true})}
          />
        </components.Block>
        <components.GenderPicker
          visible={sceneState[sceneKey].genderPickerVisible}
          setVisible={(visible) => setSceneState(sceneKey, {genderPickerVisible: visible})}
          items={GENDERS}
          selectedValue={input[sceneKey].gender}
          onShow={() => saveInput(sceneKey, {gender: user.gender})}
          onValueChange={(value, index) => saveInput(sceneKey, {gender: value})}
          submit={() => submitGender(sceneKey)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
