/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {COLOR, DEFAULT_NAV_BAR_STYLE} from '../../config';
import {VIDEO_RATES} from '../../const';
import * as components from '../';
import * as helpers from '../../helpers';
import * as actions from '../../actions';

class SelectRate extends Component {
  static navigatorStyle = DEFAULT_NAV_BAR_STYLE;

  constructor(props) {
    super(props);
    
    this.screenId = props.screenId || 'SelectRate';
  }

  render() {
    let {navigator, selected, onSelect} = this.props;

    return (
      <components.Layout screenId={this.screenId}>
        <components.Block containerStyle={{marginTop: 10}}>
          {VIDEO_RATES.map((v, i) => 
            <components.BlockItem
              key={v.value}
              leftText={v.label}
              rightIcon={v.value == selected ? 'check' : ''}
              rightIconStyle={{color: COLOR.theme}}
              containerStyle={{borderTopWidth: (i == 0 ? 0 : 1)}}
              onPress={() => {onSelect(v.value); navigator.pop();}}
            />
          )}
        </components.Block>
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

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectRate);
