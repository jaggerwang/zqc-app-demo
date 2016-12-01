/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, Platform, View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR} from '../../config';

export default ({icon, text, children, onPress, containerStyle, iconStyle, textStyle}) => {
  if (children) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, containerStyle]}>
        {children}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        {icon ? <Icon name={icon} style={[styles.icon, iconStyle]} /> : null}
        {text ? <Text style={[styles.text, textStyle]}>{text}</Text> : null}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    minWidth: 30,
    ...Platform.select({
      ios: {
        top: -6,
        left: 3,
        height: 50,
      },
      android: {
        top: 12,
        left: 3,
        height: 34,
      },
    }),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 14,
    color: COLOR.textLightPrompt,
  },
  text: {
    fontSize: 14,
    color: COLOR.textLightPrompt,
  },
});
