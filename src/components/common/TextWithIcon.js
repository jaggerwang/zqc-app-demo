/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, Platform, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';

export default ({iconName, text, containerStyle, styleKind='normal', 
  transparent=false, iconStyle, textStyle, onPress}) => {
  let transparentStyle = transparent ? {backgroundColor: 'transparent'} : null;
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, containerStyle]}>
        <Icon name={iconName} style={[styles.icon, styles[styleKind], transparentStyle, iconStyle]} />
        <Text style={[styles[styleKind], transparentStyle, textStyle]}>{text}</Text>
      </TouchableOpacity>
    );
  } else{
    return (
      <View style={[styles.container, containerStyle]}>
        <Icon name={iconName} style={[styles.icon, styles[styleKind], transparentStyle, iconStyle]} />
        <Text style={[styles[styleKind], transparentStyle, textStyle]}>{text}</Text>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingHorizontal: 2,
  },
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
