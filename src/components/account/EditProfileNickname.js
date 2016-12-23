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

export default class EditProfileNickname extends Component {
  static navigatorStyle = DEFAULT_NAV_BAR_STYLE;

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

    this.screenId = props.screenId || 'EditProfileNickname';

    let {navigator} = props;
    navigator.setOnNavigatorEvent(event => this.onNavigatorEvent(event));
  }

  componentDidMount() {
    let {object, account, saveInput} = this.props;
    let user = object.users[account.userId];
    if (user.nickname) {
      saveInput(this.screenId, {nickname: user.nickname});  
    }
  }

  onNavigatorEvent(event) {
    let {navigator, submit} = this.props;
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'done') {
        dismissKeyboard();
        submit(this.screenId, navigator);
      } else if (event.id == 'cancel') {
        navigator.pop();
      }
    }
  }

  render() {
    let {navigator, loading, processing, error, input, saveInput} = this.props;
    let {submit} = this.props;
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
              placeholder='输入昵称'
              returnKeyType='done'
              defaultValue={input[this.screenId].nickname}
              autoFocus={true}
              onChangeText={text => saveInput(this.screenId, {nickname: text.trim()})}
              onSubmitEditing={() => {dismissKeyboard(); submit(this.screenId, navigator);}}
            />
          </components.FormItem>
        </components.Form>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({});
