/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, Platform, View, Text, TouchableOpacity} from 'react-native';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';

export default ({children, style, ...props}) => {
  return (
    <Text {...props} style={[styles.text, style]}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: COLOR.textNormal,
    backgroundColor: 'transparent',
  },
});
