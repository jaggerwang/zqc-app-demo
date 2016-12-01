/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, Platform, View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR} from '../../config';
import * as components from '../';

export default ({city, sport, onPress}) => {
  return (
    <components.NavBarLeftButton onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.city}>{city.name}</Text>
        <Text style={styles.sport}>{sport.name}</Text>
        <Icon name='angle-right' style={styles.icon} />
      </View>
    </components.NavBarLeftButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  city: {
    marginRight: 5,
    fontSize: 14,
    color: COLOR.textLightNormal
  },
  sport: {
    marginRight: 5,
    fontSize: 14,
    color: COLOR.textLightNormal
  },
  icon: {
    fontSize: 14,
    color: COLOR.textLightNormal
  },
});
