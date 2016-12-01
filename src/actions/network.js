/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as utils from '../utils';
import * as actions from './';

export const RESET_NETWORK = 'reset_network';
export const SET_NETWORK = 'set_network';
export const SET_SCENE_LAST_REFRESH_TIME = 'set_scene_last_refresh_time';

export function resetNetwork() {
  return {
    type: RESET_NETWORK,
  };
}

export function setNetwork({isConnected}) {
  return {
    type: SET_NETWORK,
    isConnected,
  };
}

export function setSceneLastRefreshTime({sceneKey, lastRefreshTime, objectId=''}) {
  lastRefreshTime = lastRefreshTime || new Date();
  return {
    type: SET_SCENE_LAST_REFRESH_TIME,
    sceneKey,
    lastRefreshTime,
    objectId,
  };
}
