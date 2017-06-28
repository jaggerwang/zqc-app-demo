/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  version: undefined
}

export default (state = initialState, action) => {
  if (action.type === 'set_store_version') {
    let {version} = action
    return {
      ...state,
      version
    }
  } else if (action.type === 'reset' || action.type === 'reset_store') {
    return initialState
  } else {
    return state
  }
}
