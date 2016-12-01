/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import dismissKeyboard from 'dismissKeyboard';

import {COLOR} from '../../config';
import * as components from '../';

export default class RegisterMobile extends Component {
  render() {
    let {sceneKey, loading, processing, error, input, saveInput, submit} = this.props;
    return (
      <components.Layout 
        sceneKey={sceneKey} 
        loading={loading} 
        processing={processing} 
        error={error}
        renderTitle={() => components.NavBarTitle({title: '手机号注册'})}
      >
        <components.TextNotice>在球场Demo版注册的帐号与正式版通用。Demo版仅包含基本功能，完整功能请到官网 zaiqiuchang.com 下载安装正式版体验。</components.TextNotice>
        <components.Form>
          <components.FormItem iconName='mobile-phone' containerStyle={{borderTopWidth: 0}}>
            <components.TextInput
              placeholder='输入手机号'
              keyboardType='numeric'
              returnKeyType='next'
              defaultValue={input[sceneKey].mobile}
              autoFocus={true}
              onRef={(ref) => this.refMobile = ref}
              onChangeText={(text) => saveInput(sceneKey, {mobile: text.trim()})}
              onSubmitEditing={() => this.refPassword.focus()}
            />
          </components.FormItem>
          <components.FormItem iconName='lock'>
            <components.TextInput
              placeholder='设置登录密码，不少于6位'
              returnKeyType='done'
              secureTextEntry={true}
              defaultValue={input[sceneKey].password}
              onRef={(ref) => this.refPassword = ref}
              onChangeText={(text) => saveInput(sceneKey, {password: text.trim()})}
              onSubmitEditing={() => {dismissKeyboard(); submit(sceneKey);}}
            />
          </components.FormItem>
        </components.Form>
        <components.ButtonWithBg
          text='下一步'
          onPress={() => {dismissKeyboard(); submit(sceneKey);}}
          textStyle={{fontSize: 16}}
        />
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({});
