/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  users: {},
  posts: {},
  postComments: {},
  courts: {},
  files: {},
  userStats: {},
  postStats: {},
  courtStats: {},
  fileStats: {}
}

export default (state = initialState, action) => {
  if (action.type === 'CACHE_OBJECTS') {
    let newState = Object.assign({}, state)
    for (let [k, v] of Object.entries(action)) {
      if (newState[k] === undefined) {
        continue
      }
      newState[k] = Object.assign({}, newState[k], v)
    }
    return newState
  } else if (action.type === 'RESET' || action.type === 'RESET_OBJECT_CACHE') {
    return initialState
  } else {
    return state
  }
}
