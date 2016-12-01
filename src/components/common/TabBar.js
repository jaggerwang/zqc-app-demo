/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';

import {COLOR, TAB_BAR_HEIGHT} from '../../config';

export default ({currentTab, refresh}) => {
  let tabs = [
    {
      icon: 'map-marker', 
      title: '附近', 
      onPress: () => {
        if (currentTab == 0 && refresh) {
          refresh();
        } else {
          Actions.Nearby();  
        }
      },
    },
    {
      icon: 'plus-square', 
      title: '在球场',
      onPress: () => {
        if (currentTab == 1 && refresh) {
          refresh();
        } else {
          Actions.AtCourt();  
        }
      },
    },
    {
      icon: 'user', 
      title: '我',
      onPress: () => {
        if (currentTab == 2 && refresh) {
          refresh();
        } else {
          Actions.Me();  
        }
      },
    },
  ];
  return (
    <View style={styles.container}>
      {tabs.map((v, i) =>
        <TouchableOpacity key={i} onPress={v.onPress} style={styles.tabContainer}>
          <Icon name={v.icon} style={[styles.icon, i == currentTab ? styles.selected : null]} />
          <Text style={[styles.title, i == currentTab ? styles.selected : null]}>{v.title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: TAB_BAR_HEIGHT, 
    flexDirection: 'row', 
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLOR.backgroundDarker,
  },
  tabContainer: {
    width: 50, 
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    color: COLOR.textEmpha,
  },
  icon: {
    fontSize: 24,
    color: COLOR.textEmpha,
  },
  selected: {
    color: COLOR.theme,
  }
});
