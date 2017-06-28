/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  nearby: [],
  byCity: {}
}

export default (state = initialState, action) => {
  if (action.type === 'set_nearby_posts') {
    let {postIds} = action
    return {
      ...state,
      nearby: postIds
    }
  } else if (action.type === 'append_nearby_posts') {
    let {postIds} = action
    return {
      ...state,
      nearby: state.nearby.concat(postIds)
    }
  } else if (action.type === 'set_posts_of_city') {
    let {cityCode, postIds} = action
    return {
      ...state,
      byCity: Object.assign({}, state.byCity, {[cityCode]: postIds})
    }
  } else if (action.type === 'append_posts_of_city') {
    let {cityCode, postIds} = action
    postIds = (state.byCity[cityCode] || []).concat(postIds)
    return {
      ...state,
      byCity: Object.assign({}, state.byCity, {[cityCode]: postIds})
    }
  } else if (action.type === 'reset' || action.type === 'reset_post') {
    return initialState
  } else {
    return state
  }
}
