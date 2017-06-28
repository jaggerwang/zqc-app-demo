/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'

import {COLOR} from '../../config'

export default ({children, onPress, style, containerStyle}) => {
  let child = (
    <Text style={[styles.text, style]}>{children}</Text>
  )
  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, containerStyle]}
      >
        {child}
      </TouchableOpacity>
    )
  } else {
    return (
      <View style={[styles.container, containerStyle]}>
        {child}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  text: {
    fontSize: 12,
    lineHeight: 18,
    color: COLOR.textNormal
  }
})
