/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import {COLOR} from '../../config';
import * as components from '../';

export default ({leftIcon, leftText, rightImage, rightText, rightComponent, rightIcon, onPress, 
  containerStyle, imageStyle, leftIconStyle, rightIconStyle}) => {
  let leftChild = (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {leftIcon ? <components.Icon name={leftIcon} style={[styles.leftText, styles.leftIcon, leftIconStyle]} /> : null}
      <Text style={styles.leftText}>{leftText}</Text>
    </View>
  );
  let rightChild = (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {rightImage ? <Image source={rightImage} style={[{width: 50, height: 50}, imageStyle]} /> : null}
      {rightText ? <Text style={styles.rightText}>{rightText}</Text> : null}
      {rightComponent ? rightComponent : null}
      {rightIcon ? <components.Icon name={rightIcon} style={[styles.rightText, styles.rightIcon, rightIconStyle]} /> : null}
    </View>
  );
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, containerStyle]}>
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
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLOR.linePrompt,
    borderTopWidth: 1,
  },
  leftIcon: {
    marginRight: 5,
    fontSize: 16,
    color: COLOR.textNormal,
  },
  leftText: {
    fontSize: 14,
    color: COLOR.textEmpha,
  },
  rightText: {
    fontSize: 12,
    color: COLOR.textEmpha,
  },
  rightIcon: {
    marginLeft: 5,
    fontSize: 16,
    color: COLOR.textNormal,
  }
});
