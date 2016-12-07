/**
 * 在球场
 * zaiqiuchang.com
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../components';
import * as actions from '../actions';

function mapStateToProps(state) {
  let {loading, processing, error, screen, object, network} = state;
  let {account, user} = state;
  return {
    loading,
    processing,
    error,
    screen,
    object,
    network,
    account,
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enableLoading: actions.enableLoading,
    disableLoading: actions.disableLoading,
    setScreenLastRefreshTime: actions.setScreenLastRefreshTime,
    nearbyUsers: actions.nearbyUsers,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.AtCourt);
