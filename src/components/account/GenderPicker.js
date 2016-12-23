/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Picker, Modal, TouchableOpacity} from 'react-native';

import {COLOR, HIDDEN_NAV_BAR_STYLE} from '../../config';
import {GENDERS} from '../../const';
import * as components from '../';
import * as helpers from '../helpers';

export default class GenderPicker extends Component {
  static navigatorStyle = HIDDEN_NAV_BAR_STYLE;

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'GenderPicker';
  }

  render() {
    let {navigator, object} = this.props;
    let {account, submit} = this.props;
    let user = helpers.userFromCache(object, account.userId);
    return (
      <TouchableOpacity onPress={() => navigator.dismissModal()} style={styles.container}>
        <Picker
          selectedValue={user.gender}
          onValueChange={(value, index) => {navigator.dismissModal(); submit(value);}}
          style={styles.picker}
        >
          {GENDERS.map(({value, label}) => 
            <Picker.Item key={value} label={label} value={value} />
          )}
        </Picker>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.backgroundNormal,
    justifyContent: 'center',
  },
  title: {
    padding: 10,
    fontSize: 14,
    color: COLOR.textEmpha,
  },
  picker: {
    backgroundColor: COLOR.backgroundLighter,
  },
});
