/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {COLOR} from '../../config';

export default ({text, selected = false, disabled = false, onPress, 
  containerStyle, textStyle}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.container, (selected ? styles.containerSelected : null), 
        containerStyle]}
    >
      <Text 
        style={[styles.text, (disabled ? styles.textDisabled : null), 
          (selected ? styles.textSelected : null), textStyle]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    backgroundColor: COLOR.backgroundLighter,
    borderColor: 'transparent',
    borderRadius: 10,
  },
  containerSelected: {
    backgroundColor: COLOR.theme,
  },
  text: {
    color: COLOR.textNormal,
    fontSize: 12,
  },
  textDisabled: {
    color: COLOR.textPrompt,
  },
  textSelected: {
    color: COLOR.textLightNormal,
  },
});
