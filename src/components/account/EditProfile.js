/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR} from '../../config';
import * as components from '../';

export default class EditProfile extends Component {
  render() {
    let {loading, processing, error, ...otherProps} = this.props;
    return (
      <components.Layout
        loading={loading}
        processing={processing}
        errorFlash={error.flash}
        errorInput={error.input['EditProfile']}
      >
        <ScrollView>
          <components.TextNotice>完善的资料有助于结交到更多球友。</components.TextNotice>
          <components.Profile
            screenName='EditProfile'
            {...otherProps}
          />
        </ScrollView>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({});
