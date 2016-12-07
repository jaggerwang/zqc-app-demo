/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Image, TouchableOpacity, 
  ScrollView, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import dismissKeyboard from 'dismissKeyboard';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';
import * as components from '../';
import * as helpers from '../helpers';

export default class CreatePost extends Component {
  render() {
    let {loading, processing, error} = this.props;
    return (
      <components.Layout
        loading={loading}
        processing={processing}
        errorFlash={error.flash}
      >
        <ScrollView>
          <components.TextNotice>Lite版暂不支持发表动态，请到官网 zaiqiuchang.com 下载完整版体验。</components.TextNotice>
        </ScrollView>
      </components.Layout>
    );
  }
}

let imageSize = Math.floor((SCREEN_WIDTH - 35) / 3);

const styles = StyleSheet.create({});
