/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR} from '../../config';

export default ({children, iconName, containerStyle, iconStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {iconName ? <Icon name={iconName} style={[styles.icon, iconStyle]} /> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: COLOR.linePrompt,
  },
  icon: {
    width: 30,
    fontSize: 16,
    textAlign: 'center',
    color: COLOR.textEmpha,
  },
});
