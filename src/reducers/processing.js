/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as actions from '../actions';

const initialState = {
  task: '',
};

export default (state = initialState, action) => {
  if (action.type == actions.PROCESSING_TASK) {
    let {task} = action;
    return {
      ...state,
      task,
    };
  } else if (action.type == actions.RESET || action.type == actions.RESET_PROCESSING) {
    return initialState;
  } else {
    return state;
  }
}
