/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, Platform, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';

export default ({name, style, ...props}) => {
  return (
    <Icon {...props} name={name} style={[styles.icon, style]} />
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 12,
    color: COLOR.textNormal,
    backgroundColor: 'transparent',
  },
});
