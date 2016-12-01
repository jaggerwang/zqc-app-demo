/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {COLOR} from '../config';
import * as components from './';

export default class Bootstrap extends Component {
  componentDidMount() {
    let {isReset=false, reset, bootstrap} = this.props;
    if (isReset) {
      reset();
    }
    bootstrap();
  }

  render() {
    let {sceneKey, loading, processing, error} = this.props;
    return (
      <components.Layout
        sceneKey={sceneKey}
        loading={loading}
        processing={processing}
        error={error}
        hideStatusBar={true}
        hideNavBar={true}
      >
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <components.Image
            source={require('zaiqiuchang/res/img/zqc-icon-middle.png')}
            style={{borderRadius: 30}}
          />
          <Text style={styles.title}>在球场</Text>
        </View>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    fontSize: 32,
    color: COLOR.textEmpha,
  },
});
