/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react'
import {StyleSheet, Picker, TouchableOpacity} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {COLOR} from '../../config'
import {GENDERS} from '../../const'
import * as helpers from '../../helpers'
import * as actions from '../../actions'

class EditProfileGender extends Component {
  constructor (props) {
    super(props)

    this.screenId = props.screenId || 'EditProfileGender'
  }

  submit (gender) {
    let {cbDone, updateAccount} = this.props

    cbDone()

    updateAccount({update: {gender}})
  }

  render () {
    let {cbDone, object, account} = this.props
    let user = helpers.userFromCache(object, account.id)

    return (
      <TouchableOpacity onPress={() => cbDone()} style={styles.container}>
        <Picker
          selectedValue={user.gender}
          onValueChange={value => this.submit(value)}
          style={styles.picker}
        >
          {GENDERS.map(({value, label}) =>
            <Picker.Item key={value} label={label} value={value} />
          )}
        </Picker>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.backgroundNormal,
    justifyContent: 'flex-end'
  },
  title: {
    padding: 10,
    fontSize: 14,
    color: COLOR.textEmpha
  },
  picker: {
    backgroundColor: COLOR.backgroundLighter
  }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileGender)
