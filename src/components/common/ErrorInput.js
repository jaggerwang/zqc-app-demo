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

function ErrorInput({error, screenId, containerStyle}) {
  error = error.input[screenId] || {};
  if (Object.values(error).every(v => v.length == 0)) {
    return null;
  }
  
  return (
    <Animatable.View animation='fadeIn' style={[styles.container, containerStyle]}>
      {Object.entries(error)
        .filter(([k, v]) => v.length > 0)
        .map(([k, v]) => <Text key={k} style={styles.text}>{v.join('')}</Text>)}
    </Animatable.View>
  );
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

function mapStateToProps(state) {
  let {error} = state;
  return {
    error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorInput);
