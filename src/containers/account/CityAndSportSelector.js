/**
 * 在球场
 * zaiqiuchang.com
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../../components';
import * as actions from '../../actions';

function mapStateToProps(state) {
  let {location, account} = state;
  return {
    location,
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCity: actions.setCity,
    setSport: actions.setSport,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.CityAndSportSelector);
