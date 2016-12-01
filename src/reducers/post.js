/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as actions from '../actions';

const initialState = {
  byCity: {},
};

export default (state = initialState, action) => {
  if (action.type == actions.SET_POSTS_OF_CITY) {
    let {cityCode, postIds} = action;
    return {
      ...state,
      byCity: Object.assign({}, state.byCity, {[cityCode]: postIds}),
    };
  } else if (action.type == actions.APPEND_POSTS_OF_CITY) {
    let {cityCode, postIds} = action;
    postIds = (state.byCity[cityCode] || []).concat(postIds);
    return {
      ...state,
      byCity: Object.assign({}, state.byCity, {[cityCode]: postIds}),
    };
  } else if (action.type == actions.RESET || action.type == actions.RESET_POST) {
    return initialState;
  } else {
    return state;
  }
}
