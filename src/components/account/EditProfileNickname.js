/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react'
import dismissKeyboard from 'dismissKeyboard'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {ApiResultError, ERROR_CODE_DUPLICATED} from '../../error'
import * as components from '../'
import * as actions from '../../actions'

class EditProfileNickname extends Component {
  static navigationOptions = ({navigation}) => {
    let {onDone} = navigation.state.params || {}
    return {
      title: '设置昵称',
      headerLeft: (
        <components.NavButton onPress={() => navigation.goBack()}>
          取消
        </components.NavButton>
      ),
      headerRight: (
        <components.NavButton onPress={onDone}>
          完成
        </components.NavButton>
      )
    }
  };

  constructor (props) {
    super(props)

    this.screenId = props.screenId || 'EditProfileNickname'
  }

  componentDidMount () {
    let {navigation, object, account, saveInput} = this.props
    let user = object.users[account.id]

    navigation.setParams({
      onDone: () => this.submit()
    })

    if (user.nickname) {
      saveInput(this.screenId, {nickname: user.nickname})
    }
  }

  componentWillUnmount () {
    let {resetInput} = this.props
    resetInput(this.screenId)
    dismissKeyboard()
  }

  submit () {
    dismissKeyboard()

    let {navigation, input, errorFlash, handleError, validateInput,
      updateAccount} = this.props
    validateInput(this.screenId, input[this.screenId], () => {
      updateAccount({
        update: input[this.screenId],
        cbOk: () => navigation.goBack(),
        cbFail: error => {
          if (error instanceof ApiResultError) {
            if (error.code === ERROR_CODE_DUPLICATED) {
              errorFlash('昵称重复。')
              return
            }
          }
          handleError(error)
        }
      })
    })
  }

  render () {
    let {input, saveInput} = this.props

    return (
      <components.Layout screenId={this.screenId}>
        <components.Form>
          <components.FormItem
            icon='person'
            containerStyle={{borderTopWidth: 0}}
          >
            <components.TextInput
              placeholder='输入昵称'
              returnKeyType='done'
              defaultValue={input[this.screenId].nickname}
              autoFocus
              maxLength={20}
              onChangeText={text => saveInput(this.screenId,
                {nickname: text.trim()})}
              onSubmitEditing={() => this.submit()}
            />
          </components.FormItem>
        </components.Form>
      </components.Layout>
    )
  }
}

function mapStateToProps (state) {
  let {input, object, account} = state
  return {
    input,
    object,
    account
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  EditProfileNickname)
