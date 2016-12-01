/**
 * 在球场
 * zaiqiuchang.com
 */

import React from 'react';
import {StyleSheet, View, Text, Picker, Modal, TouchableOpacity} from 'react-native';

import {COLOR} from '../../config';
import * as components from '../';

export default ({visible, items, selectedValue, setVisible, onShow, onValueChange, submit, cancel}) => {
  if (cancel === undefined) {
    cancel = () => setVisible(false);
  }
  return (
    <Modal
      animationType='fade'
      visible={visible}
      transparent={true}
      onShow={onShow}
      onRequestClose={() => null}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <components.Text onPress={cancel} style={styles.title}>取消</components.Text>
          <components.Text onPress={submit} style={styles.title}>完成</components.Text>
        </View>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
        >
          {items.map(({value, label}) => 
            <Picker.Item key={value} label={label === undefined ? value : label} value={value} />
          )}
        </Picker>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLOR.backgroundDarker,
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
