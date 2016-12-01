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

export default class RegisterVerify extends Component {
  componentWillMount() {
    let {sceneKey, saveInput, setSceneState} = this.props;
    let {mobile, password} = this.props;
    saveInput(sceneKey, {mobile, password});
    setSceneState(sceneKey, {secondsToSend: 30});

    this.timerSend = setInterval(
      () => {
        let {sceneKey, sceneState, setSceneState} = this.props;
        let {secondsToSend} = sceneState[sceneKey];
        if (secondsToSend > 0) {
          setSceneState(sceneKey, {secondsToSend: secondsToSend - 1});
        }
      },
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerSend);
  }

  render() {
    let {sceneKey, loading, processing, error, input, sceneState, errorFlash, 
      saveInput, setSceneState} = this.props;
    let {sendVerifyCode, submit} = this.props;
    let {mobile} = input[sceneKey];
    let {secondsToSend} = sceneState[sceneKey];

    return (
      <components.Layout 
        sceneKey={sceneKey} 
        loading={loading} 
        processing={processing} 
        error={error}
        renderTitle={() => components.NavBarTitle({title: '手机号验证'})}
      >
        <components.TextNotice>验证码短信已发送，请注意查收。</components.TextNotice>
        <components.Form>
          <components.FormItem iconName='key' containerStyle={{borderTopWidth: 0}}>
            <components.TextInput
              placeholder='输入验证码'
              maxLength={4}
              keyboardType='numeric'
              defaultValue={input[sceneKey].code}
              autoFocus={true}
              onChangeText={(text) => saveInput(sceneKey, {code: text.trim()})}
              onSubmitEditing={() => {dismissKeyboard(); submit(sceneKey);}}
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
                  setSceneState(sceneKey, {secondsToSend: 30});
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
            onPress={() => {dismissKeyboard(); submit(sceneKey);}}
          />
        </View>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({});
