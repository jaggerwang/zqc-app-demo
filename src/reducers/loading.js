/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  loadingCount: 0,
  prompt: undefined,
  enabled: true
}

export default (state = initialState, action) => {
  if (action.type === 'loading_start') {
    let {prompt} = action
    return {
      ...state,
      loadingCount: (state.loadingCount + 1),
      prompt: prompt
    }
  } else if (action.type === 'loading_end') {
    return {
      ...state,
      loadingCount: (state.loadingCount - 1),
      prompt: undefined
    }
  } else if (action.type === 'enable_loading') {
    return {
      ...state,
      enabled: true
    }
  } else if (action.type === 'disable_loading') {
    return {
      ...state,
      enabled: false
    }
  } else if (action.type === 'reset' || action.type === 'reset_loading') {
    return initialState
  } else {
    return state
  }
}
