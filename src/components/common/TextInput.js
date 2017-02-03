/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, View, Text, TextInput, Platform} from 'react-native';
import flattenStyle from 'flattenStyle';

import {COLOR} from '../../config';

export default ({onRef, style, ...props}) => {
  let {fontSize} = flattenStyle(style || styles.input);
  return (
    <TextInput
      placeholderTextColor={COLOR.textPrompt}
      autoCapitalize='none'
      autoCorrect={false}
      returnKeyType='done'
      {...props}
      ref={onRef}
      style={[styles.input, Platform.select({ios: {height: (fontSize * 2)}}), style]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    fontSize: 14,
    color: COLOR.textEmpha,
  }
});
