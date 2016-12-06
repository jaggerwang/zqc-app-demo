/**
 * 在球场
 * zaiqiuchang.com
 */

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {COLOR} from './config';

const icons = {
  'tabbar-nearby': ['map-marker', 24, COLOR.textEmpha, FontAwesome],
  'tabbar-nearby-selected': ['map-marker', 24, COLOR.theme, FontAwesome],
  'tabbar-atcourt': ['plus-square', 24, COLOR.textEmpha, FontAwesome],
  'tabbar-atcourt-selected': ['plus-square', 24, COLOR.theme, FontAwesome],
  'tabbar-me': ['user', 24, COLOR.textEmpha, FontAwesome],
  'tabbar-me-selected': ['user', 24, COLOR.theme, FontAwesome],
}

export default function loadIconImages() {
  return new Promise((resolve, reject) => {
    const iconNames = Object.keys(icons);
    Promise.all(
      iconNames.map(iconName => {
        let [name, size, color, vendor] = icons[iconName];
        return vendor.getImageSource(name, size, color);
      })
    ).then(sources => {
      let iconImages = {};
      iconNames.forEach((iconName, index) => iconImages[iconName] = sources[index]);
      resolve(iconImages);
    });
  });
}
