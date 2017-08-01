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
  if (action.type === 'LOADING_START') {
    let {prompt} = action
    return {
      ...state,
      loadingCount: (state.loadingCount + 1),
      prompt: prompt
    }
  } else if (action.type === 'LOADING_END') {
    return {
      ...state,
      loadingCount: (state.loadingCount - 1),
      prompt: undefined
    }
  } else if (action.type === 'ENABLE_LOADING') {
    return {
      ...state,
      enabled: true
    }
  } else if (action.type === 'DISABLE_LOADING') {
    return {
      ...state,
      enabled: false
    }
  } else if (action.type === 'RESET' || action.type === 'RESET_LOADING') {
    return initialState
  } else {
    return state
  }
}
