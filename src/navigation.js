/**
 * 在球场
 * zaiqiuchang.com
 */

import {Navigation} from 'react-native-navigation';

import {COLOR, DEFAULT_NAV_BAR_STYLE, TAB_BAR_STYLE} from './config';
import iconImages from './iconImages';
import * as containers from './containers';

export function registerScreens(store, Provider) {
	const {registerComponent: reg} = Navigation;

	reg('zqc.Bootstrap', () => containers.Bootstrap, store, Provider);

	reg('zqc.PreLogin', () => containers.PreLogin, store, Provider);
	reg('zqc.Login', () => containers.Login, store, Provider);
	reg('zqc.RegisterMobile', () => containers.RegisterMobile, store, Provider);
	reg('zqc.RegisterVerify', () => containers.RegisterVerify, store, Provider);
	reg('zqc.RegisterProfile', () => containers.RegisterProfile, store, Provider);

	reg('zqc.Nearby', () => containers.Nearby, store, Provider);
	reg('zqc.AtCourt', () => containers.AtCourt, store, Provider);
	reg('zqc.Me', () => containers.Me, store, Provider);

	reg('zqc.EditProfile', () => containers.EditProfile, store, Provider);
	reg('zqc.EditProfileNickname', () => containers.EditProfileNickname, store, Provider);
	reg('zqc.EditProfileAvatar', () => containers.EditProfileAvatar, store, Provider);

	reg('zqc.CreatePost', () => containers.CreatePost, store, Provider);

  reg('zqc.CityAndSportSelector', () => containers.CityAndSportSelector, store, Provider);
	reg('zqc.About', () => containers.About, store, Provider);
}

export function navToBootstrap({passProps}={}) {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'zqc.Bootstrap',
    },
    passProps
  });
}

export function navToTab() {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: '附近',
        screen: 'zqc.Nearby',
        icon: iconImages['tabbar-nearby'],
        selectedIcon: iconImages['tabbar-nearby-selected'],
        title: '附近',
      },
      {
        label: '在球场',
        screen: 'zqc.AtCourt',
        icon: iconImages['tabbar-atcourt'],
        selectedIcon: iconImages['tabbar-atcourt-selected'],
        title: '在球场',
      },
      {
        label: '我',
        screen: 'zqc.Me',
        icon: iconImages['tabbar-me'],
        selectedIcon: iconImages['tabbar-me-selected'],
        title: '我',
      },
    ],
    tabsStyle: TAB_BAR_STYLE,
    appStyle: TAB_BAR_STYLE,
    animationType: 'fade',
  });
}
