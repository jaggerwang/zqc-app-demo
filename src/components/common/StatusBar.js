/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, Platform, View, Text, StatusBar} from 'react-native';

export default ({hidden=false, barStyle}) => {
  return (
    <StatusBar
      hidden={hidden}
      animated={true}
      backgroundColor='transparent'
      translucent={true}
      barStyle={barStyle || 'light-content'}
    />
  );
}

const styles = StyleSheet.create({});
