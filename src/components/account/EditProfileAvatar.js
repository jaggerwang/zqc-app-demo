/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import dismissKeyboard from 'dismissKeyboard';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {COLOR, DEFAULT_NAV_BAR_STYLE} from '../../config';
import {RES_USER_AVATARS} from '../../const';
import logger from '../../logger';
import * as utils from '../../utils';
import * as components from '../';
import * as actions from '../../actions';
import * as helpers from '../../helpers';

class EditProfileAvatar extends Component {
  static navigatorStyle = DEFAULT_NAV_BAR_STYLE;

  static navigatorButtons = {
    leftButtons: [
      {
        title: '取消',
        id: 'cancel',
      },
    ],
    rightButtons: [
      {
        title: '完成',
        id: 'done',
      },
    ],
  };

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'EditProfileAvatar';

    let {navigator} = props;
    navigator.setOnNavigatorEvent(event => this.onNavigatorEvent(event));
  }
  
  componentDidMount() {
    let {object, account, saveInput} = this.props;
    let {avatarType, avatarName, avatarFile} = helpers.userFromCache(object, account.id);
    saveInput(this.screenId, {avatarType, avatarName, avatarFile});
  }

  onNavigatorEvent(event) {
    let {navigator} = this.props;
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'done') {
        this.submit();
      } else if (event.id == 'cancel') {
        navigator.pop();
      }
    }
  }

  submit() {
    dismissKeyboard();

    let {navigator, input, validateInput, updateAccount, uploadFile} = this.props;
    validateInput(this.screenId, input[this.screenId], () => {
      let {avatarType, avatarName, avatarImage} = input[this.screenId];
      let cbOk = () => navigator.pop();
      if (avatarType == 'builtin') {
        updateAccount({
          update: {avatarType, avatarName}, 
          cbOk,
        });
      } else if (avatarType == 'custom') {
        if (!avatarImage) {
          cbOk();
          return;
        }
        uploadFile({
          path: avatarImage.path, 
          mime: avatarImage.mime,
          cbOk: file => updateAccount({
            update: {avatarType, avatarId: file.id}, 
            cbOk,
          }),
        });
      }
    });
  }

  render() {
    let {navigator, input, errorFlash, saveInput} = this.props;
    
    return (
      <components.Layout screenId={this.screenId}>
        <ScrollView>
          <components.Image source={helpers.userAvatarSource(input[this.screenId], 'middle')} style={styles.avatar} />
          <components.TextNotice>从内置里选取</components.TextNotice>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', padding: 5}}>
            {Array.from(
              RES_USER_AVATARS.entries(),
              ([k, v]) => <components.Image
                key={k}
                source={v}
                onPress={() => saveInput(this.screenId, {avatarType: 'builtin', avatarName: k})}
                containerStyle={{margin: 5}}
                style={styles.avatarBuiltin}
              />
            )}
          </View>
          <components.TextNotice>从相册里选取</components.TextNotice>
          <components.ActionSheet
            onPress={showActionSheetWithOptions => {
              let options = ['相机', '相册', '取消'];
              showActionSheetWithOptions(
                {
                  options,
                  cancelButtonIndex: options.findIndex(v => v == '取消'),
                  title: '设置头像',
                },
                buttonIndex => {
                  let picker;
                  if (buttonIndex == options.findIndex(v => v == '相册')) {
                    picker = ImagePicker.openPicker;
                  } else if (buttonIndex == options.findIndex(v => v == '相机')) {
                    picker = ImagePicker.openCamera;
                  }
                  if (picker) {
                    picker({
                      cropping: true,
                      width: 800,
                      height: 800,
                      compressImageQuality: 0.9,
                    })
                    .then(image => saveInput(this.screenId, {
                      avatarType: 'custom', 
                      avatarImage: image,
                    }))
                    .catch(error => {
                      if (error.code != 'E_PICKER_CANCELLED') {
                        logger.warn(error.message);
                      }
                    });
                  } 
                }
              );
            }}
          >
            <components.ButtonWithBg text='打开相册' textStyle={{fontSize: 16}} />
          </components.ActionSheet>
            
        </ScrollView>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    margin: 10,
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 10,
  },
  avatarBuiltin: {
    width: 40, 
    height: 40,
  },
});

function mapStateToProps(state) {
  let {input, object, account} = state;
  return {
    input,
    object,
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileAvatar);
