/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ListView, ScrollView, RefreshControl, 
  TouchableOpacity, InteractionManager, Platform} from 'react-native';

import {COLOR, DEFAULT_NAV_BAR_STYLE, SCREEN_WIDTH, SCREEN_HEIGHT} from '../config';
import {POST_STATUS_DELETED} from '../const';
import logger from '../logger';
import * as utils from '../utils';
import * as components from './';
import * as helpers from './helpers';

export default class Nearby extends Component {
  static navigatorStyle = DEFAULT_NAV_BAR_STYLE;

  constructor(props) {
    super(props);

    this.screenId = props.screenId || 'Nearby';

    let {navigator} = props;
    this.setNavBarButtons(props);
    navigator.setOnNavigatorEvent(event => this.onNavigatorEvent(event));

    this.refreshing = false;

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => 
        r1.id != r2.id || 
        r1.status != r2.status || 
        r1.creator.nickname != r2.creator.nickname || 
        r1.creator.avatarName != r2.creator.avatarName || 
        r1.creator.avatarId != r2.creator.avatarId || 
        r1.stat.liked != r2.stat.liked ||
        r1.stat.commented != r2.stat.commented ||
        r1.creator.stat.liked != r2.creator.stat.liked ||
        r1.creator.stat.post != r2.creator.stat.post,
    }).cloneWithRows(this.getRows());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.account.city.code != this.props.account.city.code
      || nextProps.account.sport.code != this.props.account.sport.code) {
      this.setNavBarButtons(nextProps);

      this.refresh({props: nextProps});
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      let {network} = this.props;

      if (network.isConnected && helpers.isNeedRefresh({screenId: this.screenId, network})) {
        this.refresh();
      }
    });
  }

  setNavBarButtons(props) {
    let {navigator, account} = props;
    let {city, sport} = account;
    let buttons = [
      {
        title: city.name + ' ' + sport.name + ' >',
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
    let {submit} = this.props;
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'select_city_and_sport') {
        navigator.showModal({screen: 'zqc.CityAndSportSelector'});
      }
    }
  }

  getRows(props) {
    props = props || this.props;
    let {object} = props;
    let {account, post} = props;
    let postIds = post.byCity[account.city.code] || [];
    let rows = postIds.map(v => helpers.postFromCache(object, v))
      .filter(v => v && v.status != POST_STATUS_DELETED);
    return rows;
  }

  refresh({props, cbFinish}={}) {
    props = props || this.props;
    let {setScreenLastRefreshTime} = props;
    let {account, postsOfCity} = props;

    setScreenLastRefreshTime({screenId: this.screenId});

    let finished = 0;
    postsOfCity({
      cityCode: account.city.code, 
      cbFinish: () => finished++,
    });
    utils.waitingFor({
      condition: () => finished == 1,
      cbFinish,
    });
  }

  render() {
    let {navigator, loading, processing, error, location, network, 
      enableLoading, disableLoading, errorFlash} = this.props;
    let {account, postsOfCity} = this.props;

    let posts = this.getRows();
    this.ds = this.ds.cloneWithRows(posts);

    return (
      <components.Layout
        loading={loading}
        processing={processing}
        errorFlash={error.flash}
      >
        {posts.length > 0 ?
        <ListView
          dataSource={this.ds}
          enableEmptySections={true}
          initialListSize={5}
          pageSize={5}
          renderRow={post => 
            <components.Post
              navigator={navigator}
              errorFlash={errorFlash}
              location={location}
              account={account}
              post={post}
              containerStyle={styles.post}
            />
          }
          renderScrollComponent={props => 
            <ScrollView
              {...props}
              refreshControl={
                <RefreshControl
                  refreshing={this.refreshing}
                  onRefresh={() => {
                    disableLoading();
                    this.refreshing = true;
                    this.refresh({
                      cbFinish: () => {
                        this.refreshing = false;
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
              postsOfCity({
                cityCode: account.city.code, 
                offset: posts[posts.length - 1].createTime,
              });
            }
          }}
        /> :
        <components.TextNotice>当前城市暂时没有数据。</components.TextNotice>}
      </components.Layout>
    );
  }
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 10,
  },
});
