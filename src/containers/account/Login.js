/**
 * 在球场
 * zaiqiuchang.com
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../../components';
import * as actions from '../../actions';

function mapStateToProps(state) {
  let {loading, processing, error, input, sceneState} = state;
  return {
    loading,
    processing,
    error,
    input,
    sceneState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveInput: actions.saveInput,
    setSceneState: actions.setSceneState,
    submit: actions.loginSubmit,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.Login);
