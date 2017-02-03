/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {COLOR, DEFAULT_NAV_BAR_STYLE} from '../../config';
import {ApiResultError, ERROR_CODE_DUPLICATED} from '../../error';
import * as components from '../';
import * as actions from '../../actions';

class EditProfileEmail extends Component {
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

    this.screenId = props.screenId || 'EditProfileEmail';

    let {navigator} = props;
    navigator.setOnNavigatorEvent(event => this.onNavigatorEvent(event));
  }

  componentDidMount() {
    let {object, account, saveInput} = this.props;
    let user = object.users[account.id];
    if (user.email) {
      saveInput(this.screenId, {email: user.email});  
    }

    this.timerSend = setInterval(
      () => {
        let {screen, setScreenState} = this.props;
        let {secondsToSend} = screen[this.screenId];
        if (secondsToSend > 0) {
          setScreenState(this.screenId, {secondsToSend: secondsToSend - 1});
        }
      },
      1000,
    );
  }

  componentWillUnmount() {
    let {resetInput} = this.props;
    resetInput(this.screenId);
    dismissKeyboard();
    clearInterval(this.timerSend);
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

    let {navigator, handleError, errorFlash, input, validateInput, updateAccount} = this.props;
    validateInput(this.screenId, input[this.screenId], () => {
      updateAccount({
        update: input[this.screenId], 
        cbOk: () => navigator.pop(), 
        cbFail: error => {
          if (error instanceof ApiResultError) {
            if (error.code == ERROR_CODE_DUPLICATED) {
              errorFlash("邮箱已注册过。");
              return;
            }
          }
          handleError(error);
        },
      });
    });
  }

  render() {
    let {navigator, input, screen, errorFlash, saveInput, setScreenState, sendVerifyCode} = this.props;
    let {email, code} = input[this.screenId];
    let {secondsToSend} = screen[this.screenId];

    return (
      <components.Layout screenId={this.screenId}>
        <components.Form>
          <components.FormItem icon='email' containerStyle={{borderTopWidth: 0}}>
            <components.TextInput
              placeholder='输入邮箱'
              returnKeyType='next'
              defaultValue={input[this.screenId].email}
              autoFocus={true}
              onChangeText={text => saveInput(this.screenId, {email: text.trim()})}
              onSubmitEditing={() => this.refVerifyCode.focus()}
            />
          </components.FormItem>
          <components.FormItem icon='vpn-key'>
            <components.TextInput
              placeholder='输入验证码'
              maxLength={4}
              keyboardType='numeric'
              defaultValue={code}
              onRef={ref => this.refVerifyCode = ref}
              onChangeText={text => saveInput(this.screenId, {code: text.trim()})}
              onSubmitEditing={() => this.submit()}
            />
          </components.FormItem>
        </components.Form>
        <components.TextNotice>如果没有收到邮件，请检查垃圾箱。</components.TextNotice>
        <components.ButtonWithBg
          text={'发送验证码'+(secondsToSend > 0 ? ' ('+secondsToSend+')' : '')}
          textStyle={{fontSize: 16}}
          disable={secondsToSend > 0 || email == ''}
          onPress={
            secondsToSend == 0 ? 
            () => {
              dismissKeyboard();
              let cbOk = () => {
                errorFlash('发送成功。');
                setScreenState(this.screenId, {secondsToSend: 30});
              };
              sendVerifyCode({by: "email", email, cbOk});
            } : 
            null
          }
        />
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({});

function mapStateToProps(state) {
  let {input, screen, object, account} = state;
  return {
    input,
    screen,
    object,
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileEmail);
