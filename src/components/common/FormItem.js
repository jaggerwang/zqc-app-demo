/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';

import {COLOR} from '../../config';
import * as components from '../';

export default ({icon, children, containerStyle, iconStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon 
        ? <components.Icon name={icon} style={[styles.icon, iconStyle]} /> 
        : null}
      {children}
    </View>
  );
};

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
