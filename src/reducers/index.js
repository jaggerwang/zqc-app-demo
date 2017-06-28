/**
 * 在球场
 * zaiqiuchang.com
 */

import {combineReducers} from 'redux'
import store from './store'
import loading from './loading'
import processing from './processing'
import error from './error'
import input from './input'
import screen from './screen'
import location from './location'
import object from './object'
import device from './device'
import network from './network'
import account from './account'
import user from './user'
import post from './post'
import player from './player'

export default combineReducers({
  store,
  loading,
  processing,
  error,
  network,
  location,
  device,
  input,
  screen,
  object,
  account,
  user,
  post,
  player
})
