/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ListView, ScrollView, RefreshControl, 
  TouchableOpacity, InteractionManager, Platform, Alert, Linking} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import compareVersions from 'compare-versions';

import {COLOR, DEFAULT_NAV_BAR_STYLE, SCREEN_WIDTH, SCREEN_HEIGHT, VERSION, 
    API_BASE_URL} from '../config';
import {POST_STATUS_NORMAL} from '../const';
import logger from '../logger';
import * as utils from '../utils';
import * as components from './';
import * as helpers from '../helpers';
import * as actions from '../actions';

class Nearby extends Component {
  static navigatorStyle = DEFAULT_NAV_BAR_STYLE;

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'Nearby';

    let {navigator} = props;
    this.setNavBarButtons(props);
    navigator.setOnNavigatorEvent(event => this.onNavigatorEvent(event));

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => 
        r1.id != r2.id || 
        r1.updateTime != r2.updateTime || 
        r1.imageFiles.map(v => v.id).join() != r2.imageFiles.map(v => v.id).join() || 
        r1.imageFiles.map(v => v.updateTime).join() != r2.imageFiles.map(v => v.updateTime).join() || 
        r1.court.id != r2.court.id || 
        r1.court.updateTime != r2.court.updateTime || 
        r1.creator.id != r2.creator.id || 
        r1.creator.updateTime != r2.creator.updateTime || 
        r1.stat.id != r2.stat.id || 
        r1.stat.updateTime != r2.stat.updateTime
    }).cloneWithRows(this.getRows());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.account.settings.city.code != this.props.account.settings.city.code
      || nextProps.account.settings.sport.code != this.props.account.settings.sport.code) {
      this.setNavBarButtons(nextProps);

      this.refresh({props: nextProps});
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      let {network, location, errorFlash, likedPosts, favoredFiles} = this.props;

      if (!location.position) {
        errorFlash('获取位置失败，请允许在球场使用定位服务。');
      }
      
      if (network.isConnected) {
        this.refresh();

        this.updateAccountLocation();
      }
    });
  }

  setNavBarButtons(props) {
    let {navigator, account} = props;
    let buttons = [
      {
        title: account.settings.city.name.substring(0, 2) + ' ' + account.settings.sport.name + ' >',
        id: 'select_city_and_sport',
      },
    ];
    navigator.setButtons(Platform.select({
      ios: {
        leftButtons: buttons,
      },
      android: {
        rightButtons: buttons,
      },
    }));
  }

  onNavigatorEvent(event) {
    let {navigator} = this.props;
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'select_city_and_sport') {
        if (Platform.OS == 'ios') {
          navigator.showLightBox({
            screen: 'zqc.SelectCityAndSport',
            style: {
              backgroundBlur: 'light',
            },
          });
        } else {
          navigator.showModal({
            screen: 'zqc.SelectCityAndSport',
          });
        }
        
      }
    }
  }

  getRows(props) {
    props = props || this.props;
    let {object} = props;
    let {location, account, post} = props;
    let postIds;
    if (location.city && account.settings.city.code == location.city.code) {
      postIds = post.nearby;
    } else {
      postIds = post.byCity[account.settings.city.code] || [];
    }
    let rows = postIds.map(v => helpers.postFromCache(object, v))
      .filter(v => v && v.status == POST_STATUS_NORMAL);

    return rows;
  }

  updateAccountLocation() {
    let {location, updateAccount} = this.props;
    if (location.position) {
      updateAccount({update: {location: location.position.coords}});
    }
  }

  refresh({props, cbFinish}={}) {
    props = props || this.props;
    let {location} = props;
    let {account, nearbyPosts, postsOfCity} = props;

    let finished = 0;
    if (location.city && account.settings.city.code == location.city.code) {
      nearbyPosts({cbFinish: () => finished++});
    } else {
      postsOfCity({
        cityCode: account.settings.city.code, 
        cbFinish: () => finished++,
      });
    }
    utils.waitingFor({
      condition: () => finished == 1,
      cbFinish,
    });
  }

  render() {
    let {navigator, location, network, screen, account, enableLoading, disableLoading, 
      setScreenState, nearbyPosts, postsOfCity} = this.props;
    let {refreshing} = screen[this.screenId];
    
    let posts = this.getRows();
    this.ds = this.ds.cloneWithRows(posts);

    return (
      <components.Layout screenId={this.screenId}>
        {posts.length > 0 ?
        <ListView
          dataSource={this.ds}
          enableEmptySections={true}
          initialListSize={5}
          pageSize={5}
          renderRow={post => 
            <components.Post
              navigator={navigator}
              screenId={this.screenId}
              post={post} 
              containerStyle={styles.post}
            />
          }
          renderScrollComponent={props => 
            <ScrollView
              {...props}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => {
                    disableLoading();
                    setScreenState(this.screenId, {refreshing: true});
                    this.refresh({
                      cbFinish: () => {
                        setScreenState(this.screenId, {refreshing: false});
                        enableLoading();
                      },
                    });
                  }}
                />
              }
            />
          }
          onEndReached={() => {
            if (network.isConnected && posts.length > 0) {
              if (location.city && account.settings.city.code == location.city.code) {
                nearbyPosts({offset: posts[posts.length - 1].createTime});
              } else {
                postsOfCity({
                  cityCode: account.settings.city.code, 
                  offset: posts[posts.length - 1].createTime,
                });
              }
            }
          }}
        /> :
        <components.TextNotice>
          {location.city && account.settings.city.code == location.city.code ? '附近暂时没有数据，可以切换到其它热门城市看看。' : '当前城市暂时没有数据。'}
        </components.TextNotice>}
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 10,
  },
});

function mapStateToProps(state) {
  let {location, network, screen, object, account, post} = state;
  return {
    location,
    network,
    screen,
    object,
    account,
    post,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Nearby);
