/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';

import {COLOR, DEFAULT_NAV_BAR_STYLE} from '../../config';
import * as components from '../';

export default class Login extends Component {
  static navigatorStyle = DEFAULT_NAV_BAR_STYLE;

  componentDidMount() {
    let {input, submit, autoLogin, cbOk} = this.props;
    let {account, password} = input['Login'];
    if (autoLogin && account && password) {
      submit('Login', cbOk);
    }
  }
  
  render() {
    let {loading, processing, error, input, saveInput, submit} = this.props;
    let {account, password} = input['Login'];
    return (
      <components.Layout
        loading={loading}
        processing={processing}
        errorFlash={error.flash}
        errorInput={error.input['Login']}
      >
        <components.Form>
          <components.FormItem iconName='user' containerStyle={{borderTopWidth: 0}}>
            <components.TextInput
              placeholder='输入手机号'
              returnKeyType='next'
              defaultValue={account}
              autoFocus={true}
              onChangeText={(text) => saveInput('Login', {account: text.trim()})}
              onSubmitEditing={() => this.refPassword.focus()}
            />
          </components.FormItem>
          <components.FormItem iconName='lock'>
            <components.TextInput
              placeholder='输入密码'
              returnKeyType='done'
              secureTextEntry={true}
              defaultValue={password}
              onRef={(ref) => this.refPassword = ref}
              onChangeText={(text) => saveInput('Login', {password: text.trim()})}
              onSubmitEditing={() => {dismissKeyboard(); submit('Login');}}
            />
          </components.FormItem>
        </components.Form>
        <components.ButtonWithBg
          text='登录'
          onPress={() => {dismissKeyboard(); submit('Login');}}
          textStyle={{fontSize: 16}}
        />
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({});
