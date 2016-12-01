/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, Platform, View, Text} from 'react-native';

import {COLOR, NAV_BAR_HEIGHT} from '../../config';

export default ({title, containerStyle, titleStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        marginTop: 14,
        height: 50,
      },
      android: {
        marginTop: 20,
        height: 34,
      },
    }),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.textLightNormal,
  },
});
