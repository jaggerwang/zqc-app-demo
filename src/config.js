/**
 * 在球场
 * zaiqiuchang.com
 */
import {Platform, Dimensions} from 'react-native';

export const DEBUG = __DEV__;
export const IN_DEBUGGER = DEBUG && !!window.navigator.userAgent;

export const VERSION = '1.0.2';

let {width, height} = Dimensions.get('window');
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const NAV_BAR_HEIGHT = Platform.OS == 'ios' ? 64 : 54;
export const TAB_BAR_HEIGHT = 50;

export let SCHEME = 'https';
export let DOMAIN_API = 'api.zaiqiuchang.com';
export let API_ORIGIN = `${SCHEME}://${DOMAIN_API}`;

export const COLOR = {
  theme: '#006633',
  textPrompt: '#929292',
  textNormal: '#5E5E5E',
  textEmpha: '#212121',
  textLightPrompt: '#EBEBEB',
  textLightNormal: '#FFFFFF',
  backgroundDarker: '#D6D6D6',
  backgroundNormal: '#EBEBEB',
  backgroundLighter: '#FFFFFF',
  backgroundDarkLighter: '#212121',
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
  navBarNoBorder: true,
  statusBarHideWithNavBar: true,
  statusBarTextColorScheme: 'light',
};

export const HIDDEN_NAV_BAR_STYLE = {
  navBarHidden: true,
  statusBarHideWithNavBar: true,
};

export const RES_USER_AVATARS = new Map([
  ['american-football-player-1', require('zaiqiuchang/res/img/avatar/american-football-player-1.png')],
  ['american-football-player', require('zaiqiuchang/res/img/avatar/american-football-player.png')],
  ['baseball-player', require('zaiqiuchang/res/img/avatar/baseball-player.png')],
  ['basketball-player', require('zaiqiuchang/res/img/avatar/basketball-player.png')],
  ['bodybuilder', require('zaiqiuchang/res/img/avatar/bodybuilder.png')],
  ['cricket-player', require('zaiqiuchang/res/img/avatar/cricket-player.png')],
  ['cyclist-1', require('zaiqiuchang/res/img/avatar/cyclist-1.png')],
  ['cyclist', require('zaiqiuchang/res/img/avatar/cyclist.png')],
  ['fencer', require('zaiqiuchang/res/img/avatar/fencer.png')],
  ['football-player', require('zaiqiuchang/res/img/avatar/football-player.png')],
  ['formula-1', require('zaiqiuchang/res/img/avatar/formula-1.png')],
  ['golfer', require('zaiqiuchang/res/img/avatar/golfer.png')],
  ['gymnast', require('zaiqiuchang/res/img/avatar/gymnast.png')],
  ['hockey-player', require('zaiqiuchang/res/img/avatar/hockey-player.png')],
  ['horsewoman', require('zaiqiuchang/res/img/avatar/horsewoman.png')],
  ['karate', require('zaiqiuchang/res/img/avatar/karate.png')],
  ['kickboxer', require('zaiqiuchang/res/img/avatar/kickboxer.png')],
  ['kudo', require('zaiqiuchang/res/img/avatar/kudo.png')],
  ['motorcyclist', require('zaiqiuchang/res/img/avatar/motorcyclist.png')],
  ['pilot', require('zaiqiuchang/res/img/avatar/pilot.png')],
  ['rowing', require('zaiqiuchang/res/img/avatar/rowing.png')],
  ['shooter', require('zaiqiuchang/res/img/avatar/shooter.png')],
  ['skier-1', require('zaiqiuchang/res/img/avatar/skier-1.png')],
  ['skier', require('zaiqiuchang/res/img/avatar/skier.png')],
  ['sumotori', require('zaiqiuchang/res/img/avatar/sumotori.png')],
  ['swimmer', require('zaiqiuchang/res/img/avatar/swimmer.png')],
  ['taekwondo', require('zaiqiuchang/res/img/avatar/taekwondo.png')],
  ['tennis-player', require('zaiqiuchang/res/img/avatar/tennis-player.png')],
  ['volleyball-player', require('zaiqiuchang/res/img/avatar/volleyball-player.png')],
  ['weightlifter', require('zaiqiuchang/res/img/avatar/weightlifter.png')],
]);

export const RES_USER_BACKGROUNDS = new Map([
  ['light-circle', require('zaiqiuchang/res/img/user-background/light-circle.png')],
  ['juhua', require('zaiqiuchang/res/img/user-background/juhua.png')],
  ['pugongying', require('zaiqiuchang/res/img/user-background/pugongying.png')],
]);

export const GENDERS = [
  {label: '男', value: 'm'},
  {label: '女', value: 'f'},
];
