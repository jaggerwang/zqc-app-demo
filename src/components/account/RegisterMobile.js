/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import dismissKeyboard from 'dismissKeyboard';

import {COLOR, DEFAULT_NAV_BAR_STYLE} from '../../config';
import * as components from '../';

export default class RegisterMobile extends Component {
  static navigatorStyle = DEFAULT_NAV_BAR_STYLE;

  render() {
    let {navigator, loading, processing, error, screenId=this.constructor.name, 
      input, saveInput, submit} = this.props;
    let {mobile, password} = input[screenId];
    return (
      <components.Layout
        loading={loading}
        processing={processing}
        errorFlash={error.flash}
        errorInput={error.input[screenId]}
      >
        <components.TextNotice>在球场Lite版注册的帐号与完整版通用。Lite版仅包含基本功能，完整功能请到官网 zaiqiuchang.com 下载安装完整版体验。</components.TextNotice>
        <components.Form>
          <components.FormItem iconName='mobile-phone' containerStyle={{borderTopWidth: 0}}>
            <components.TextInput
              placeholder='输入手机号'
              keyboardType='numeric'
              returnKeyType='next'
              defaultValue={mobile}
              autoFocus={true}
              onRef={(ref) => this.refMobile = ref}
              onChangeText={(text) => saveInput(screenId, {mobile: text.trim()})}
              onSubmitEditing={() => this.refPassword.focus()}
            />
          </components.FormItem>
          <components.FormItem iconName='lock'>
            <components.TextInput
              placeholder='设置登录密码，不少于6位'
              returnKeyType='done'
              secureTextEntry={true}
              defaultValue={password}
              onRef={(ref) => this.refPassword = ref}
              onChangeText={(text) => saveInput(screenId, {password: text.trim()})}
              onSubmitEditing={() => {dismissKeyboard(); submit(screenId, navigator);}}
            />
          </components.FormItem>
        </components.Form>
        <components.ButtonWithBg
          text='下一步'
          onPress={() => {dismissKeyboard(); submit(screenId, navigator);}}
          textStyle={{fontSize: 16}}
        />
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({});
