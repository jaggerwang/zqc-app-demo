/**
 * 在球场
 * zaiqiuchang.com
 */

import ImageResizer from 'react-native-image-resizer';

import logger from '../logger';
import * as apis from '../apis';
import * as actions from './';

export const RESET_POST = 'reset_post';
export const SET_POSTS_OF_CITY = 'set_posts_of_city';
export const APPEND_POSTS_OF_CITY = 'append_posts_of_city';

export const POST_STATUS_NORMAL = 1;
export const POST_STATUS_DELETED = 2;

export function resetPost() {
  return {
    type: RESET_POST,
  };
}

export function postsOfCity({cityCode, offset='', cbOk, cbFail, cbFinish}) {
  return (dispatch, getState) => {
    let {object} = getState();
    let {account} = getState();

    let posts;
    apis.postsOfCity({
      cityCode, 
      sportCode: account.sport.code, 
      offset,
    }).then(response => {
        let {data} = response;
        posts = data.posts;
        return actions.cachePosts(object, posts);
      })
      .then(action => {
        dispatch(action);
        let postIds = posts.filter(v => v.status != POST_STATUS_DELETED)
          .map(v => v.id);
        if (offset == '') {
          dispatch({type: SET_POSTS_OF_CITY, cityCode, postIds});
        } else {
          dispatch({type: APPEND_POSTS_OF_CITY, cityCode, postIds});
        }
        if (cbOk) {
          cbOk();
        }
        if (cbFinish) {
          cbFinish();
        }
      })
      .catch(error => {
        dispatch(actions.handleApiError(error));
        if (cbFail) {
          cbFail();
        }
        if (cbFinish) {
          cbFinish();
        }
      });
  };
}
