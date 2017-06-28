/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  nearby: []
}

export default (state = initialState, action) => {
  if (action.type === 'set_nearby_users') {
    let {userIds} = action
    return {
      ...state,
      nearby: userIds
    }
  } else if (action.type === 'reset' || action.type === 'reset_user') {
    return initialState
  } else {
    return state
  }
}
