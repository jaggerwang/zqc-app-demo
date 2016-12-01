/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import {COLOR, NAV_BAR_HEIGHT} from '../../config';

export default ({sceneKey, error, containerStyle}) => {
  error = (error[sceneKey] || {});
  if (Object.values(error).every(v => v.length == 0)) {
    return null;
  } else {
    return (
      <Animatable.View animation='fadeIn' style={[styles.container, containerStyle]}>
        {Object.entries(error)
          .filter(([k, v]) => v.length > 0)
          .map(([k, v]) => <Text key={k} style={styles.text}>{v.join('')}</Text>)}
      </Animatable.View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: COLOR.backgroundNotice,
  },
  text: {
    marginVertical: 5,
    fontSize: 12,
    color: COLOR.textEmpha,
  }
});
