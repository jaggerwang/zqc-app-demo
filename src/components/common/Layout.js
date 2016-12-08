/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import {COLOR} from '../../config';
import * as components from '../';

export default class Layout extends Component {
  render() {
    let {loading, processing, errorFlash, errorInput, children, containerStyle} = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        {processing ? <components.Processing processing={processing} /> : null}
        {errorInput ? <components.ErrorInput error={errorInput} /> : null}
        {children}
        {loading ? <components.Loading loading={loading} /> : null}
        {errorFlash ? <components.ErrorFlash error={errorFlash} /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.backgroundNormal,
  },
});
