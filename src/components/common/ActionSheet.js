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
    let {children, onPress} = this.props
    return (
      <TouchableOpacity
        onPress={() => onPress(this.context.showActionSheetWithOptions)}
      >
        {children}
      </TouchableOpacity>
    )
  }
}
