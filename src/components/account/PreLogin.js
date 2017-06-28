/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react'
import {StatusBar} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as components from '../'
import * as actions from '../../actions'

class PreLogin extends Component {
  static navigationOptions = {
    header: null
  }

  constructor (props) {
    super(props)

    this.screenId = props.screenId || 'PreLogin'
  }

  render () {
    let {navigation} = this.props

    return (
      <components.Layout
        screenId={this.screenId}
        containerStyle={{justifyContent: 'center'}}
      >
        <StatusBar barStyle='dark-content' />
        <components.Image
          source={require('zqcdemo/res/img/zqc-icon-middle.png')}
          style={{alignSelf: 'center', borderRadius: 15}}
        />
        <components.Button
          text='登录'
          onPress={() => navigation.navigate('Login')}
          containerStyle={{marginTop: 100}}
          textStyle={{fontSize: 16}}
        />
        <components.Button
          text='注册'
          onPress={() => navigation.navigate('RegisterMobile')}
          containerStyle={{marginTop: 30}}
          textStyle={{fontSize: 16}}
        />
      </components.Layout>
    )
  }
}

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PreLogin)
