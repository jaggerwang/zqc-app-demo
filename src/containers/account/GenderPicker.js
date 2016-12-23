/**
 * 在球场
 * zaiqiuchang.com
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../../components';
import * as actions from '../../actions';

function mapStateToProps(state) {
  let {object} = state;
  let {account} = state;
  return {
    object,
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    submit: actions.editProfileGenderSubmit,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.GenderPicker);
