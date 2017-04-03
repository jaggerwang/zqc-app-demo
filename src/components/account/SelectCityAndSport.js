/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {COLOR, HIDDEN_NAV_BAR_STYLE} from '../../config';
import {HOT_CITIES, SPORTS} from '../../const';
import * as components from '../';
import * as actions from '../../actions';

class SelectCityAndSport extends Component {
  static navigatorStyle = HIDDEN_NAV_BAR_STYLE;

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'SelectCityAndSport';
  }

  render() {
    let {navigator, location, account, updateAccountSettings} = this.props;

    let children = (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View 
            style={{
              flex: 2, 
              marginRight: 5, 
              borderRightWidth: 1, 
              borderColor: COLOR.lineNormal,
            }}
          >
            <components.Text style={styles.title}>定位城市</components.Text>
            <View style={{alignItems: 'flex-start'}}>
              {location.city 
                ? <components.Tag
                  text={location.city.name} 
                  selected={location.city.code == account.settings.city.code}
                  onPress={() => {
                    if (Platform.OS == 'ios') {
                      navigator.dismissLightBox();
                    } else {
                      navigator.dismissModal();
                    }
                    updateAccountSettings({city: location.city});
                  }}
                /> 
                : <components.Tag text="未知" />
              }
            </View>
            <components.Text style={styles.title}>热门城市</components.Text>
            <View 
              style={{
                flexDirection: 'row', 
                flexWrap: 'wrap', 
                alignItems: 'flex-start',
              }}
            >
              {HOT_CITIES
                .filter(v => !(location.city && v.code == location.city.code))
                .map(v => <components.Tag
                  key={v.code}
                  text={v.name}
                  selected={v.code == account.settings.city.code}
                  onPress={() => {
                    if (Platform.OS == 'ios') {
                      navigator.dismissLightBox();
                    } else {
                      navigator.dismissModal();
                    }
                    updateAccountSettings({city: v});
                  }}
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
                  selected={v.code == account.settings.sport.code}
                  disabled={v.disabled}
                  onPress={() => {
                    if (Platform.OS == 'ios') {
                      navigator.dismissLightBox();
                    } else {
                      navigator.dismissModal();
                    }
                    updateAccountSettings({sport: v});
                  }}
                />
              )}
            </View>
          </View>
        </View>
        <components.TextNotice containerStyle={{paddingHorizontal: 0}}>
          运动项目目前开放了“网球”，其它将陆续开放。
        </components.TextNotice>
      </View>
    );

    if (Platform.OS == 'ios') {
      return children;
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {children}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: COLOR.backgroundDarker,
    borderRadius: 5,
  },
  title: {
    marginVertical: 5,
  },
});

function mapStateToProps(state) {
  let {location, account} = state;
  return {
    location,
    account,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCityAndSport);
