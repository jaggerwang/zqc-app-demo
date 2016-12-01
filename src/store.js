/**
 * 在球场
 * zaiqiuchang.com
 */

import {AsyncStorage} from 'react-native';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist';

import {IN_DEBUGGER} from './config';
import reducers from './reducers';

let middlewares = [thunk];

if (IN_DEBUGGER) {
  middlewares.push(createLogger({
    duration: true,
    collapsed: false,
  }));
}

export const createZqcStore = compose(
  applyMiddleware(...middlewares),
)(createStore);

export function createPersistStore(onOk, onFail) {
  let store = createZqcStore(reducers, undefined, autoRehydrate());
  persistStore(
    store,
    {
      storage: AsyncStorage, 
      blacklist: ['navigation', 'loading', 'processing', 'error', 'network', 
        'location', 'store'],
    },
    (error, state) => {
      if (error) {
        if (onFail) {
          onFail(error);
        }
      } else {
        if (onOk) {
          onOk(store);
        }
      }
    }
  );
  if (IN_DEBUGGER) {
    window.store = store;
  }
  return store;
}
