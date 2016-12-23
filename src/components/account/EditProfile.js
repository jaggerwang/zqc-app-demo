/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR, DEFAULT_NAV_BAR_STYLE} from '../../config';
import * as components from '../';

export default class EditProfile extends Component {
  static navigatorStyle = DEFAULT_NAV_BAR_STYLE;

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'EditProfile';
  }

  render() {
    let {navigator, loading, processing, error, ...otherProps} = this.props;
    return (
      <components.Layout
        loading={loading}
        processing={processing}
        errorFlash={error.flash}
        errorInput={error.input[this.screenId]}
      >
        <ScrollView>
          <components.TextNotice>完善的资料有助于结交到更多球友。</components.TextNotice>
          <components.Profile
            navigator={navigator}
            {...otherProps}
          />
        </ScrollView>
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({});
