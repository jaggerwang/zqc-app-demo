/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, Image, ListView, ScrollView, RefreshControl, 
  TouchableOpacity, InteractionManager} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../config';
import logger from '../../logger';
import * as components from '../';
import * as helpers from '../helpers';

export default class Post extends Component {
  render() {
    let {location} = this.props;
    let {post, containerStyle} = this.props;

    return (
      <components.Block containerStyle={containerStyle}>
        <View style={{flexDirection: 'row', paddingBottom: 2.5}}>
          <components.Image 
            source={helpers.userAvatarSource(post.creator)} 
            style={styles.userAvatar}
            containerStyle={{marginRight: 5}}
          />
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 25}}>
              <components.TextWithIcon 
                iconName={post.creator.gender == 'm' ? 'mars' : 'venus'} 
                text={post.creator.nickname}
                styleKind='emphaBig'
                containerStyle={{paddingVertical: 5}}
              />
              <components.TextWithIcon 
                iconName='map-marker' 
                text={post.court.name} 
                styleKind='empha' 
                containerStyle={{paddingVertical: 5}}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 25}}>
              <View style={{flexDirection: 'row'}}>
                <components.TextWithIcon 
                  iconName='thumbs-o-up' 
                  text={helpers.numberText(post.stat.liked)}
                  containerStyle={{marginRight: 5}}
                />
                <components.TextWithIcon 
                  iconName='comment-o' 
                  text={helpers.numberText(post.stat.commented)}
                />
              </View>
              <components.Text>{helpers.distanceText(location, post.location)} · {helpers.dateText(post.createTime)}</components.Text>
            </View>
          </View>
        </View>

        {
          post.text ? 
          <components.Text style={styles.postText}>{post.text}</components.Text> : 
          null
        }

        <View style={styles.postImages}>
          {post.imageFiles.slice(0, 3).map((value, index, array) => 
            <components.Image
              key={value.id}
              source={helpers.imageSource(value.url, (array.length == 1 ? 'large' : 'middle'))}
              style={array.length == 1 ? styles.largeImage : (array.length == 2 ? styles.middleImage : styles.smallImage)}
            />
          )}
        </View>
        {post.imageFiles.length > 3 ?
        <View style={[styles.postImages, (post.imageFiles.length < 6 ? {justifyContent: 'flex-start'} : null)]}>
          {post.imageFiles.slice(3, 6).map((value, index, array) => 
            <components.Image
              key={value.id}
              source={helpers.imageSource(value.url, 'middle')}
              style={[styles.smallImage, (post.imageFiles.length < 6 ? {marginRight: 5} : null)]}
            />
          )}
        </View> :
        null}
      </components.Block>
    );
  }
}

let smallImageSize = Math.floor((SCREEN_WIDTH - 30) / 3);
let middleImageSize = Math.floor((SCREEN_WIDTH - 25) / 2);
let largeImageSize = (SCREEN_WIDTH - 20);

const styles = StyleSheet.create({
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  postText:{
    marginTop: 5,
    lineHeight: 16,
  },
  postImages: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallImage: {
    width: smallImageSize,
    height: smallImageSize,
  },
  middleImage: {
    width: middleImageSize,
    height: middleImageSize,
  },
  largeImage: {
    width: largeImageSize,
    height: largeImageSize * 9 / 16,
  },
});

