/**
 * 在球场
 * zaiqiuchang.com
 */

import {Provider} from 'react-redux';
import {Navigation} from 'react-native-navigation';

import logger from './logger';
import createPersistAppStore from './store';
import {loadIconImages} from './iconImages';
import {registerScreens, navToBootstrap} from './navigation';

export let store = null;

export default function setup() {
  createPersistAppStore()
    .then(st => {
      store = st;
      return loadIconImages();
    })
    .then(iconImages => {
      registerScreens(store, Provider);

      navToBootstrap();
    })
    .catch((error) => logger.error(error));
}
