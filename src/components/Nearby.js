/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ListView, ScrollView, RefreshControl, 
  TouchableOpacity, InteractionManager} from 'react-native';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../config';
import logger from '../logger';
import * as utils from '../utils';
import * as components from './';
import * as helpers from './helpers';

export default class Nearby extends Component {
  componentWillMount() {
    this.refreshing = false;
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => 
        r1.id != r2.id || 
        r1.liked != r2.liked || 
        r1.creator.nickname != r2.creator.nickname || 
        r1.creator.avatarName != r2.creator.avatarName || 
        r1.creator.avatarId != r2.creator.avatarId || 
        r1.stat.liked != r2.stat.liked ||
        r1.stat.commented != r2.stat.commented ||
        r1.creator.stat.liked != r2.creator.stat.liked ||
        r1.creator.stat.post != r2.creator.stat.post,
    }).cloneWithRows(this._getRows());
  }

  _getRows(props) {
    props = props || this.props;
    let {object} = props;
    let {account, post} = props;
    let postIds = post.byCity[account.city.code] || [];
    let rows = postIds.map((v) => helpers.postFromCache(object, v))
      .filter((v) => v !== null);

    return rows;
  }

  componentWillReceiveProps(nextProps) {
    this.ds = this.ds.cloneWithRows(this._getRows(nextProps));
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      let {network} = this.props;

      if (network.isConnected && helpers.isNeedRefresh({screen: 'Nearby', network})) {
        this._refresh();
      }
    });
  }

  _refresh({props, cbFinish}={}) {
    props = props || this.props;
    let {location, setScreenLastRefreshTime} = props;
    let {account, postsOfCity} = props;

    setScreenLastRefreshTime({screen: 'Nearby'});

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
    let {loading, processing, error, location, network, sport, object, 
      enableLoading, disableLoading, errorFlash} = this.props;
    let {account, post, postsOfCity} = this.props;

    let posts = this._getRows();

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
          renderRow={(post) => 
            <components.Post
              account={account}
              post={post}
              location={location}
              errorFlash={errorFlash}
              containerStyle={styles.post}
            />
          }
          renderScrollComponent={(props) => 
            <ScrollView
              {...props}
              refreshControl={
                <RefreshControl
                  refreshing={this.refreshing}
                  onRefresh={() => {
                    disableLoading();
                    this.refreshing = true;
                    this._refresh({
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
