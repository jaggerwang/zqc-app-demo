/**
 * 在球场
 * zaiqiuchang.com
 */

import * as actions from '../actions';

const initialState = {
  nearby: [],
};

export default (state = initialState, action) => {
  if (action.type == actions.SET_NEARBY_USERS) {
    let {userIds} = action;
    return {
      ...state,
      nearby: userIds,
    };
  } else if (action.type == actions.RESET || 
    action.type == actions.RESET_USER) {
    return initialState;
  } else {
    return state;
  }
};
