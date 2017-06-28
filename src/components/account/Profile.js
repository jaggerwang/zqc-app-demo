/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react'
import {View, Modal} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as components from '../'
import * as helpers from '../../helpers'
import * as actions from '../../actions'

class Profile extends Component {
  render () {
    let {navigation, screenId, screen, object, account,
      setScreenState} = this.props
    let {showProfileGender} = screen[screenId]
    let user = helpers.userFromCache(object, account.id)

    return (
      <View>
        <components.TextNotice>基本资料</components.TextNotice>
        <components.Block containerStyle={{paddingVertical: 0}}>
          <components.BlockItem
            leftText='昵称'
            rightText={user.nickname || '未填写'}
            rightIcon='keyboard-arrow-right'
            onPress={() => navigation.navigate('EditProfileNickname')}
            containerStyle={{borderTopWidth: 0}}
          />
          <components.BlockItem
            leftText='头像'
            rightImage={helpers.userAvatarSource(user)}
            rightIcon='keyboard-arrow-right'
            onPress={() => navigation.navigate('EditProfileAvatar')}
            imageStyle={{borderRadius: 5}}
            containerStyle={{height: 60}}
          />
          <components.BlockItem
            leftText='性别'
            rightText={user.gender ? (user.gender === 'm' ? '男' : '女') : '未选择'}
            rightIcon='keyboard-arrow-right'
            onPress={() => setScreenState(screenId, {showProfileGender: true})}
          />
        </components.Block>

        <components.TextNotice>可选资料</components.TextNotice>
        <components.Block containerStyle={{paddingVertical: 0}}>
          <components.BlockItem
            leftText='邮箱'
            rightText={user.email || '可用于登录和找回密码'}
            rightIcon='keyboard-arrow-right'
            onPress={() => navigation.navigate('EditProfileEmail')}
            containerStyle={{borderTopWidth: 0}}
          />
          <components.BlockItem
            leftText='个性签名'
            rightText={user.intro ? user.intro.substring(0, 20) : '未填写'}
            rightIcon='keyboard-arrow-right'
            onPress={() => navigation.navigate('EditProfileIntro')}
          />
          <components.BlockItem
            leftText='主页背景'
            rightImage={helpers.userBackgroundSource(user)}
            rightIcon='keyboard-arrow-right'
            onPress={() => navigation.navigate('EditProfileBackground')}
            containerStyle={{height: 60}}
          />
        </components.Block>

        <Modal
          visible={showProfileGender}
          onRequestClose={() => setScreenState(this.screenId,
            {showProfileGender: false})}
        >
          <components.EditProfileGender
            cbDone={() => setScreenState(screenId, {showProfileGender: false})}
          />
        </Modal>
      </View>
    )
  }
}

function mapStateToProps (state) {
  let {screen, object, account} = state
  return {
    screen,
    object,
    account
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
