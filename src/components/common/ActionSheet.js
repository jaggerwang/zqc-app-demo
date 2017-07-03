/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component, PropTypes} from 'react'
import {TouchableOpacity} from 'react-native'

export default class ActionSheet extends Component {
  static contextTypes = {
    showActionSheetWithOptions: PropTypes.func
  };

  showActionSheetWithOptions (options, onPress) {
    return this.context.showActionSheetWithOptions(options, onPress)
  }

  render () {
    let {children, onPress, onLongPress, delayLongPress = 0} = this.props
    return (
      <TouchableOpacity
        onPress={() => onPress(this.context.showActionSheetWithOptions)}
        onLongPress={() => onLongPress(this.context.showActionSheetWithOptions)}
        delayLongPress={delayLongPress}
      >
        {children}
      </TouchableOpacity>
    )
  }
}
