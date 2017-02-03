/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as actions from '../actions';

const initialState = {
  lastRefreshTime: {},
  
  RegisterVerify: {
    secondsToSend: 0,
  },
  ResetPassword: {
    secondsToSend: 0,
  },

  Nearby: {
    refreshing: false,
  },
  AtCourt: {
    refreshing: false,
  },
  Me: {
    refreshing: false,
  },

  PostDetail: {
    refreshing: false,
    isShowCommentBar: false,
  },
  PostLikes: {
    refreshing: false,
  },

  CourtDetail: {
    refreshing: false,
  },
  SelectCourt: {
    refreshing: false,
    selectedCourt: null,
    createdCourts: [],
  },

  UserDetail: {
    refreshing: false,
  },
  EditProfileEmail: {
    secondsToSend: 0,
  },
  MyFileFavors: {
    refreshing: false,
  },
  MyPostComments: {
    refreshing: false,
  },
  MyPostLikes: {
    refreshing: false,
  },
  MyPosts: {
    refreshing: false,
  },
  
  MostFavoredFilesOfUser: {
    refreshing: false,
  },
  MostPlayedCourtsOfUser: {
    refreshing: false,
  },
  MostPlayedUsersOfCourt: {
    refreshing: false,
  },

  Album: {
    navBarHidden: false,
    files: [],
    currentIndex: 0,
  },

  AdminPostList: {
    refreshing: false,
  },
  AdminSelectCourt: {
    refreshing: false,
    selectedCourt: null,
    createdCourts: [],
    searchedCourts: [],
  },
};

export default (state = initialState, action) => {
  if (action.type == actions.SET_SCREEN_STATE) {
    let {screenId, screenState} = action;
    return {
      ...state,
      [screenId]: Object.assign({}, state[screenId], screenState),
    };
  } else if (action.type == actions.SET_SCREEN_LAST_REFRESH_TIME) {
    let {screenId, lastRefreshTime, objectId} = action;
    let screenLastRefreshTime = state.lastRefreshTime[screenId] || {};
    screenLastRefreshTime = Object.assign({}, screenLastRefreshTime, {[objectId]: lastRefreshTime})
    return {
      ...state,
      lastRefreshTime: Object.assign({}, state.lastRefreshTime, {[screenId]: screenLastRefreshTime}),
    };
  } else if (action.type == actions.RESET_SCREEN_STATE) {
    let {screenId} = action;
    if (screenId === undefined) {
      return initialState;
    } else {
      return {
        ...state,
        [screenId]: initialState[screenId],
      };
    }
  } else if (action.type == actions.RESET_SCREEN_LAST_REFRESH_TIME) {
    return {
      ...state,
      lastRefreshTime: initialState.lastRefreshTime,
    };
  } else if (action.type == actions.RESET) {
    return initialState;
  } else {
    return state;
  }
}
