/**
 * 在球场
 * zaiqiuchang.com
 */

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as components from '../components';
import * as actions from '../actions';

function mapStateToProps(state) {
  let {loading, processing, error, sceneState, location, sport, object, network} = state;
  let {account, post} = state;
  return {
    loading,
    processing,
    error,
    sceneState,
    location,
    sport,
    object,
    network,
    account,
    post,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enableLoading: actions.enableLoading,
    disableLoading: actions.disableLoading,
    errorFlash: actions.errorFlash,
    setSceneLastRefreshTime: actions.setSceneLastRefreshTime,
    setCity: actions.setCity,
    setSport: actions.setSport,
    setSceneState: actions.setSceneState,
    nearbyPosts: actions.nearbyPosts,
    postsOfCity: actions.postsOfCity,
    likePost: actions.likePost,
    unlikePost: actions.unlikePost,
    deletePost: actions.deletePost,
    likedPosts: actions.likedPosts,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(components.Nearby);
