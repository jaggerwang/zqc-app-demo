/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import dismissKeyboard from 'dismissKeyboard';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {DEFAULT_NAV_BAR_STYLE} from '../../config';
import {ApiResultError, ERROR_CODE_DUPLICATED} from '../../error';
import * as components from '../';
import * as actions from '../../actions';

class EditProfileNickname extends Component {
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

    this.screenId = props.screenId || 'EditProfileNickname';

    let {navigator} = props;
    navigator.setOnNavigatorEvent(event => this.onNavigatorEvent(event));
  }
  
  componentDidMount() {
    let {object, account, saveInput} = this.props;
    let user = object.users[account.id];
    if (user.nickname) {
      saveInput(this.screenId, {nickname: user.nickname});  
    }
  }

  componentWillUnmount() {
    let {resetInput} = this.props;
    resetInput(this.screenId);
    dismissKeyboard();
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

    let {navigator, input, errorFlash, handleError, validateInput, 
      updateAccount} = this.props;
    validateInput(this.screenId, input[this.screenId], () => {
      updateAccount({
        update: input[this.screenId], 
        cbOk: () => navigator.pop(),
        cbFail: error => {
          if (error instanceof ApiResultError) {
            if (error.code == ERROR_CODE_DUPLICATED) {
              errorFlash('昵称重复。');
              return;
            }
          }
          handleError(error);
        },
      });
    });
  }

  render() {
    let {input, saveInput} = this.props;
    
    return (
      <components.Layout screenId={this.screenId}>
        <components.Form>
          <components.FormItem 
            icon="person" 
            containerStyle={{borderTopWidth: 0}}
          >
            <components.TextInput
              placeholder="输入昵称"
              returnKeyType="done"
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
    );
  }
}

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
  EditProfileNickname);
