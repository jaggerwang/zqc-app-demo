/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';

export const RESET_SCENE_STATE = 'reset_scene_state';
export const SET_SCENE_STATE = 'set_scene_state';

export function resetSceneState(sceneKey) {
  return {
    type: RESET_SCENE_STATE,
    sceneKey,
  };
}

export function setSceneState(sceneKey, state) {
  return {
    type: SET_SCENE_STATE,
    sceneKey,
    state,
  };
}
