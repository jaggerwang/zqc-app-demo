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

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'Login';
  }
  
  render() {
    let {navigator, loading, processing, error, input, saveInput, submit} = this.props;
    let {account, password} = input[this.screenId];
    return (
      <components.Layout
        loading={loading}
        processing={processing}
        errorFlash={error.flash}
        errorInput={error.input[this.screenId]}
      >
        <components.Form>
          <components.FormItem iconName='user' containerStyle={{borderTopWidth: 0}}>
            <components.TextInput
              placeholder='输入手机号'
              returnKeyType='next'
              defaultValue={account}
              autoFocus={true}
              onChangeText={(text) => saveInput(this.screenId, {account: text.trim()})}
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
              onChangeText={(text) => saveInput(this.screenId, {password: text.trim()})}
              onSubmitEditing={() => {dismissKeyboard(); submit(this.screenId, navigator);}}
            />
          </components.FormItem>
        </components.Form>
        <components.ButtonWithBg
          text='登录'
          onPress={() => {dismissKeyboard(); submit(this.screenId, navigator);}}
          textStyle={{fontSize: 16}}
        />
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({});
