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

export default class EditProfileNickname extends Component {
  componentDidMount() {
    let {sceneKey, object, account, saveInput} = this.props;
    let user = object.users[account.userId];
    if (user.nickname) {
      saveInput(sceneKey, {nickname: user.nickname});  
    }
  }

  render() {
    let {sceneKey, loading, processing, error, input, saveInput, submit} = this.props;
    return (
      <components.Layout 
        sceneKey={sceneKey} 
        loading={loading} 
        processing={processing} 
        error={error}
        renderTitle={() => components.NavBarTitle({title: '修改昵称'})}
        renderBackButton={components.NavBarCancel}
        renderRightButton={() => components.NavBarDone({
          onPress: () => {dismissKeyboard(); submit(sceneKey);},
        })}
      >
        <components.Form>
          <components.FormItem iconName='user' containerStyle={{borderTopWidth: 0}}>
            <components.TextInput
              placeholder='输入昵称'
              returnKeyType='done'
              defaultValue={input[sceneKey].nickname}
              autoFocus={true}
              onChangeText={(text) => saveInput(sceneKey, {nickname: text.trim()})}
            />
          </components.FormItem>
        </components.Form>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({});
