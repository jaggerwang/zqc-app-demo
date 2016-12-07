/**
 * 在球场
 * zaiqiuchang.com
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../../components';
import * as actions from '../../actions';

function mapStateToProps(state) {
  let {loading, processing, error, input, screen, object, account} = state;
  return {
    loading,
    processing,
    error,
    input,
    screen,
    object,
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveInput: actions.saveInput,
    setScreenState: actions.setScreenState,
    submitGender: actions.editProfileGenderSubmit,
    submit: actions.registerProfileSubmit,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.RegisterProfile);
