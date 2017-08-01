/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  task: ''
}

export default (state = initialState, action) => {
  if (action.type === 'PROCESSING_TASK') {
    let {task} = action
    return {
      ...state,
      task
    }
  } else if (action.type === 'RESET' || action.type === 'RESET_PROCESSING') {
    return initialState
  } else {
    return state
  }
}
