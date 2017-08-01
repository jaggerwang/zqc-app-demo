/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  nearby: [],
  byCity: {}
}

export default (state = initialState, action) => {
  if (action.type === 'SET_NEARBY_POSTS') {
    let {postIds} = action
    return {
      ...state,
      nearby: postIds
    }
  } else if (action.type === 'APPEND_NEARBY_POSTS') {
    let {postIds} = action
    return {
      ...state,
      nearby: state.nearby.concat(postIds)
    }
  } else if (action.type === 'SET_POSTS_OF_CITY') {
    let {cityCode, postIds} = action
    return {
      ...state,
      byCity: Object.assign({}, state.byCity, {[cityCode]: postIds})
    }
  } else if (action.type === 'APPEND_POSTS_OF_CITY') {
    let {cityCode, postIds} = action
    postIds = (state.byCity[cityCode] || []).concat(postIds)
    return {
      ...state,
      byCity: Object.assign({}, state.byCity, {[cityCode]: postIds})
    }
  } else if (action.type === 'RESET' || action.type === 'RESET_POST') {
    return initialState
  } else {
    return state
  }
}
