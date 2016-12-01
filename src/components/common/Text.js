/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, Platform, View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';

export default ({children, transparent=false, onPress, styleKind='normal', 
  style, containerStyle, ...props}) => {
  let transparentStyle = transparent ? {backgroundColor: 'transparent'} : null;
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={containerStyle}>
        <Text {...props} style={[styles[styleKind], transparentStyle, style]}>{children}</Text>
      </TouchableOpacity>
    );
  } else{
    return (
      <Text {...props} style={[styles[styleKind], transparentStyle, style]}>{children}</Text>
    );
  } 
}

const styles = StyleSheet.create({
  normal: {
    fontSize: 12,
    color: COLOR.textNormal,
  },
  normalBig: {
    fontSize: 14,
    color: COLOR.textNormal,
  },
  empha: {
    fontSize: 12,
    color: COLOR.textEmpha,
  },
  emphaBig: {
    fontSize: 14,
    color: COLOR.textEmpha,
  },
});
