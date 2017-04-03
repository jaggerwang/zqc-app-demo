/**
 * 在球场
 * zaiqiuchang.com
 */

import * as WeChat from 'react-native-wechat';

import logger from '../logger';
import * as helpers from '../helpers';
import * as actions from './';

export function shareImageToWeChatSession({url, thumbUrl, title = '', 
  description = ''}) {
  return dispatch => {
    WeChat.isWXAppInstalled()
      .then(isInstalled => {
        if (!isInstalled) {
          return Promise.reject(new Error('请先安装微信。'));
        }
        return WeChat.shareToSession({
          type: 'imageUrl',
          imageUrl: url,
          thumbImage: thumbUrl,
          title: title || '我正在球场运动，约吗？',
          description,
        });
      })
      .then(result => logger.debug(result))
      .catch(error => dispatch(actions.handleError(error)));
  };
}

export function shareImageToWeChatTimeline({url, thumbUrl, title = '', 
  description = ''}) {
  return dispatch => {
    WeChat.isWXAppInstalled()
      .then(isInstalled => {
        if (!isInstalled) {
          return Promise.reject(new Error('请先安装微信。'));
        }
        return WeChat.shareToTimeline({
          type: 'imageUrl',
          imageUrl: url,
          thumbImage: thumbUrl,
          title: title || '我正在球场运动，约吗？',
          description,
        });
      })
      .then(result => logger.debug(result))
      .catch(error => dispatch(actions.handleError(error)));
  };
}

export function shareVideoToWeChatSession({url, thumbUrl, title = '', 
  description = ''}) {
  return dispatch => {
    WeChat.isWXAppInstalled()
      .then(isInstalled => {
        if (!isInstalled) {
          return Promise.reject(new Error('请先安装微信。'));
        }
        return WeChat.shareToSession({
          type: 'video',
          videoUrl: url,
          thumbImage: thumbUrl,
          title: title || '我正在球场运动，约吗？',
          description,
        });
      })
      .then(result => logger.debug(result))
      .catch(error => dispatch(actions.handleError(error)));
  };
}

export function shareVideoToWeChatTimeline({url, thumbUrl, title = '', 
  description = ''}) {
  return dispatch => {
    WeChat.isWXAppInstalled()
      .then(isInstalled => {
        if (!isInstalled) {
          return Promise.reject(new Error('请先安装微信。'));
        }
        return WeChat.shareToTimeline({
          type: 'video',
          videoUrl: url,
          thumbImage: thumbUrl,
          title: title || '我正在球场运动，约吗？',
          description,
        });
      })
      .then(result => logger.debug(result))
      .catch(error => dispatch(actions.handleError(error)));
  };
}

export function sharePostToWeChatSession({post}) {
  return dispatch => {
    let video = post.imageFiles.find(v => v.mime.startsWith('video/'));
    let image = post.imageFiles.find(v => v.mime.startsWith('image/'));
    if (video) {
      dispatch(shareVideoToWeChatSession({
        url: helpers.fileVideoSource(video, 'hd').uri,
        thumbUrl: helpers.fileImageSource(video, 'middle').uri,
        description: post.text,
      }));
    } else if (image) {
      dispatch(shareImageToWeChatSession({
        url: helpers.fileImageSource(image, 'huge').uri,
        thumbUrl: helpers.fileImageSource(image, 'middle').uri,
        description: post.text,
      }));
    }
  };
}

export function sharePostToWeChatTimeline({post}) {
  return dispatch => {
    let video = post.imageFiles.find(v => v.mime.startsWith('video/'));
    let image = post.imageFiles.find(v => v.mime.startsWith('image/'));
    if (video) {
      dispatch(shareVideoToWeChatTimeline({
        url: helpers.fileVideoSource(video, 'hd').uri,
        thumbUrl: helpers.fileImageSource(video, 'middle').uri,
        description: post.text,
      }));
    } else if (image) {
      dispatch(shareImageToWeChatTimeline({
        url: helpers.fileImageSource(image, 'huge').uri,
        thumbUrl: helpers.fileImageSource(image, 'middle').uri,
        description: post.text,
      }));
    }
  };
}
