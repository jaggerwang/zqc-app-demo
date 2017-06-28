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
  if (action.type === 'cache_objects') {
    let newState = Object.assign({}, state)
    for (let [k, v] of Object.entries(action)) {
      if (newState[k] === undefined) {
        continue
      }
      newState[k] = Object.assign({}, newState[k], v)
    }
    return newState
  } else if (action.type === 'reset' || action.type === 'reset_object_cache') {
    return initialState
  } else {
    return state
  }
}
