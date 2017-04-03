/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import dismissKeyboard from 'dismissKeyboard';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {DEFAULT_NAV_BAR_STYLE} from '../../config';
import * as components from '../';
import * as actions from '../../actions';

class EditProfileIntro extends Component {
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

    this.screenId = props.screenId || 'EditProfileIntro';

    let {navigator} = props;
    navigator.setOnNavigatorEvent(event => this.onNavigatorEvent(event));
  }
  
  componentDidMount() {
    let {object, account, saveInput} = this.props;
    let user = object.users[account.id];
    if (user.intro) {
      saveInput(this.screenId, {intro: user.intro});
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

    let {navigator, input, validateInput, updateAccount} = this.props;
    validateInput(this.screenId, input[this.screenId], () => {
      updateAccount({
        update: input[this.screenId], 
        cbOk: () => navigator.pop(),
      });
    });
  }

  render() {
    let {input, saveInput} = this.props;
    return (
      <components.Layout screenId={this.screenId}>
        <components.Block>
          <components.TextInput
            placeholder="输入个性签名，50字以内"
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileIntro);
