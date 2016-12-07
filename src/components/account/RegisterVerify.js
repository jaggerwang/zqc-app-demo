/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import dismissKeyboard from 'dismissKeyboard';

import {COLOR} from '../../config';
import * as components from '../';

export default class RegisterVerify extends Component {
  componentWillMount() {
    let {setScreenState} = this.props;
    setScreenState('RegisterVerify', {secondsToSend: 30});

    this.timerSend = setInterval(
      () => {
        let {screen, setScreenState} = this.props;
        let {secondsToSend} = screen['RegisterVerify'];
        if (secondsToSend > 0) {
          setScreenState('RegisterVerify', {secondsToSend: secondsToSend - 1});
        }
      },
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerSend);
  }

  render() {
    let {navigator, loading, processing, error, input, screen, saveInput, 
      setScreenState, sendVerifyCode, submit} = this.props;
    let {mobile} = input['RegisterMobile'];
    let {code} = input['RegisterVerify'];
    let {secondsToSend} = screen['RegisterVerify'];

    return (
      <components.Layout
        loading={loading}
        processing={processing}
        errorFlash={error.flash}
        errorInput={error.input['RegisterVerify']}
      >
        <components.TextNotice>验证码短信已发送，请注意查收。</components.TextNotice>
        <components.Form>
          <components.FormItem iconName='key' containerStyle={{borderTopWidth: 0}}>
            <components.TextInput
              placeholder='输入验证码'
              maxLength={4}
              keyboardType='numeric'
              defaultValue={code}
              autoFocus={true}
              onChangeText={(text) => saveInput('RegisterVerify', {code: text.trim()})}
              onSubmitEditing={() => {dismissKeyboard(); submit('RegisterVerify', navigator);}}
            />
          </components.FormItem>
        </components.Form>
        <View style={{flexDirection: 'row'}}>
          <components.ButtonWithBg
            text={'重发'+(secondsToSend > 0 ? ' ('+secondsToSend+')' : '')}
            containerStyle={{flex: 1}}
            disable={secondsToSend > 0}
            onPress={
              secondsToSend == 0 ? 
              () => {
                dismissKeyboard();
                let cbOk = () => {
                  errorFlash('发送成功。');
                  setScreenState('RegisterVerify', {secondsToSend: 30});
                };
                sendVerifyCode({by: "mobile", mobile, cbOk});
              } : 
              null
            }
          />
          <components.ButtonWithBg
            text='下一步'
            textStyle={{fontSize: 16}}
            containerStyle={{flex: 2}}
            onPress={() => {dismissKeyboard(); submit('RegisterVerify', navigator);}}
          />
        </View>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({});
