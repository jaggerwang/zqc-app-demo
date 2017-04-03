/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {HIDDEN_NAV_BAR_STYLE} from '../../config';
import * as components from '../';
import * as actions from '../../actions';

class PreLogin extends Component {
  static navigatorStyle = HIDDEN_NAV_BAR_STYLE;

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'PreLogin';
  }

  render() {
    let {navigator} = this.props;

    return (
      <components.Layout
        screenId={this.screenId}
        containerStyle={{justifyContent: 'center'}}
      >
        <components.Image
          source={require('zaiqiuchang/res/img/zqc-icon-middle.png')}
          style={{alignSelf: 'center', borderRadius: 15}}
        />
        <components.Button
          text="登录"
          onPress={() => navigator.push({screen: 'zqc.Login', title: '登录'})}
          containerStyle={{marginTop: 100}}
          textStyle={{fontSize: 16}}
        />
        <components.Button
          text="注册"
          onPress={() => navigator.push(
            {screen: 'zqc.RegisterMobile', title: '注册'})}
          containerStyle={{marginTop: 30}}
          textStyle={{fontSize: 16}}
        />
      </components.Layout>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PreLogin);
