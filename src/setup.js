/**
 * 在球场
 * zaiqiuchang.com
 */

import {AppRegistry, Keyboard, NetInfo, Platform} from 'react-native'
import compareVersions from 'compare-versions'
import coordtransform from 'coordtransform'

import {VERSION} from './config'
import logger from './logger'
import store, {persistStore} from './store'
import App from './App'
import * as actions from './actions'

AppRegistry.registerComponent('zqcdemo', () => App)

persistStore(store, state => {
  let {dispatch, getState} = store

  let version = state.store ? state.store.version : undefined
  if (version === undefined || compareVersions(version, VERSION) < 0) {
    dispatch(actions.reset())
    dispatch(actions.setStoreVersion(VERSION))
  }
  dispatch(actions.resetScreenLastRefreshTime())

  if (Platform.OS !== 'ios') {
    NetInfo.isConnected.fetch().then(isConnected =>
      dispatch(actions.setNetwork({isConnected}))
    )
    NetInfo.fetch().then(reach => {
      reach = (reach === 'cell' ||
        reach.startsWith('MOBILE')) ? 'mobile' : 'wifi'
      dispatch(actions.setNetwork({reach}))
    })
  }
  NetInfo.isConnected.addEventListener(
    'change',
    isConnected => {
      let {network} = getState()
      dispatch(actions.setNetwork({isConnected}))
      if (network.isConnected !== undefined) {
        dispatch(actions.errorFlash(
          isConnected === true ? '网络已恢复。' : '网络不可用。'))
      }
    }
  )
  NetInfo.addEventListener(
    'change',
    reach => {
      reach = (reach === 'cell' ||
        reach.startsWith('MOBILE')) ? 'mobile' : 'wifi'
      let {network} = getState()
      dispatch(actions.setNetwork({reach}))
      if (network.reach !== undefined) {
        actions.errorFlash(
          reach === 'mobile' ? '当前为移动网络。' : '当前为WIFI网络。')
      }
    }
  )

  let getPositionSuccess = position => {
    if (position) {
      let gcj02 = coordtransform.wgs84togcj02(
        position.coords.longitude, position.coords.latitude)
      position.coords.longitude = gcj02[0]
      position.coords.latitude = gcj02[1]
    }
    dispatch(actions.setLocationPosition(position))
  }
  let getPositionError = error => logger.debug(error)
  let getPositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 600000
  }
  navigator.geolocation.getCurrentPosition(
    getPositionSuccess, getPositionError, getPositionOptions)
  navigator.geolocation.watchPosition(
    getPositionSuccess, getPositionError, getPositionOptions)

  Keyboard.addListener('keyboardDidShow',
    event => dispatch(actions.setKeyboard({coords: event.endCoordinates})))
  Keyboard.addListener('keyboardDidHide',
    event => dispatch(actions.setKeyboard({coords: null})))
})
