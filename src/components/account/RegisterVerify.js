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
import * as components from '../';
import * as actions from '../../actions';

class RegisterVerify extends Component {
  static navigatorStyle = DEFAULT_NAV_BAR_STYLE;

  constructor(props) {
    super(props);
    
    this.screenId = props.screenId || 'RegisterVerify';
  }

  componentDidMount() {
    let {mobile, password, saveInput, setScreenState} = this.props;
    saveInput(this.screenId, {mobile, password});
    setScreenState(this.screenId, {secondsToSend: 30});

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
    clearInterval(this.timerSend);
  }

  submit() {
    dismissKeyboard();

    let {navigator, input, validateInput, register} = this.props;
    validateInput(this.screenId, input[this.screenId], () => {
      let {mobile, password, code} = input[this.screenId];
      register({mobile, password, code, cbOk: () => navigator.push({
        screen: 'zqc.RegisterProfile', 
        title: '完善资料',
      })});
    });
  }

  render() {
    let {navigator, input, screen, errorFlash, saveInput, setScreenState, sendVerifyCode} = this.props;
    let {code, mobile} = input[this.screenId];
    let {secondsToSend} = screen[this.screenId];

    return (
      <components.Layout screenId={this.screenId}>
        <components.TextNotice>验证码短信已发送，请注意查收。</components.TextNotice>
        <components.Form>
          <components.FormItem icon='vpn-key' containerStyle={{borderTopWidth: 0}}>
            <components.TextInput
              placeholder='输入验证码'
              maxLength={4}
              keyboardType='numeric'
              defaultValue={code}
              onChangeText={text => saveInput(this.screenId, {code: text.trim()})}
              onSubmitEditing={() => this.submit()}
            />
          </components.FormItem>
        </components.Form>
        <View style={{flexDirection: 'row'}}>
          <components.ButtonWithBg
            text={'重发'+(secondsToSend > 0 ? ' ('+secondsToSend+')' : '')}
            containerStyle={{flex: 1}}
            disable={secondsToSend > 0}
            onPress={
              secondsToSend == 0 ? 
              () => {
                dismissKeyboard();
                let cbOk = () => {
                  errorFlash('发送成功。');
                  setScreenState(this.screenId, {secondsToSend: 30});
                };
                sendVerifyCode({by: "mobile", mobile, cbOk});
              } : 
              null
            }
          />
          <components.ButtonWithBg
            text='下一步'
            textStyle={{fontSize: 16}}
            containerStyle={{flex: 2}}
            onPress={() => this.submit()}
          />
        </View>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({});

function mapStateToProps(state) {
  let {input, screen} = state;
  return {
    input,
    screen,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterVerify);
