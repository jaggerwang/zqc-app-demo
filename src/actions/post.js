/**
 * 在球场
 * zaiqiuchang.com
 */

import {POST_STATUS_NORMAL} from '../const';
import * as apis from '../apis';
import * as actions from './';

export const RESET_POST = 'reset_post';
export const SET_NEARBY_POSTS = 'set_nearby_posts';
export const APPEND_NEARBY_POSTS = 'append_nearby_posts';
export const SET_POSTS_OF_CITY = 'set_posts_of_city';
export const APPEND_POSTS_OF_CITY = 'append_posts_of_city';

export function resetPost() {
  return {
    type: RESET_POST,
  };
}

export function postInfo({postId, cbOk, cbFail, cbFinish}) {
  return dispatch => {
    dispatch(actions.cachePostByIds({postIds: [postId], update: true}))
      .then(posts => {
        if (cbFinish) {
          cbFinish();
        }
        if (cbOk) {
          cbOk(posts);
        }
      })
      .catch(error => {
        if (cbFinish) {
          cbFinish();
        }
        if (cbFail) {
          cbFail(error);
        } else {
          dispatch(actions.handleError(error));
        }
      });
  };
}

export function nearbyPosts({offset = '', cbOk, cbFail, cbFinish} = {}) {
  return (dispatch, getState) => {
    let {location: {position}} = getState();
    let {account} = getState();

    if (!position) {
      if (cbFinish) {
        cbFinish();
      }
      dispatch(actions.errorFlash('无法获取当前位置。'));
      return;
    }

    let {coords: location} = position;
    apis.nearbyPosts({
      location, 
      sportCode: account.settings.sport.code, 
      status: POST_STATUS_NORMAL, 
      offset, 
    })
      .then(response => {
        let {data: {posts}} = response;
        return dispatch(actions.cachePosts({posts}));
      })
      .then(posts => {
        if (cbFinish) {
          cbFinish();
        }
        let postIds = posts.filter(v => v.status == POST_STATUS_NORMAL)
          .map(v => v.id);
        if (offset == '') {
          dispatch({type: SET_NEARBY_POSTS, postIds});
        } else {
          dispatch({type: APPEND_NEARBY_POSTS, postIds});
        }
        if (cbOk) {
          cbOk(posts);
        }
      })
      .catch(error => {
        if (cbFinish) {
          cbFinish();
        }
        if (cbFail) {
          cbFail(error);
        } else {
          dispatch(actions.handleError(error));
        }
      });
  };
}

export function postsOfCity({cityCode = '', offset = '', cbOk, cbFail, 
  cbFinish}) {
  return (dispatch, getState) => {
    let {account} = getState();

    apis.postsOfCity({
      cityCode, 
      sportCode: account.settings.sport.code, 
      status: POST_STATUS_NORMAL,
      offset,
    })
      .then(response => {
        let {data: {posts}} = response;
        return dispatch(actions.cachePosts({posts}));
      })
      .then(posts => {
        if (cbFinish) {
          cbFinish();
        }
        let postIds = posts.filter(v => v.status == POST_STATUS_NORMAL)
          .map(v => v.id);
        if (offset == '') {
          dispatch({type: SET_POSTS_OF_CITY, cityCode, postIds});
        } else {
          dispatch({type: APPEND_POSTS_OF_CITY, cityCode, postIds});
        }
        if (cbOk) {
          cbOk(posts);
        }
      })
      .catch(error => {
        if (cbFinish) {
          cbFinish();
        }
        if (cbFail) {
          cbFail(error);
        } else {
          dispatch(actions.handleError(error));
        }
      });
  };
}
