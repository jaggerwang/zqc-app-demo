/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import dismissKeyboard from 'dismissKeyboard';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {DEFAULT_NAV_BAR_STYLE, SCREEN_WIDTH} from '../../config';
import {RES_USER_BACKGROUNDS} from '../../const';
import logger from '../../logger';
import * as components from '../';
import * as actions from '../../actions';
import * as helpers from '../../helpers';

class EditProfileBackground extends Component {
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

    this.screenId = props.screenId || 'EditProfileBackground';

    let {navigator} = props;
    navigator.setOnNavigatorEvent(event => this.onNavigatorEvent(event));
  }
  
  componentDidMount() {
    let {object, account, saveInput} = this.props;
    let {backgroundType, backgroundName, backgroundFile} = 
      helpers.userFromCache(object, account.id);
    saveInput(this.screenId, {backgroundType, backgroundName, backgroundFile});
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

    let {navigator, input, validateInput, updateAccount, uploadFile} = 
      this.props;
    validateInput(this.screenId, input[this.screenId], () => {
      let {backgroundType, backgroundName, backgroundImage} = 
        input[this.screenId];
      let cbOk = () => navigator.pop();
      if (backgroundType == 'builtin') {
        updateAccount({update: {backgroundType, backgroundName}, cbOk});
      } else if (backgroundType == 'custom') {
        if (!backgroundImage) {
          cbOk();
          return;
        }
        uploadFile({
          path: backgroundImage.path, 
          mime: backgroundImage.mime,
          cbOk: file => updateAccount({
            update: {backgroundType, backgroundId: file.id}, 
            cbOk,
          }),
        });
      }
    });
  }

  render() {
    let {input, saveInput} = this.props;
    
    return (
      <components.Layout screenId={this.screenId}>
        <ScrollView>
          <components.Image 
            source={helpers.userBackgroundSource(input[this.screenId], 
              'large')} 
            style={styles.background} 
          />
          <components.TextNotice>从内置里选取</components.TextNotice>
          <View 
            style={{
              flexDirection: 'row', 
              flexWrap: 'wrap', 
              alignItems: 'flex-start', 
              padding: 5,
            }}
          >
            {Array.from(
              RES_USER_BACKGROUNDS.entries(),
              ([k, v]) => <components.Image
                key={k}
                source={v}
                onPress={() => saveInput(this.screenId, 
                  {backgroundType: 'builtin', backgroundName: k})}
                containerStyle={{margin: 5}}
                style={styles.backgroundBuiltin}
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
                  title: '设置主页背景',
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
                      width: 1080,
                      height: 810,
                      compressImageQuality: 0.9,
                    })
                    .then(image => saveInput(this.screenId, {
                      backgroundType: 'custom', 
                      backgroundImage: image,
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
            <components.ButtonWithBg text="打开相册" textStyle={{fontSize: 16}} />
          </components.ActionSheet>
        </ScrollView>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 3 / 4,
    alignSelf: 'center',
  },
  backgroundBuiltin: {
    width: 50, 
    height: 50,
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

export default connect(mapStateToProps, mapDispatchToProps)(
  EditProfileBackground);
