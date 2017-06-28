/**
 * 在球场
 * zaiqiuchang.com
 */

export const GENDERS = [
  {label: '男', value: 'm'},
  {label: '女', value: 'f'}
]

export const RES_USER_AVATARS = new Map([
  ['american-football-player-1',
    require('zqcdemo/res/img/avatar/american-football-player-1.png')],
  ['american-football-player',
    require('zqcdemo/res/img/avatar/american-football-player.png')],
  ['baseball-player',
    require('zqcdemo/res/img/avatar/baseball-player.png')],
  ['basketball-player',
    require('zqcdemo/res/img/avatar/basketball-player.png')],
  ['bodybuilder', require('zqcdemo/res/img/avatar/bodybuilder.png')],
  ['cricket-player', require('zqcdemo/res/img/avatar/cricket-player.png')],
  ['cyclist-1', require('zqcdemo/res/img/avatar/cyclist-1.png')],
  ['cyclist', require('zqcdemo/res/img/avatar/cyclist.png')],
  ['fencer', require('zqcdemo/res/img/avatar/fencer.png')],
  ['football-player',
    require('zqcdemo/res/img/avatar/football-player.png')],
  ['formula-1', require('zqcdemo/res/img/avatar/formula-1.png')],
  ['golfer', require('zqcdemo/res/img/avatar/golfer.png')],
  ['gymnast', require('zqcdemo/res/img/avatar/gymnast.png')],
  ['hockey-player', require('zqcdemo/res/img/avatar/hockey-player.png')],
  ['horsewoman', require('zqcdemo/res/img/avatar/horsewoman.png')],
  ['karate', require('zqcdemo/res/img/avatar/karate.png')],
  ['kickboxer', require('zqcdemo/res/img/avatar/kickboxer.png')],
  ['kudo', require('zqcdemo/res/img/avatar/kudo.png')],
  ['motorcyclist', require('zqcdemo/res/img/avatar/motorcyclist.png')],
  ['pilot', require('zqcdemo/res/img/avatar/pilot.png')],
  ['rowing', require('zqcdemo/res/img/avatar/rowing.png')],
  ['shooter', require('zqcdemo/res/img/avatar/shooter.png')],
  ['skier-1', require('zqcdemo/res/img/avatar/skier-1.png')],
  ['skier', require('zqcdemo/res/img/avatar/skier.png')],
  ['sumotori', require('zqcdemo/res/img/avatar/sumotori.png')],
  ['swimmer', require('zqcdemo/res/img/avatar/swimmer.png')],
  ['taekwondo', require('zqcdemo/res/img/avatar/taekwondo.png')],
  ['tennis-player', require('zqcdemo/res/img/avatar/tennis-player.png')],
  ['volleyball-player',
    require('zqcdemo/res/img/avatar/volleyball-player.png')],
  ['weightlifter', require('zqcdemo/res/img/avatar/weightlifter.png')]
])

export const RES_USER_BACKGROUNDS = new Map([
  ['light-circle',
    require('zqcdemo/res/img/user-background/light-circle.png')],
  ['juhua', require('zqcdemo/res/img/user-background/juhua.png')],
  ['pugongying', require('zqcdemo/res/img/user-background/pugongying.png')]
])

export const HOT_CITIES = [
  {name: '全国', code: ''},
  {name: '北京', code: '010'},
  {name: '上海', code: '021'},
  {name: '成都', code: '028'}
]

export const SPORTS = [
  {name: '网球', code: 'tennis', disabled: false},
  {name: '羽毛球', code: 'badminton', disabled: true},
  {name: '高尔夫', code: 'golf', disabled: true}
]

export const VIDEO_RATES = [
  {label: '流畅', value: 'ld', pixelSize: [640, 360]},
  {label: '高清', value: 'hd', pixelSize: [1280, 720]},
  {label: '1080p', value: 'fhd', pixelSize: [1920, 1080]}
]

export const POST_STATUS_NORMAL = 1
export const POST_STATUS_DELETED = 2
