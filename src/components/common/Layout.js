/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View} from 'react-native';
import ActionSheet from '@exponent/react-native-action-sheet';
import {Actions} from 'react-native-router-flux';

import {COLOR, NAV_BAR_HEIGHT, TAB_BAR_HEIGHT} from '../../config';
import * as components from '../';

export default class Layout extends Component {
  static childContextTypes = {
    actionSheet: PropTypes.func,
  };

  getChildContext() {
    return {
      actionSheet: () => this.refActionSheet,
    };
  }

  componentDidMount() {
    let {hideNavBar=false, navigationBarStyle, renderTitle, renderBackButton, 
      renderRightButton} = this.props;
    navigationBarStyle = navigationBarStyle ? [styles.navBar, navigationBarStyle] : styles.navBar;
    renderBackButton = renderBackButton || components.NavBarBack;
    Actions.refresh({hideNavBar, navigationBarStyle, renderTitle, 
      renderBackButton, renderRightButton});
  }

  render() {
    let {sceneKey, loading, processing, error, children, containerStyle} = this.props;
    let {hideStatusBar=false, statusBarStyle, hideNavBar=false, hideTabBar=true, 
      currentTab, refresh} = this.props;
    let paddingTop = (hideNavBar ? 0 : NAV_BAR_HEIGHT);
    let paddingBottom = (hideTabBar ? 0 : TAB_BAR_HEIGHT);

    return (
      <ActionSheet ref={(ref) => this.refActionSheet = ref}>
        <View style={[styles.container, {paddingTop, paddingBottom}, containerStyle]}>
          <components.StatusBar hidden={hideStatusBar} barStyle={statusBarStyle} />
          {processing ? <components.Processing processing={processing} /> : null}
          {error && sceneKey ? <components.ErrorInput sceneKey={sceneKey} error={error.input} /> : null}
          {children}
          {loading ? <components.Loading loading={loading} /> : null}
          {error ? <components.ErrorFlash error={error.flash} /> : null}
          {hideTabBar ? null : <components.TabBar currentTab={currentTab} refresh={refresh} />}
        </View>
      </ActionSheet>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.backgroundNormal,
  },
  navBar: {
    backgroundColor: COLOR.theme,
    borderBottomWidth: 0,
  },
  tabBar: {
    backgroundColor: COLOR.backgroundDarker
  },
});
