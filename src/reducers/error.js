/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  input: {},
  flash: ''
}

export default (state = initialState, action) => {
  if (action.type === 'error_input') {
    let {screenId, error} = action
    return {
      ...state,
      input: {
        ...state.input,
        [screenId]: {
          ...(state.input[screenId] === undefined ? {} : state.input[screenId]),
          ...error
        }
      }
    }
  } else if (action.type === 'reset_error_input') {
    let {screenId} = action
    if (screenId === undefined) {
      return {
        ...state,
        input: initialState.input
      }
    } else {
      return {
        ...state,
        input: {
          ...state.input,
          [screenId]: initialState.input[screenId] || {}
        }
      }
    }
  } else if (action.type === 'error_flash') {
    let {error} = action
    return {
      ...state,
      flash: error
    }
  } else if (action.type === 'reset' || action.type === 'reset_error') {
    return initialState
  } else {
    return state
  }
}
