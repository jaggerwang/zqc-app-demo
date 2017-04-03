/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActionSheetProvider} from '@exponent/react-native-action-sheet';

import {COLOR} from '../../config';
import * as components from '../';

export default class Layout extends Component {
  render() {
    let {screenId, drawUnderNavBar = false, children, onLayout, 
      containerStyle} = this.props;
    return (
      <ActionSheetProvider>
        <View onLayout={onLayout} style={[styles.container, containerStyle]}>
          <components.Processing />
          <components.ErrorInput screenId={screenId} />
          {children}
          <components.Loading drawUnderNavBar={drawUnderNavBar} />
          <components.ErrorFlash />
        </View>
      </ActionSheetProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.backgroundNormal,
  },
});
