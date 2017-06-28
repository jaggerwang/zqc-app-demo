/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import dismissKeyboard from 'dismissKeyboard'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {RES_USER_AVATARS} from '../../const'
import logger from '../../logger'
import * as components from '../'
import * as actions from '../../actions'
import * as helpers from '../../helpers'

class EditProfileAvatar extends Component {
  static navigationOptions = ({navigation}) => {
    let {onDone} = navigation.state.params || {}
    return {
      title: '设置头像',
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

    this.screenId = props.screenId || 'EditProfileAvatar'
  }

  componentDidMount () {
    let {navigation, object, account, saveInput} = this.props
    let {avatarType, avatarName, avatarFile} = helpers.userFromCache(
      object, account.id)

    navigation.setParams({
      onDone: () => this.submit()
    })

    saveInput(this.screenId, {avatarType, avatarName, avatarFile})
  }

  submit () {
    dismissKeyboard()

    let {navigation, input, validateInput, updateAccount, uploadFile} =
      this.props
    validateInput(this.screenId, input[this.screenId], () => {
      let {avatarType, avatarName, avatarImage} = input[this.screenId]
      let cbOk = () => navigation.goBack()
      if (avatarType === 'builtin') {
        updateAccount({
          update: {avatarType, avatarName},
          cbOk
        })
      } else if (avatarType === 'custom') {
        if (!avatarImage) {
          cbOk()
          return
        }
        uploadFile({
          path: avatarImage.path,
          mime: avatarImage.mime,
          cbOk: file => updateAccount({
            update: {avatarType, avatarId: file.id},
            cbOk
          })
        })
      }
    })
  }

  render () {
    let {input, saveInput} = this.props

    return (
      <components.Layout screenId={this.screenId}>
        <ScrollView>
          <components.Image
            source={helpers.userAvatarSource(input[this.screenId], 'middle')}
            style={styles.avatar} />
          <components.TextNotice>从内置里选取</components.TextNotice>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              padding: 5
            }}
          >
            {Array.from(
              RES_USER_AVATARS.entries(),
              ([k, v]) => <components.Image
                key={k}
                source={v}
                onPress={() => saveInput(this.screenId,
                  {avatarType: 'builtin', avatarName: k})}
                containerStyle={{margin: 5}}
                style={styles.avatarBuiltin}
              />
            )}
          </View>
          <components.TextNotice>从相册里选取</components.TextNotice>
          <components.ButtonWithBg
            text='打开相册'
            textStyle={{fontSize: 16}}
            onPress={() => {
              ImagePicker.showImagePicker(
                {
                  title: '设置头像',
                  chooseFromLibraryButtonTitle: '打开相册',
                  takePhotoButtonTitle: '打开相机',
                  cancelButtonTitle: '取消',
                  mediaType: 'photo',
                  allowsEditing: true,
                  noData: true
                },
                response => {
                  if (response.didCancel) {

                  } else if (response.error) {
                    logger.error(response.error)
                  } else {
                    saveInput(this.screenId, {
                      avatarType: 'custom',
                      avatarImage: {
                        path: response.uri,
                        mime: 'mime/jpeg',
                        size: response.fileSize,
                        pixelSize: [response.width, response.height]
                      }
                    })
                  }
                }
              )
            }}
          />
        </ScrollView>
      </components.Layout>
    )
  }
}

const styles = StyleSheet.create({
  avatar: {
    margin: 10,
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 10
  },
  avatarBuiltin: {
    width: 40,
    height: 40
  }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileAvatar)
