/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {COLOR} from '../../config';

function ErrorFlash({error, containerStyle}) {
  error = error.flash;
  if (!error) {
    return null;
  }

  return (
    <Animatable.View animation='fadeIn' style={[styles.container, containerStyle]}>
      <Text style={styles.error}>{error}</Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLOR.backgroundNotice,
  },
  error: {
    fontSize: 12,
    color: COLOR.textEmpha,
  }
});

function mapStateToProps(state) {
  let {error} = state;
  return {
    error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorFlash);
