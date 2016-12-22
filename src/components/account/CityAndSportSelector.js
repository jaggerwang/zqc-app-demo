/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity} from 'react-native';

import {COLOR} from '../../config';
import {HOT_CITIES, SPORTS} from '../../const';
import * as components from '../';

export default ({visible, location, city, sport, setVisible, onShow, setCity, setSport}) => {
  return (
    <Modal
      animationType='fade'
      visible={visible}
      transparent={true}
      onShow={onShow}
      onRequestClose={() => null}
    >
      <TouchableOpacity onPress={() => setVisible(false)} style={styles.modal}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2, marginRight: 5, borderRightWidth: 1, borderColor: COLOR.lineNormal}}>
              <components.Text style={styles.title}>定位城市</components.Text>
              <View style={{alignItems: 'flex-start'}}>
                {location.city ?
                  <components.Tag 
                    text={location.city.name} 
                    selected={location.city.code == city.code}
                    onPress={() => setCity(location.city)}
                  /> :
                  <components.Tag text='未知' />
                }
              </View>
              <components.Text style={styles.title}>热门城市</components.Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
                {HOT_CITIES.filter(v => !(location.city && v.code == location.city.code)).map(v => 
                  <components.Tag
                    key={v.code}
                    text={v.name}
                    selected={v.code == city.code}
                    onPress={() => setCity(v)}
                  />
                )}
              </View>
            </View>
            <View style={{flex: 1}}>
              <components.Text style={styles.title}>运动项目</components.Text>
              <View style={{alignItems: 'flex-start'}}>
                {SPORTS.map(v => 
                  <components.Tag
                    key={v.code}
                    text={v.name}
                    selected={v.code == sport.code}
                    disabled={v.disabled}
                    onPress={() => setSport(v)}
                  />
                )}
              </View>
            </View>
          </View>
          <components.TextNotice style={{paddingHorizontal: 0}}>
            运动项目目前开放了“网球”，其它将陆续开放。
          </components.TextNotice>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: 10, 
    padding: 10,
    backgroundColor: COLOR.backgroundNormal,
    borderRadius: 5,
  },
  title: {
    marginVertical: 5,
  },
});
