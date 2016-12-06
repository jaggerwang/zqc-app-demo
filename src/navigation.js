/**
 * 在球场
 * zaiqiuchang.com
 */

import {Navigation} from 'react-native-navigation';

import {COLOR} from './config';
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

	reg('zqc.About', () => containers.About, store, Provider);
}

export function navToBootstrap() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'zqc.Bootstrap',
    },
  });
}

export function navToTab() {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: '附近',
        screen: 'zqc.Bootstrap',
        icon: iconImages['tabbar-nearby'],
        navigatorStyle: DEFAULT_NAV_BAR_STYLE,
      },
      {
        label: '在球场',
        screen: 'zqc.AtCourt',
        icon: iconImages['tabbar-atcourt'],
        navigatorStyle: DEFAULT_NAV_BAR_STYLE,
      },
      {
        label: '我',
        screen: 'zqc.Me',
        icon: iconImages['tabbar-me'],
        navigatorStyle: DEFAULT_NAV_BAR_STYLE,
      },
    ],
    tabsStyle: {
      tabBarButtonColor: COLOR.textEmpha,
      tabBarSelectedButtonColor: COLOR.theme,
      tabBarBackgroundColor: COLOR.backgroundDarker,
    },
    animationType: 'fade',
  });
}
