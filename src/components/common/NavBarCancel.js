/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, Platform, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import dismissKeyboard from 'dismissKeyboard';

import {COLOR} from '../../config';
import * as components from '../';

export default () => {
  return <components.NavBarLeftButton
    text='取消'
    onPress={() => {
      dismissKeyboard();
      Actions.pop();
    }}
    textStyle={styles.text}
  />;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
  }
});
