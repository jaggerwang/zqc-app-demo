/**
 * 在球场
 * zaiqiuchang.com
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../../components';
import * as actions from '../../actions';

function mapStateToProps(state) {
  let {loading, processing, error, input, screen} = state;
  return {
    loading,
    processing,
    error,
    input,
    screen,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    errorFlash: actions.errorFlash,
    saveInput: actions.saveInput,
    setScreenState: actions.setScreenState,
    sendVerifyCode: actions.sendVerifyCode,
    submit: actions.registerVerifySubmit,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.RegisterVerify);
