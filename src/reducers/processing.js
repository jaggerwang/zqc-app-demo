/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  task: ''
}

export default (state = initialState, action) => {
  if (action.type === 'processing_task') {
    let {task} = action
    return {
      ...state,
      task
    }
  } else if (action.type === 'reset' || action.type === 'reset_processing') {
    return initialState
  } else {
    return state
  }
}
