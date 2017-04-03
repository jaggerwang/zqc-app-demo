/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import flattenStyle from 'flattenStyle';

import {COLOR} from '../../config';

export default ({text, onPress, containerStyle, textStyle}) => {
  let {fontSize} = flattenStyle(textStyle || styles.text);
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.container, {padding: Math.round(fontSize / 2)}, 
        containerStyle]}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR.theme,
    borderRadius: 5,
  },
  text: {
    color: COLOR.theme,
    fontSize: 14,
  },
});
