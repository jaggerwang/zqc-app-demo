/**
 * 在球场
 * zaiqiuchang.com
 */

import {AsyncStorage} from 'react-native';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist';

import {IN_DEBUGGER} from './config';
import reducers from './reducers';

export let store = null;

let middlewares = [thunk];
if (IN_DEBUGGER) {
  middlewares.push(createLogger({
    duration: true,
    collapsed: true,
  }));
}

export const createAppStore = compose(
  applyMiddleware(...middlewares),
)(createStore);

export function createPersistAppStore() {
  return new Promise((resolve, reject) => {
    store = createAppStore(reducers, undefined, autoRehydrate());
    if (IN_DEBUGGER) {
      window.store = store;
    }

    persistStore(
      store,
      {
        storage: AsyncStorage, 
        blacklist: ['loading', 'processing', 'error', 'network', 'location', 
          'device'],
      },
      (error, state) => {
        if (error) {
          reject(error);
        } else {
          resolve({store, state});
        }
      },
    );
  });
}
