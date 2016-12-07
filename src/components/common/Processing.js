/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import {COLOR} from '../../config';
import * as components from '../';

export default ({processing, containerStyle}) => {
  let {task} = processing;
  if (task) {
    return (
      <View style={[styles.container, containerStyle]}>
        <Animatable.Text animation="rotate" iterationCount='infinite' easing='linear'>
          <Icon name='spinner' style={styles.icon} />
        </Animatable.Text>
        <Text style={styles.task}>{task}</Text>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.backgroundNotice,
  },
  icon: {
    fontSize: 12,
    color: COLOR.textEmpha,
  },
  task: {
    marginLeft: 5,
    fontSize: 12,
    color: COLOR.textEmpha,
  }
});
