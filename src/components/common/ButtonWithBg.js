/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR} from '../../config';

export default ({text, disable=false, onPress, containerStyle, textStyle}) => {
  let children = <Text style={[styles.text, (disable ? styles.textDisable : null), textStyle]}>{text}</Text>;
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, (disable ? styles.containerDisable : null), containerStyle]}>
        {children}
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={[styles.container, (disable ? styles.containerDisable : null), containerStyle]}>
       {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.theme,
    borderRadius: 5,
  },
  containerDisable: {
    backgroundColor: COLOR.backgroundDarker,
  },
  text: {
    color: COLOR.textLightNormal,
    fontSize: 14,
  },
  textDisable: {
    color: COLOR.textPrompt,
  },
});
