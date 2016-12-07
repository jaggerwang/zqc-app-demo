/**
 * 在球场
 * zaiqiuchang.com
 */

import {combineReducers} from 'redux';
import loading from './loading';
import processing from './processing';
import error from './error';
import input from './input';
import screen from './screen';
import location from './location';
import object from './object';
import keyboard from './keyboard';
import network from './network';
import account from './account';
import post from './post';
import user from './user';

export default combineReducers({
  loading,
  processing,
  error,
  input,
  screen,
  location,
  object,
  keyboard,
  network,
  account,
  post,
  user,
});
