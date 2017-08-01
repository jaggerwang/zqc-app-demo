/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  nearby: []
}

export default (state = initialState, action) => {
  if (action.type === 'SET_NEARBY_USERS') {
    let {userIds} = action
    return {
      ...state,
      nearby: userIds
    }
  } else if (action.type === 'RESET' || action.type === 'RESET_USER') {
    return initialState
  } else {
    return state
  }
}
