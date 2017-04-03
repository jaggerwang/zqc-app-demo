/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {DEFAULT_NAV_BAR_STYLE} from '../../config';
import {navToTab} from '../../navigation';
import * as components from '../';
import * as actions from '../../actions';

class RegisterProfile extends Component {
  static navigatorStyle = DEFAULT_NAV_BAR_STYLE;

  constructor(props) {
    super(props);
    
    this.screenId = props.screenId || 'RegisterProfile';
  }
  
  render() {
    let {navigator, object, account, errorFlash} = this.props;
    let user = object.users[account.id];

    return (
      <components.Layout screenId={this.screenId}>
        <ScrollView>
          <components.TextNotice>帐号注册成功，请完善资料。</components.TextNotice>
          <components.Profile navigator={navigator} />
          <components.ButtonWithBg
            text="完成"
            onPress={() => {
              if (user.nickname && user.avatarType && user.gender) {
                navToTab();
              } else {
                errorFlash('请填写完基本资料。');
              }
            }}
            textStyle={{fontSize: 16}}
          />
        </ScrollView>
      </components.Layout>
    );
  }
}

function mapStateToProps(state) {
  let {object, account} = state;
  return {
    object,
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterProfile);
