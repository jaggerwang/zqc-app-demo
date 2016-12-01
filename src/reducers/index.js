/**
 * 在球场
 * zaiqiuchang.com
 */

import {combineReducers} from 'redux';
import navigation from './navigation';
import loading from './loading';
import processing from './processing';
import error from './error';
import input from './input';
import sceneState from './sceneState';
import location from './location';
import object from './object';
import store from './store';
import keyboard from './keyboard';
import network from './network';
import account from './account';
import post from './post';
import user from './user';

export default combineReducers({
  navigation,
  loading,
  processing,
  error,
  input,
  sceneState,
  location,
  object,
  store,
  keyboard,
  network,
  account,
  post,
  user,
});
