/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {COLOR} from '../../config';

export default class ActionSheet extends Component {
  static contextTypes = {
    showActionSheetWithOptions: PropTypes.func,
  };

  showActionSheetWithOptions(options, onPress) {
    return this.context.showActionSheetWithOptions(options, onPress);
  }

  render() {
    let {children, onPress} = this.props;
    return (
      <TouchableOpacity onPress={() => onPress(this.context.showActionSheetWithOptions)}>
        {children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});
