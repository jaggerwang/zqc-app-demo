/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity} from 'react-native';

import {COLOR, HIDDEN_NAV_BAR_STYLE} from '../../config';
import {HOT_CITIES, SPORTS} from '../../const';
import * as components from '../';

export default class CityAndSportSelector extends Component {
  static navigatorStyle = HIDDEN_NAV_BAR_STYLE;

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'CityAndSportSelector';
  }

  render() {
    let {navigator, location, account, setCity, setSport} = this.props;
    return (
      <TouchableOpacity onPress={() => navigator.dismissModal()} style={styles.modal}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2, marginRight: 5, borderRightWidth: 1, borderColor: COLOR.lineNormal}}>
              <components.Text style={styles.title}>定位城市</components.Text>
              <View style={{alignItems: 'flex-start'}}>
                {location.city ?
                  <components.Tag 
                    text={location.city.name} 
                    selected={location.city.code == account.city.code}
                    onPress={() => {navigator.dismissModal(); setCity(location.city);}}
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
                    selected={v.code == account.city.code}
                    onPress={() => {navigator.dismissModal(); setCity(v);}}
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
                    selected={v.code == account.sport.code}
                    disabled={v.disabled}
                    onPress={() => {navigator.dismissModal(); setSport(v);}}
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
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: COLOR.backgroundNormal,
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: 10, 
    padding: 10,
    backgroundColor: COLOR.backgroundDarker,
    borderRadius: 5,
  },
  title: {
    marginVertical: 5,
  },
});
