/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {COLOR, SCREEN_WIDTH} from '../../config';
import {navToAlbum, navToPlayer} from '../../navigation';
import * as components from '../';
import * as helpers from '../../helpers';
import * as actions from '../../actions';

class Post extends Component {
  showMoreOps(showActionSheetWithOptions) {
    let {post, sharePostToWeChatSession, sharePostToWeChatTimeline} = 
      this.props;
    let options = ['朋友圈', '好友', '取消'];
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: options.findIndex(v => v == '取消'),
        title: '分享到微信',
      },
      buttonIndex => {
        if (buttonIndex == options.findIndex(v => v == '朋友圈')) {
          sharePostToWeChatTimeline({post});
        } else if (buttonIndex == options.findIndex(v => v == '好友')) {
          sharePostToWeChatSession({post});
        }
      }
    );
  }

  render() {
    let {navigator, screenId, location, post, containerStyle, onPress} = 
      this.props;
    return (
      <components.Block onPress={onPress} containerStyle={containerStyle}>
        <View style={{flexDirection: 'row', paddingBottom: 2.5}}>
          <components.Image 
            source={helpers.userAvatarSource(post.creator)} 
            style={styles.userAvatar}
            containerStyle={{marginRight: 5}}
          />
          <View style={{flex: 1}}>
            <View 
              style={{
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                height: 25,
              }}
            >
              <components.TextWithIcon 
                icon={post.creator.gender == 'm' ? 'person' : 'person'} 
                text={post.creator.nickname}
                style={{fontSize: 14, color: COLOR.textEmpha}}
                containerStyle={{paddingVertical: 5}} 
              />

              <components.Text>
                {helpers.dateText(post.createTime)}
              </components.Text>
            </View>

            <View 
              style={{
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                height: 25,
              }}
            >
              <components.TextWithIcon 
                icon='location-on' 
                text={post.court.name} 
                style={{color: COLOR.textEmpha}} 
                containerStyle={{paddingVertical: 5}} 
              />

              <components.Text>
                {helpers.distanceText(location, post.court.location)}
              </components.Text>
            </View>
          </View>
        </View>

        {post.text
          ? <components.Text style={styles.postText}>
            {post.text}
          </components.Text> 
          : null}

        <View style={styles.postImages}>
          {post.imageFiles.slice(0, 3).map((file, index, array) => 
            file.mime.startsWith('image/') 
            ? <components.Image
              key={file.id}
              source={helpers.fileImageSource(file, 
                (array.length == 1 ? 'large' : 'middle'))}
              onPress={() => {
                let imageFiles = post.imageFiles.filter(
                  v => v.mime.startsWith('image/'));
                let currentIndex = imageFiles.findIndex(v => v.id == file.id);
                navToAlbum(navigator, imageFiles, {currentIndex});
              }}
              style={array.length == 1 
                ? styles.largeImage 
                : (array.length == 2 ? styles.middleImage : styles.smallImage)}
            /> 
            : <components.Image
              key={file.id}
              source={helpers.fileImageSource(file, 
                (array.length == 1 ? 'large' : 'middle'))}
              playIconVisible
              onPress={() => navToPlayer(navigator, file, 
                {prevScreen: screenId})}
              style={array.length == 1 
                ? styles.largeImage 
                : (array.length == 2 ? styles.middleImage : styles.smallImage)}
            />
          )}
        </View>
        {post.imageFiles.length > 3 
          ? <View 
            style={[styles.postImages, 
              (post.imageFiles.length < 6 
                ? {justifyContent: 'flex-start'} 
                : null)]}
          >
            {post.imageFiles.slice(3, 6).map((file, index, array) => 
              file.mime.startsWith('image/') 
              ? <components.Image
                key={file.id}
                source={helpers.fileImageSource(file, 'middle')}
                onPress={() => {
                  let imageFiles = post.imageFiles.filter(
                    v => v.mime.startsWith('image/'));
                  let currentIndex = imageFiles.findIndex(v => v.id == file.id);
                  navToAlbum(navigator, imageFiles, {currentIndex});
                }}
                style={[styles.smallImage, 
                  (post.imageFiles.length < 6 ? {marginRight: 5} : null)]}
              /> 
              : <components.Image
                key={file.id}
                source={helpers.fileImageSource(file, 'middle')}
                playIconVisible
                onPress={() => navToPlayer(navigator, file, 
                  {prevScreen: screenId})}
                style={[styles.smallImage, 
                  (post.imageFiles.length < 6 ? {marginRight: 5} : null)]}
              />
            )}
          </View> 
        : null}

        <View style={styles.opBar}>
          <View style={{flexDirection: 'row'}}>
            <components.TextWithIcon 
              icon="thumb-up" 
              text={helpers.numberText(post.stat.liked)}
              containerStyle={{marginHorizontal: 5}}
            />
            <components.TextWithIcon 
              icon="comment" 
              text={helpers.numberText(post.stat.commented)}
              containerStyle={{marginHorizontal: 5}}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <components.ActionSheet 
              onPress={showActionSheetWithOptions => 
                this.showMoreOps(showActionSheetWithOptions)}>
              <components.Icon name="share" style={styles.postOp} />
            </components.ActionSheet>
          </View>
        </View>
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
  postText: {
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
  opBar: {
    marginTop: 5,
    height: 30, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  postOp: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontSize: 16,
  },
  liked: {
    color: COLOR.theme,
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);
