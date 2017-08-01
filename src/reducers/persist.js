/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  rehydrated: false
}

export default (state = initialState, action) => {
  if (action.type === 'SET_PERSIST_REHYDRATED') {
    let {rehydrated} = action
    return {
      ...state,
      rehydrated
    }
  } else if (action.type === 'RESET_PERSIST') {
    return initialState
  } else {
    return state
  }
}
