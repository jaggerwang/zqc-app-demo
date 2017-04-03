/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {COLOR} from '../../config';
import * as components from '../';

export default ({text, icon, style, iconStyle, containerStyle, onPress}) => {
  let leftChild = <components.Icon 
    name={icon} 
    style={[styles.text, styles.icon, style, iconStyle]} 
  />;
  let rightChild = (
    <Text style={[styles.text, style]}>{text}</Text>
  );
  if (onPress) {
    return (
      <TouchableOpacity 
        onPress={onPress} 
        style={[styles.container, containerStyle]}
      >
        {leftChild}
        {rightChild}
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={[styles.container, containerStyle]}>
        {leftChild}
        {rightChild}
      </View>
    );
  } 
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: COLOR.textNormal,
    backgroundColor: 'transparent',
  },
  icon: {},
});
