/**
 * 在球场
 * zaiqiuchang.com
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../components';
import * as actions from '../actions';

function mapStateToProps(state) {
  let {loading, processing, error, input, screen, location, object, 
    network} = state;
  let {account} = state;
  return {
    loading,
    processing,
    error,
    input,
    screen,
    location,
    object,
    network,
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    disableLoading: actions.disableLoading,
    enableLoading: actions.enableLoading,
    errorFlash: actions.errorFlash,
    logoutRequest: actions.logoutRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.Me);
