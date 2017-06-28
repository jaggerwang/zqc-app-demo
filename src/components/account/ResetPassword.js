/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react'
import {View} from 'react-native'
import dismissKeyboard from 'dismissKeyboard'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as components from '../'
import * as actions from '../../actions'

class ResetPassword extends Component {
  static navigationOptions = {
    title: '重置密码'
  }

  constructor (props) {
    super(props)

    this.screenId = props.screenId || 'ResetPassword'
  }

  componentDidMount () {
    this.timerSend = setInterval(
      () => {
        let {screen, setScreenState} = this.props
        let {secondsToSend} = screen[this.screenId]
        if (secondsToSend > 0) {
          setScreenState(this.screenId, {secondsToSend: secondsToSend - 1})
        }
      },
      1000
    )
  }

  componentWillUnmount () {
    clearInterval(this.timerSend)
  }

  submit () {
    dismissKeyboard()

    let {navigation, input, errorFlash, validateInput, resetPassword} =
      this.props
    validateInput(this.screenId, input[this.screenId], () => {
      let {account, password, code} = input[this.screenId]
      let mobile, email
      if (account.match(/^\d+$/) !== null) {
        mobile = account
      } else {
        email = account
      }
      resetPassword({
        mobile,
        email,
        password,
        code,
        cbOk: () => {
          errorFlash('重设成功，请使用新密码登录。')
          navigation.goBack()
        }
      })
    })
  }

  render () {
    let {input, screen, errorFlash, saveInput, setScreenState,
      sendVerifyCode} = this.props
    let {account, password, code} = input[this.screenId]
    let {secondsToSend} = screen[this.screenId]

    return (
      <components.Layout screenId={this.screenId}>
        <components.TextNotice>通过发送验证码来重设密码。</components.TextNotice>
        <components.Form>
          <components.FormItem
            icon='account-circle'
            containerStyle={{borderTopWidth: 0}}
          >
            <components.TextInput
              placeholder='输入手机号或绑定邮箱'
              returnKeyType='next'
              defaultValue={account}
              maxLength={50}
              onChangeText={text => saveInput(this.screenId,
                {account: text.trim()})}
              onSubmitEditing={() => this.refPassword.focus()}
            />
          </components.FormItem>
          <components.FormItem icon='lock'>
            <components.TextInput
              placeholder='输入新密码'
              returnKeyType='next'
              secureTextEntry
              defaultValue={password}
              maxLength={20}
              onRef={ref => { this.refPassword = ref }}
              onChangeText={text => saveInput(this.screenId,
                {password: text.trim()})}
              onSubmitEditing={() => this.refVerifyCode.focus()}
            />
          </components.FormItem>
          <components.FormItem icon='vpn-key'>
            <components.TextInput
              placeholder='输入验证码'
              maxLength={4}
              keyboardType='numeric'
              returnKeyType='done'
              defaultValue={code}
              onRef={ref => { this.refVerifyCode = ref }}
              onChangeText={text => saveInput(this.screenId,
                {code: text.trim()})}
              onSubmitEditing={() => this.submit()}
            />
          </components.FormItem>
        </components.Form>
        <View style={{flexDirection: 'row'}}>
          <components.ButtonWithBg
            text={'发送验证码' + (secondsToSend > 0
              ? ' (' + secondsToSend + ')'
              : '')}
            textStyle={{fontSize: 16}}
            containerStyle={{flex: 1}}
            disable={secondsToSend > 0 || account === ''}
            onPress={
              secondsToSend === 0
              ? () => {
                dismissKeyboard()
                let cbOk = () => {
                  errorFlash('发送成功。')
                  setScreenState(this.screenId, {secondsToSend: 30})
                }
                if (account.match(/^\d+$/) !== null) {
                  sendVerifyCode({by: 'mobile', mobile: account, cbOk})
                } else {
                  sendVerifyCode({by: 'email', email: account, cbOk})
                }
              }
              : null
            }
          />
          <components.ButtonWithBg
            text='重设密码'
            textStyle={{fontSize: 16}}
            containerStyle={{flex: 1}}
            onPress={() => this.submit()}
          />
        </View>
      </components.Layout>
    )
  }
}

function mapStateToProps (state) {
  let {input, screen} = state
  return {
    input,
    screen
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
