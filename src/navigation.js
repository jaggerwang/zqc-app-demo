/**
 * 在球场
 * zaiqiuchang.com
 */

import {Navigation} from 'react-native-navigation';

import {COLOR, TAB_BAR_STYLE} from './config';
import iconImages from './iconImages';
import * as components from './components';

export function registerScreens(store, Provider) {
  let reg = (id, container) => Navigation.registerComponent(
    id, 
    () => container,
    store,
    Provider,
  );

	reg('zqc.Bootstrap', components.Bootstrap);

	reg('zqc.PreLogin', components.PreLogin);
	reg('zqc.Login', components.Login);
  reg('zqc.ResetPassword', components.ResetPassword);
	reg('zqc.RegisterMobile', components.RegisterMobile);
	reg('zqc.RegisterVerify', components.RegisterVerify);
	reg('zqc.RegisterProfile', components.RegisterProfile);

	reg('zqc.Nearby', components.Nearby);
	reg('zqc.AtCourt', components.AtCourt);
	reg('zqc.Me', components.Me);

  reg('zqc.EditProfileGender', components.EditProfileGender);
	reg('zqc.EditProfile', components.EditProfile);
	reg('zqc.EditProfileNickname', components.EditProfileNickname);
	reg('zqc.EditProfileAvatar', components.EditProfileAvatar);
  reg('zqc.EditProfileEmail', components.EditProfileEmail);
  reg('zqc.EditProfileIntro', components.EditProfileIntro);
  reg('zqc.EditProfileBackground', components.EditProfileBackground);
  
  reg('zqc.Settings', components.Settings);
  reg('zqc.SelectRate', components.SelectRate);

  reg('zqc.SelectCityAndSport', components.SelectCityAndSport);
  reg('zqc.Album', components.Album);
  reg('zqc.Player', components.Player);

  reg('zqc.About', components.About);
}

export function navToBootstrap({isReset=false}={}) {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'zqc.Bootstrap',
    },
    passProps: {
      isReset,
    },
    portraitOnlyMode: true,
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
        title: '动态',
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
    portraitOnlyMode: true,
  });
}

export function navToAlbum(navigator, files, {currentIndex=0, cbRemove}={}) {
  navigator.push({
    screen: 'zqc.Album', 
    title: '相册', 
    passProps: {
      files,
      currentIndex,
      cbRemove,
    },
  });
}

export function navToPlayer(navigator, file, {autoPlay, cbRemove, prevScreen}={}) {
  navigator.push({
    screen: 'zqc.Player', 
    title: '播放', 
    passProps: {
      file,
      autoPlay,
      cbRemove,
      prevScreen,
    },
  });
}
