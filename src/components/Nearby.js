/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react'
import {StyleSheet, ListView, ScrollView, RefreshControl, InteractionManager,
  Modal, Platform} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {POST_STATUS_NORMAL} from '../const'
import * as utils from '../utils'
import * as components from './'
import * as helpers from '../helpers'
import * as actions from '../actions'

class Nearby extends Component {
  static navigationOptions = ({navigation}) => {
    let {cityAndSport, onPressCityAndSport} = navigation.state.params || {}
    let button = cityAndSport && onPressCityAndSport
      ? <components.NavButton onPress={onPressCityAndSport}>
        {cityAndSport}</components.NavButton>
      : null
    let navigationOptions = {
      title: '附近'
    }
    if (Platform.OS === 'ios') {
      navigationOptions.headerLeft = button
    } else {
      navigationOptions.headerRight = button
    }
    return navigationOptions
  };

  constructor (props) {
    super(props)

    this.screenId = props.screenId || 'Nearby'

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) =>
        r1.id !== r2.id ||
        r1.updateTime !== r2.updateTime ||
        r1.imageFiles.map(v => v.id)
          .join() !== r2.imageFiles.map(v => v.id).join() ||
        r1.imageFiles.map(v => v.updateTime)
          .join() !== r2.imageFiles.map(v => v.updateTime).join() ||
        r1.court.id !== r2.court.id ||
        r1.court.updateTime !== r2.court.updateTime ||
        r1.creator.id !== r2.creator.id ||
        r1.creator.updateTime !== r2.creator.updateTime ||
        r1.stat.id !== r2.stat.id ||
        r1.stat.updateTime !== r2.stat.updateTime
    }).cloneWithRows(this.getRows())
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.account.settings.city.code !== this.props.account.settings.city.code ||
      nextProps.account.settings.sport.code !== this.props.account.settings.sport.code) {
      this.setNavParams(nextProps)

      this.refresh({props: nextProps})
    }
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      let {network, location, errorFlash} = this.props

      this.setNavParams()

      if (!location.position) {
        errorFlash('获取位置失败，请允许在球场使用定位服务。')
      }

      if (network.isConnected) {
        this.refresh()

        this.updateAccountLocation()
      }
    })
  }

  setNavParams (props) {
    props = props || this.props
    let {navigation, account, setScreenState} = props
    navigation.setParams({
      cityAndSport: account.settings.city.name.substring(0, 2) + ' ' +
        account.settings.sport.name + ' >',
      onPressCityAndSport: () => setScreenState(this.screenId,
        {showCityAndSport: true})
    })
  }

  getRows (props) {
    props = props || this.props
    let {object} = props
    let {location, account, post} = props
    let postIds
    if (location.city && account.settings.city.code === location.city.code) {
      postIds = post.nearby
    } else {
      postIds = post.byCity[account.settings.city.code] || []
    }
    let rows = postIds.map(v => helpers.postFromCache(object, v))
      .filter(v => v && v.status === POST_STATUS_NORMAL)

    return rows
  }

  updateAccountLocation () {
    let {location, updateAccount} = this.props
    if (location.position) {
      updateAccount({update: {location: location.position.coords}})
    }
  }

  refresh ({props, cbFinish} = {}) {
    props = props || this.props
    let {location} = props
    let {account, nearbyPosts, postsOfCity} = props

    let finished = 0
    if (location.city && account.settings.city.code === location.city.code) {
      nearbyPosts({cbFinish: () => finished++})
    } else {
      postsOfCity({
        cityCode: account.settings.city.code,
        cbFinish: () => finished++
      })
    }
    utils.waitingFor({
      condition: () => finished === 1,
      cbFinish
    })
  }

  render () {
    let {navigation, location, network, screen, account, enableLoading,
      disableLoading, setScreenState, nearbyPosts, postsOfCity} = this.props
    let {refreshing, showCityAndSport} = screen[this.screenId]

    let posts = this.getRows()
    this.ds = this.ds.cloneWithRows(posts)

    return (
      <components.Layout screenId={this.screenId}>
        {posts.length > 0 ? <ListView
          dataSource={this.ds}
          enableEmptySections
          initialListSize={5}
          pageSize={5}
          renderRow={post =>
            <components.Post
              navigation={navigation}
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
                    disableLoading()
                    setScreenState(this.screenId, {refreshing: true})
                    this.refresh({
                      cbFinish: () => {
                        setScreenState(this.screenId, {refreshing: false})
                        enableLoading()
                      }
                    })
                  }}
                />
              }
            />
          }
          onEndReached={() => {
            if (network.isConnected && posts.length > 0) {
              if (location.city &&
                account.settings.city.code === location.city.code) {
                nearbyPosts({offset: posts[posts.length - 1].createTime})
              } else {
                postsOfCity({
                  cityCode: account.settings.city.code,
                  offset: posts[posts.length - 1].createTime
                })
              }
            }
          }}
        /> : <components.TextNotice>
          {location.city &&
            account.settings.city.code === location.city.code
            ? '附近暂时没有数据，可以切换到其它热门城市看看。'
            : '当前城市暂时没有数据。'}
        </components.TextNotice>}

        <Modal
          visible={showCityAndSport}
          onRequestClose={() => setScreenState(this.screenId,
            {showCityAndSport: false})}
        >
          <components.SelectCityAndSport
            cbDone={() => setScreenState(this.screenId,
              {showCityAndSport: false})}
          />
        </Modal>
      </components.Layout>
    )
  }
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 10
  }
})

function mapStateToProps (state) {
  let {location, network, screen, object, account, post} = state
  return {
    location,
    network,
    screen,
    object,
    account,
    post
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Nearby)
