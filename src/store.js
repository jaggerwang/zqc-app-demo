/**
 * 在球场
 * zaiqiuchang.com
 */

import {AsyncStorage} from 'react-native'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {autoRehydrate, persistStore as reduxPersistStore} from 'redux-persist'

import {IN_DEBUGGER} from './config'
import logger from './logger'
import reducers from './reducers'

const middlewares = [thunk]
if (IN_DEBUGGER) {
  middlewares.push(createLogger({
    duration: true,
    collapsed: true
  }))
}
const store = createStore(reducers, undefined, compose(
  applyMiddleware(...middlewares),
  autoRehydrate()
))

export function persistStore (store, cbOk) {
  reduxPersistStore(
    store,
    {
      storage: AsyncStorage,
      blacklist: ['loading', 'processing', 'error', 'network', 'location',
        'device']
    },
    (error, state) => {
      if (error) {
        logger.warn(error)
      } else {
        cbOk(state)
      }
    }
  )
}

export default store
