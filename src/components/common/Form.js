/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {COLOR} from '../../config';

export default ({children, containerStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: COLOR.backgroundLighter,
    borderWidth: 1,
    borderColor: COLOR.lineNormal,
    borderRadius: 5,
  }
});
