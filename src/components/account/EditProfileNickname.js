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

export default class EditProfileNickname extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: '取消',
        id: 'cancel',
      },
    ],
    rightButtons: [
      {
        title: '完成',
        id: 'done',
      },
    ],
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    let {navigator, submit} = this.props;
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'done') {
        submit('EditProfileNickname', navigator);
      } else if (event.id == 'cancel') {
        navigator.pop();
      }
    }
  }

  componentDidMount() {
    let {object, account, saveInput} = this.props;
    let user = object.users[account.userId];
    if (user.nickname) {
      saveInput('EditProfileNickname', {nickname: user.nickname});  
    }
  }

  render() {
    let {loading, processing, error, input, saveInput} = this.props;
    return (
      <components.Layout
        loading={loading}
        processing={processing}
        errorFlash={error.flash}
        errorInput={error.input['EditProfileNickname']}
      >
        <components.Form>
          <components.FormItem iconName='user' containerStyle={{borderTopWidth: 0}}>
            <components.TextInput
              placeholder='输入昵称'
              returnKeyType='done'
              defaultValue={input['EditProfileNickname'].nickname}
              autoFocus={true}
              onChangeText={(text) => saveInput('EditProfileNickname', {nickname: text.trim()})}
            />
          </components.FormItem>
        </components.Form>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({});
