/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Image, TouchableOpacity, 
  ScrollView, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import dismissKeyboard from 'dismissKeyboard';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';
import * as components from '../';
import * as helpers from '../helpers';

export default class CreatePost extends Component {
  render() {
    let {sceneKey, loading, processing, error} = this.props;
    
    return (
      <components.Layout 
        sceneKey={sceneKey} 
        loading={loading} 
        processing={processing} 
        error={error}
        renderTitle={() => components.NavBarTitle({title: '发动态'})}
        renderBackButton={components.NavBarCancel}
      >
        <ScrollView>
          <components.TextNotice>Demo版暂不支持发表动态，请到官网 zaiqiuchang.com 下载正式版体验。</components.TextNotice>
        </ScrollView>
      </components.Layout>
    );
  }
}

let imageSize = Math.floor((SCREEN_WIDTH - 35) / 3);

const styles = StyleSheet.create({});
