/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR} from '../../config';
import * as components from '../';

export default class RegisterProfile extends Component {
  render() {
    let {sceneKey, loading, processing, error, submit, ...otherProps} = this.props;
    return (
      <components.Layout 
        sceneKey={sceneKey} 
        loading={loading} 
        processing={processing} 
        error={error}
        renderTitle={() => components.NavBarTitle({title: '完善资料'})}
      >
        <ScrollView>
          <components.TextNotice>帐号注册成功，请完善资料。</components.TextNotice>
          <components.Profile
            sceneKey={sceneKey}
            error={error}
            {...otherProps}
          />
          <components.ButtonWithBg
            text='完成'
            onPress={() => submit()}
            textStyle={{fontSize: 16}}
          />
        </ScrollView>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({});
