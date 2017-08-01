/**
 * 在球场
 * zaiqiuchang.com
 */

const initialState = {
  id: undefined,
  settings: {
    'betaUser': false,
    'city': {
      'name': '全国',
      'code': ''
    },
    'sport': {
      'name': '网球',
      'code': 'tennis'
    },
    'storage': {
      'quota': 1073741824,
      'usedAmountMonth': 0
    },
    'video': {
      'autoPlay': {
        'wifi': true,
        'mobile': true
      },
      'playRate': {
        'wifi': 'hd',
        'mobile': 'ld'
      },
      'uploadRate': {
        'wifi': 'fhd',
        'mobile': 'hd'
      }
    }
  }
}

export default (state = initialState, action) => {
  if (action.type === 'SET_ACCOUNT_USER') {
    let {id} = action
    return {
      ...state,
      id
    }
  } else if (action.type === 'SET_ACCOUNT_SETTINGS') {
    let {settings} = action
    return {
      ...state,
      settings
    }
  } else if (action.type === 'RESET' || action.type === 'RESET_ACCOUNT') {
    return initialState
  } else {
    return state
  }
}
