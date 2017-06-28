/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation'

import {COLOR} from './config'
import * as components from './components'

export const AppNavigator = StackNavigator(
  {
    Bootstrap: {screen: components.Bootstrap},

    PreLogin: {screen: components.PreLogin},
    Login: {screen: components.Login},

    ResetPassword: {screen: components.ResetPassword},
    RegisterMobile: {screen: components.RegisterMobile},
    RegisterVerify: {screen: components.RegisterVerify},
    RegisterProfile: {screen: components.RegisterProfile},

    Album: {screen: components.Album},
    Player: {screen: components.Player},

    Tab: {screen: TabNavigator(
      {
        TabNearBy: {screen: StackNavigator(
          {
            Nearby: {screen: components.Nearby},
            SelectCityAndSport: {screen: components.SelectCityAndSport}
          },
          {
            navigationOptions: {
              headerTintColor: COLOR.textLightNormal,
              headerStyle: {backgroundColor: COLOR.theme},
              tabBarIcon: ({focused, tintColor}) => (
                <components.Icon
                  name='location-on'
                  style={{color: tintColor, fontSize: 20}}
                />
              ),
              title: '附近'
            }
          }
        )},
        TabAtCourt: {screen: StackNavigator(
          {
            AtCourt: {screen: components.AtCourt}
          },
          {
            navigationOptions: {
              headerTintColor: COLOR.textLightNormal,
              headerStyle: {backgroundColor: COLOR.theme},
              tabBarIcon: ({focused, tintColor}) => (
                <components.Icon
                  name='add-box'
                  style={{color: tintColor, fontSize: 20}}
                />
              ),
              title: '在球场'
            }
          }
        )},
        TabMe: {screen: StackNavigator(
          {
            Me: {screen: components.Me},
            EditProfileGender: {screen: components.EditProfileGender},
            EditProfile: {screen: components.EditProfile},
            EditProfileNickname: {screen: components.EditProfileNickname},
            EditProfileAvatar: {screen: components.EditProfileAvatar},
            EditProfileEmail: {screen: components.EditProfileEmail},
            EditProfileIntro: {screen: components.EditProfileIntro},
            EditProfileBackground: {screen: components.EditProfileBackground},
            Settings: {screen: components.Settings},
            SelectRate: {screen: components.SelectRate},
            About: {screen: components.About}
          },
          {
            navigationOptions: {
              headerTintColor: COLOR.textLightNormal,
              headerStyle: {backgroundColor: COLOR.theme},
              tabBarIcon: ({focused, tintColor}) => (
                <components.Icon
                  name='account-circle'
                  style={{color: tintColor, fontSize: 20}}
                />
              ),
              title: '我'
            }
          }
        )}
      },
      {
        tabBarPosition: 'bottom',
        lazy: true,
        tabBarOptions: {
          activeTintColor: COLOR.theme,
          activeBackgroundColor: COLOR.backgroundLighter,
          inactiveTintColor: COLOR.textEmpha,
          inactiveBackgroundColor: COLOR.backgroundDarker,
          showIcon: true,
          showLabel: true,
          style: {backgroundColor: COLOR.backgroundDarker},
          tabStyle: {paddingTop: 2, paddingBottom: 0},
          labelStyle: {fontSize: 12, marginTop: 0, marginBottom: 5}
        },
        navigationOptions: {
          header: null
        }
      }
    )}
  },
  {
    initialRouteName: 'Bootstrap',
    navigationOptions: {
      headerTintColor: COLOR.textLightNormal,
      headerStyle: {backgroundColor: COLOR.theme}
    }
  }
)

export function navToBootstrap (navigation, {isReset = false} = {}) {
  navigation.navigate('Bootstrap', {isReset})
}

export function navToTab (navigation) {
  navigation.navigate('Tab')
}

export function navToAlbum (navigation, {files, currentIndex = 0} = {}) {
  navigation.navigate('Album', {files, currentIndex})
}

export function navToPlayer (navigation, {file, autoPlay} = {}) {
  navigation.navigate('Player', {file, autoPlay})
}
