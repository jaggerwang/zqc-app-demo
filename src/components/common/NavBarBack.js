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

export default ({cbBack, iconStyle}) => {
  return <components.NavBarLeftButton
    icon='chevron-left'
    onPress={() => {
      if (cbBack) {
        cbBack();
      }
      dismissKeyboard();
      Actions.pop();
    }}
    iconStyle={[styles.icon, iconStyle]}
  />;
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 16,
  }
});
