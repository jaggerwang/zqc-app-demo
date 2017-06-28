/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react'
import {StyleSheet, View, StatusBar} from 'react-native'
import {ActionSheetProvider} from '@expo/react-native-action-sheet'

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config'
import * as components from '../'

export default class Layout extends Component {
  constructor (props) {
    super(props)

    this.layout = {
      x: 0,
      y: 0,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    }
  }

  render () {
    let {screenId, children, containerStyle} = this.props
    return (
      <ActionSheetProvider>
        <View
          onLayout={event => {
            this.layout = event.nativeEvent.layout
          }}
          style={[styles.container, containerStyle]}
        >
          <StatusBar barStyle='light-content' />
          <components.Processing />
          <components.ErrorInput screenId={screenId} />
          {children}
          <components.Loading layout={this.layout} />
          <components.ErrorFlash />
        </View>
      </ActionSheetProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.backgroundNormal
  }
})
