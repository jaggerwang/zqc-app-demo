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

export default class Login extends Component {
  componentDidMount() {
    let {sceneKey, input, submit, autoLogin, cbOk} = this.props;
    let {account, password} = input[sceneKey];
    if (autoLogin && account && password) {
      submit(sceneKey, cbOk);
    }
  }
  
  render() {
    let {sceneKey, loading, processing, error, input, saveInput, submit} = this.props;
    let {account, password} = input[sceneKey];

    return (
      <components.Layout 
        sceneKey={sceneKey} 
        loading={loading} 
        processing={processing} 
        error={error}
        renderTitle={() => components.NavBarTitle({title: '登录'})}
      >
        <components.Form>
          <components.FormItem iconName='user' containerStyle={{borderTopWidth: 0}}>
            <components.TextInput
              placeholder='输入手机号'
              returnKeyType='next'
              defaultValue={account}
              autoFocus={true}
              onChangeText={(text) => saveInput(sceneKey, {account: text.trim()})}
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
              onChangeText={(text) => saveInput(sceneKey, {password: text.trim()})}
              onSubmitEditing={() => {dismissKeyboard(); submit(sceneKey);}}
            />
          </components.FormItem>
        </components.Form>
        <components.ButtonWithBg
          text='登录'
          onPress={() => {dismissKeyboard(); submit(sceneKey);}}
          textStyle={{fontSize: 16}}
        />
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({});
