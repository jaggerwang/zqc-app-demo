/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react'
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native'
import flattenStyle from 'flattenStyle'

import {COLOR} from '../../config'
import * as helpers from '../../helpers'
import * as components from '../'

export default ({playIconVisible = false, duration, onPress, containerStyle,
  style, playIconStyle, ...props}) => {
  let child = <Image style={style} {...props} />
  if (onPress) {
    let {width, height} = flattenStyle(style)
    let {fontSize} = flattenStyle([styles.playIcon, playIconStyle])
    let left = Math.floor((width - fontSize) / 2)
    let top = Math.floor((height - fontSize) / 2)
    return (
      <TouchableOpacity onPress={onPress} style={containerStyle}>
        {child}

        {playIconVisible
          ? <components.Icon
            name='play-circle-outline'
            style={[styles.playIcon, playIconStyle, {top, left}]} />
          : null}

        {duration
          ? <components.Text style={styles.durationText}>
            {helpers.durationText(duration)}
          </components.Text>
          : null}
      </TouchableOpacity>
    )
  } else {
    return (
      <View style={containerStyle}>
        {child}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  playIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    color: COLOR.textLightNormal,
    opacity: 0.8,
    backgroundColor: 'transparent',
    fontSize: 36
  },
  durationText: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    color: COLOR.textLightNormal,
    fontSize: 12,
    padding: 5
  }
})
