/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ListView, ScrollView, RefreshControl, 
  TouchableOpacity, InteractionManager, Platform} from 'react-native';

import {COLOR, VERSION} from '../../config';
import * as components from '../';
import * as helpers from '../helpers';

export default class About extends Component {
  render() {
    let {loading, processing, error} = this.props;
    return (
      <components.Layout
        loading={loading}
        processing={processing}
        errorFlash={error.flash}
      >
        <ScrollView>
          <components.Image
            source={require('zaiqiuchang/res/img/zqc-icon-middle.png')}
            style={styles.logo}
          />
          <components.Block>
            <components.BlockItem
              leftText='在球场Lite版'
              rightText={VERSION}
              containerStyle={{borderTopWidth: 0}}
            />
            {Platform.OS == 'android' ?
            <components.BlockItem
              leftText='新版更新'
              rightText='无新版'
            /> :
            null
            }
          </components.Block>
          <components.TextNotice>在球场Lite版仅限于学习使用，严禁用于商业目的。</components.TextNotice>
          <components.TextNotice>Copyright © 在球场 zaiqiuchang.com All Rights Reserved.</components.TextNotice>
        </ScrollView>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center', 
    marginVertical: 50, 
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
