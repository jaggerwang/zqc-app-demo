/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import * as Animatable from 'react-native-animatable'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {COLOR} from '../../config'
import * as components from '../'

function Processing ({processing, containerStyle}) {
  let {task} = processing
  if (!task) {
    return null
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Animatable.Text
        animation='rotate'
        iterationCount='infinite'
        easing='linear'
      >
        <components.Icon name='rotate-right' style={styles.text} />
      </Animatable.Text>
      <Text style={styles.text}>{task}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.backgroundNotice
  },
  text: {
    fontSize: 12,
    color: COLOR.textEmpha
  }
})

function mapStateToProps (state) {
  let {processing} = state
  return {
    processing
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Processing)
