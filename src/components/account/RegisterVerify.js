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

export default class RegisterVerify extends Component {
  static navigatorStyle = DEFAULT_NAV_BAR_STYLE;

  componentWillMount() {
    let {screenId=this.constructor.name, setScreenState} = this.props;
    setScreenState(screenId, {secondsToSend: 30});

    this.timerSend = setInterval(
      () => {
        let {screen, setScreenState} = this.props;
        let {secondsToSend} = screen[screenId];
        if (secondsToSend > 0) {
          setScreenState(screenId, {secondsToSend: secondsToSend - 1});
        }
      },
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerSend);
  }

  render() {
    let {navigator, loading, processing, error, screenId=this.constructor.name, 
      input, screen, saveInput, setScreenState, sendVerifyCode, submit} = this.props;
    let {mobile} = input['RegisterMobile'];
    let {code} = input[screenId];
    let {secondsToSend} = screen[screenId];

    return (
      <components.Layout
        loading={loading}
        processing={processing}
        errorFlash={error.flash}
        errorInput={error.input[screenId]}
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
              onChangeText={(text) => saveInput(screenId, {code: text.trim()})}
              onSubmitEditing={() => {dismissKeyboard(); submit(screenId, navigator);}}
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
                  setScreenState(screenId, {secondsToSend: 30});
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
            onPress={() => {dismissKeyboard(); submit(screenId, navigator);}}
          />
        </View>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({});
