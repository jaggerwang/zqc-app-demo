/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react'
import {StyleSheet, View, InteractionManager, ScrollView, RefreshControl,
  Alert} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {COLOR, SCREEN_WIDTH, SCREEN_HEIGHT} from '../config'
import * as components from './'
import * as helpers from '../helpers'
import * as utils from '../utils'
import * as actions from '../actions'

class AtCourt extends Component {
  static navigationOptions = {
    title: '在球场'
  };

  constructor (props) {
    super(props)

    this.screenId = props.screenId || 'AtCourt'
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      let {network} = this.props
      if (network.isConnected) {
        this.refresh()
      }
    })
  }

  refresh (cbFinish) {
    let {nearbyUsers} = this.props

    let finished = 0
    nearbyUsers({cbFinish: () => finished++})
    utils.waitingFor({
      condition: () => finished === 1,
      cbFinish
    })
  }

  render () {
    let {screen, object, account, user, disableLoading,
        enableLoading, setScreenState} = this.props
    let {refreshing} = screen[this.screenId]

    let nearbyUsers = user.nearby
      .map(v => helpers.userFromCache(object, v))
      .filter(v => v !== null && v.id !== account.id)
      .slice(0, 10)

    return (
      <components.Layout screenId={this.screenId}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                disableLoading()
                setScreenState(this.screenId, {refreshing: true})
                this.refresh(() => {
                  setScreenState(this.screenId, {refreshing: false})
                  enableLoading()
                })
              }}
            />
          }
          contentContainerStyle={{alignItems: 'center', padding: 10}}
        >
          <components.Icon
            name='add-box'
            onPress={() => Alert.alert(
              '发动态失败',
              'Lite版暂不支持该功能，请到官网(zaiqiuchang.com)下载完整版体验。',
              [
                {text: '确认'}
              ]
            )}
            style={styles.postIcon}
          />

          <components.TextNotice
            containerStyle={styles.postTextContainer}
            style={styles.postText}
          >
            正在球场上挥洒汗水？上传运动照片或视频，让附近的球友发现你。
          </components.TextNotice>

          <components.TextNotice
            containerStyle={styles.nearbyUserTextContainer}
            style={styles.nearbyUserText}
          >
            {nearbyUsers.length > 0 ? 'Ta们也在球场，赶紧去认识一下。' : '附近暂无球友。'}
          </components.TextNotice>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start'
            }}
          >
            {nearbyUsers.map(user =>
              <components.Image
                key={user.id}
                source={helpers.userAvatarSource(user)}
                style={styles.userAvatar}
                containerStyle={{margin: 5}}
              />
            )}
          </View>
        </ScrollView>
      </components.Layout>
    )
  }
}

let avatarSize = Math.floor((SCREEN_WIDTH - 70) / 5)

const styles = StyleSheet.create({
  postIcon: {
    marginVertical: Math.floor((SCREEN_HEIGHT / 2 - 200) / 2),
    fontSize: 100,
    color: COLOR.theme
  },
  userAvatar: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: 5
  },
  postTextContainer: {
    paddingHorizontal: 0,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLOR.lineNormal
  },
  postText: {
    textAlign: 'center'
  },
  nearbyUserTextContainer: {
    paddingHorizontal: 0
  },
  nearbyUserText: {
    textAlign: 'center'
  }
})

function mapStateToProps (state) {
  let {network, screen, object, account, user} = state
  return {
    network,
    screen,
    object,
    account,
    user
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AtCourt)
