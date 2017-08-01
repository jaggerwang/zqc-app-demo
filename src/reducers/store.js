/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  version: undefined
}

export default (state = initialState, action) => {
  if (action.type === 'SET_STORE_VERSION') {
    let {version} = action
    return {
      ...state,
      version
    }
  } else if (action.type === 'RESET' || action.type === 'RESET_STORE') {
    return initialState
  } else {
    return state
  }
}
