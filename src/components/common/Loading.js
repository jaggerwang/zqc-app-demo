/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR} from '../../config';

export default ({loading, containerStyle}) => {
  let {loadingCount, defaultPrompt, prompt, enabled} = loading;
  prompt = (prompt !== undefined ? prompt : defaultPrompt);
  if (enabled && loadingCount > 0) {
    return (
      <View style={[styles.container, containerStyle]}>
        <ActivityIndicator />
        {prompt ? <Text style={styles.prompt}>{prompt}</Text> : null}
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    color: COLOR.textEmpha,
  },
  prompt: {
    marginVertical: 10,
    fontSize: 12,
    color: COLOR.textNormal,
  }
});
