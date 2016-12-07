/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';
import * as apis from '../../apis';

export default ({error, containerStyle}) => {
  if (error == '') {
    return null;
  } else {
    return (
      <Animatable.View animation='fadeIn' style={[styles.container, containerStyle]}>
        <Text style={styles.error}>{error}</Text>
      </Animatable.View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: Math.floor((SCREEN_HEIGHT / 2 - 40) / 3),
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLOR.backgroundNotice,
  },
  error: {
    fontSize: 12,
    color: COLOR.textEmpha,
  }
});
