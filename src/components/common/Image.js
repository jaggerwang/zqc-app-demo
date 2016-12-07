/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR} from '../../config';

export default ({onPress, style, containerStyle, ...props}) => {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={containerStyle}>
        <Image {...props} style={style} />
      </TouchableOpacity>
    );
  } else {
    return (
      <Image {...props} style={[style, containerStyle]} />
    );
  } 
}

const styles = StyleSheet.create({});
