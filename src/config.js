/**
 * 在球场
 * zaiqiuchang.com
 */

import {Dimensions} from 'react-native';

export const DEBUG = __DEV__;
export const IN_DEBUGGER = DEBUG && !!window.navigator.userAgent;

export const VERSION = '1.3.0';

let {width, height} = Dimensions.get('window');
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const NAV_BAR_HEIGHT = 65;
export const TAB_BAR_HEIGHT = 50;

export let SCHEME = 'https';
export let DOMAIN_API = 'api.zaiqiuchang.com';
export let DOMAIN_WWW = 'www.zaiqiuchang.com';
export let DOMAIN_WEB = 'web.zaiqiuchang.com';
export let API_BASE_URL = `${SCHEME}://${DOMAIN_API}`;
export let WWW_BASE_URL = `${SCHEME}://${DOMAIN_WWW}`;
export let WEB_BASE_URL = `${SCHEME}://${DOMAIN_WEB}`;

export const COLOR = {
  theme: '#006633',
  favored: '#C71A22',
  textPrompt: '#929292',
  textNormal: '#5E5E5E',
  textEmpha: '#212121',
  textLightPrompt: '#EBEBEB',
  textLightNormal: '#FFFFFF',
  backgroundDarker: '#D6D6D6',
  backgroundNormal: '#EBEBEB',
  backgroundLighter: '#FFFFFF',
  backgroundDarkLighter: '#424242',
  backgroundDarkNormal: '#000000',
  backgroundNotice: '#FFFB00',
  linePrompt: '#EBEBEB',
  lineNormal: '#A9A9A9',
  lineEmpha: '#929292',
};

export const DEFAULT_NAV_BAR_STYLE = {
  navBarTextColor: COLOR.textLightNormal,
  navBarBackgroundColor: COLOR.theme,
  navBarButtonColor: COLOR.textLightPrompt,
  statusBarTextColorScheme: 'light',
  statusBarHideWithNavBar: true,
};

export const HIDDEN_NAV_BAR_STYLE = {
  navBarHidden: true,
  statusBarHidden: true,
  statusBarHideWithNavBar: true,
};

export const TAB_BAR_STYLE = {
  tabBarBackgroundColor: COLOR.backgroundDarker,
  tabBarButtonColor: COLOR.textEmpha,
  tabBarSelectedButtonColor: COLOR.theme,
};

export const WECHAT = {
  app: {
    id: 'wxe1a7f5b2cf4d029b',
  },
};
