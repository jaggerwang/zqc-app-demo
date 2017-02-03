/**
 * 在球场
 * zaiqiuchang.com
 */

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {COLOR} from './config';

const icons = {
  'tabbar-nearby': ['location-on', 24, COLOR.textEmpha, MaterialIcons],
  'tabbar-nearby-selected': ['location-on', 24, COLOR.theme, MaterialIcons],
  'tabbar-atcourt': ['add-box', 24, COLOR.textEmpha, MaterialIcons],
  'tabbar-atcourt-selected': ['add-box', 24, COLOR.theme, MaterialIcons],
  'tabbar-me': ['account-circle', 24, COLOR.textEmpha, MaterialIcons],
  'tabbar-me-selected': ['account-circle', 24, COLOR.theme, MaterialIcons],
}

let iconImages = {};

export function loadIconImages() {
  return new Promise((resolve, reject) => {
    const iconNames = Object.keys(icons);
    Promise.all(
      iconNames.map(iconName => {
        let [name, size, color, vendor] = icons[iconName];
        return vendor.getImageSource(name, size, color);
      })
    ).then(sources => {
      iconNames.forEach((iconName, index) => iconImages[iconName] = sources[index]);
      resolve(iconImages);
    });
  });
}

export default iconImages;
