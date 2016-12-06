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

export const createAppStore = compose(
  applyMiddleware(...middlewares),
)(createStore);

export default function createPersistAppStore() {
  return new Promise((resolve, reject) => {
    let store = createAppStore(reducers, undefined, autoRehydrate());
    if (IN_DEBUGGER) {
      window.store = store;
    }

    persistStore(
      store,
      {
        storage: AsyncStorage, 
        blacklist: ['loading', 'processing', 'error', 'network', 'location'],
      },
      (error, state) => {
        if (error) {
          reject(error);
        } else {
          resolve(store);
        }
      },
    );
  });
}
