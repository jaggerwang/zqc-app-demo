/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react'
import {ScrollView} from 'react-native'

import * as components from '../'

export default class EditProfile extends Component {
  static navigationOptions = {
    title: '编辑资料'
  }

  constructor (props) {
    super(props)

    this.screenId = props.screenId || 'EditProfile'
  }

  render () {
    let {navigation} = this.props

    return (
      <components.Layout screenId={this.screenId}>
        <ScrollView>
          <components.TextNotice>完善的资料有助于结交到更多球友。</components.TextNotice>
          <components.Profile
            navigation={navigation}
            screenId={this.screenId}
          />
        </ScrollView>
      </components.Layout>
    )
  }
}
