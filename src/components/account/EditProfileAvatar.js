/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

import {COLOR, DEFAULT_NAV_BAR_STYLE, RES_USER_AVATARS} from '../../config';
import * as utils from '../../utils';
import * as components from '../';
import * as actions from '../../actions';
import * as helpers from '../helpers';

export default class EditProfileAvatar extends Component {
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
    let {avatarType, avatarName, avatarFile} = helpers.userFromCache(object, account.userId);
    saveInput(this.screenId, {avatarType, avatarName, avatarUri: (avatarFile ? avatarFile.url : '')});
  }

  onNavigatorEvent(event) {
    let {navigator, submit} = this.props;
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'done') {
        submit(this.screenId, navigator);
      } else if (event.id == 'cancel') {
        navigator.pop();
      }
    }
  }

  render() {
    let {navigator, loading, processing, error, input, saveInput} = this.props;
    let {selectCustomAvatar, submit} = this.props;
    
    return (
      <components.Layout
        loading={loading}
        processing={processing}
        errorFlash={error.flash}
      >
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
          <components.ButtonWithBg
            text='打开相册'
            onPress={() => {
              ImagePicker.showImagePicker(
                {
                  title: '设置头像',
                  takePhotoButtonTitle: '拍照',
                  chooseFromLibraryButtonTitle: '相册',
                  cancelButtonTitle: '取消',
                  mediaType: 'photo',
                  allowsEditing: true,
                  noData: true,
                  storageOptions: {},
                },
                picker => selectCustomAvatar(this.screenId, picker),
              );
            }}
            textStyle={{fontSize: 16}}
          />
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
