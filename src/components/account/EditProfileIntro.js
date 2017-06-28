/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react'
import dismissKeyboard from 'dismissKeyboard'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as components from '../'
import * as actions from '../../actions'

class EditProfileIntro extends Component {
  static navigationOptions = ({navigation}) => {
    let {onDone} = navigation.state.params || {}
    return {
      title: '设置个性签名',
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

    this.screenId = props.screenId || 'EditProfileIntro'
  }

  componentDidMount () {
    let {navigation, object, account, saveInput} = this.props
    let user = object.users[account.id]

    navigation.setParams({
      onDone: () => this.submit()
    })

    if (user.intro) {
      saveInput(this.screenId, {intro: user.intro})
    }
  }

  componentWillUnmount () {
    let {resetInput} = this.props
    resetInput(this.screenId)
    dismissKeyboard()
  }

  submit () {
    dismissKeyboard()

    let {navigation, input, validateInput, updateAccount} = this.props
    validateInput(this.screenId, input[this.screenId], () => {
      updateAccount({
        update: input[this.screenId],
        cbOk: () => navigation.goBack()
      })
    })
  }

  render () {
    let {input, saveInput} = this.props
    return (
      <components.Layout screenId={this.screenId}>
        <components.Block>
          <components.TextInput
            placeholder='输入个性签名，50字以内'
            defaultValue={input[this.screenId].intro}
            autoFocus
            maxLength={50}
            onChangeText={text => saveInput(this.screenId,
              {intro: text.trim().replace(/\n/, '')})}
            onSubmitEditing={() => this.submit()}
            style={{fontSize: 12}}
          />
        </components.Block>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileIntro)
