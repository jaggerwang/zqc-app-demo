/**
 * 在球场
 * zaiqiuchang.com
 */

import {AppRegistry, NetInfo, Platform} from 'react-native'
import compareVersions from 'compare-versions'
import coordtransform from 'coordtransform'

import {VERSION} from './config'
import logger from './logger'
import store, {persistStore} from './store'
import App from './App'
import * as actions from './actions'

persistStore(
  store,
  state => {
    store.dispatch(actions.setPersistRehydrated(true))
    logger.info('load state ok')

    let {store: {version}} = state || {store: {version: undefined}}
    if (version === undefined || compareVersions(version, VERSION) < 0) {
      store.dispatch(actions.reset())
      store.dispatch(actions.setStoreVersion(VERSION))
    }
    store.dispatch(actions.resetScreenLastRefreshTime())
    logger.info('check store version ok')

    if (Platform.OS !== 'ios') {
      NetInfo.isConnected.fetch().then(isConnected =>
        store.dispatch(actions.setNetwork({isConnected}))
      )
      NetInfo.fetch().then(reach => {
        reach = (reach === 'cell' ||
          reach.startsWith('MOBILE')) ? 'mobile' : 'wifi'
        store.dispatch(actions.setNetwork({reach}))
      })
    }
    NetInfo.isConnected.addEventListener(
      'change',
      isConnected => {
        let {network} = store.getState()
        store.dispatch(actions.setNetwork({isConnected}))
        if (network.isConnected !== undefined) {
          store.dispatch(actions.errorFlash(
            isConnected === true ? '网络已恢复。' : '网络不可用。'))
        }
      }
    )
    NetInfo.addEventListener(
      'change',
      reach => {
        reach = (reach === 'cell' ||
          reach.startsWith('MOBILE')) ? 'mobile' : 'wifi'
        let {network} = store.getState()
        store.dispatch(actions.setNetwork({reach}))
        if (network.reach !== undefined) {
          actions.errorFlash(
            reach === 'mobile' ? '当前为移动网络。' : '当前为WIFI网络。')
        }
      }
    )
    logger.info('listen network ok')

    let getPositionSuccess = position => {
      if (position) {
        let gcj02 = coordtransform.wgs84togcj02(
          position.coords.longitude, position.coords.latitude)
        position.coords.longitude = gcj02[0]
        position.coords.latitude = gcj02[1]
      }
      store.dispatch(actions.setLocationPosition(position))
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
    logger.info('listen location ok')
  },
  error => {
    logger.error('load state fail', error)
    store.dispatch(actions.setPersistRehydrated(true))
  }
)

AppRegistry.registerComponent('zqcdemo', () => App)
