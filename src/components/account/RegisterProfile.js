/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react'
import {ScrollView} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {navToTab} from '../../navigation'
import * as components from '../'
import * as actions from '../../actions'

class RegisterProfile extends Component {
  static navigationOptions = {
    title: '完善资料'
  }

  constructor (props) {
    super(props)

    this.screenId = props.screenId || 'RegisterProfile'
  }

  render () {
    let {navigation, object, account, errorFlash} = this.props
    let user = object.users[account.id]

    return (
      <components.Layout screenId={this.screenId}>
        <ScrollView>
          <components.TextNotice>帐号注册成功，请完善资料。</components.TextNotice>
          <components.Profile
            navigation={navigation}
            screenId={this.screenId}
          />
          <components.ButtonWithBg
            text='完成'
            onPress={() => {
              if (user.nickname && user.avatarType && user.gender) {
                navToTab(navigation)
              } else {
                errorFlash('请填写完基本资料。')
              }
            }}
            textStyle={{fontSize: 16}}
          />
        </ScrollView>
      </components.Layout>
    )
  }
}

function mapStateToProps (state) {
  let {object, account} = state
  return {
    object,
    account
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterProfile)
