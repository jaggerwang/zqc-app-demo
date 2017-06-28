/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {COLOR} from '../../config'
import {HOT_CITIES, SPORTS} from '../../const'
import * as components from '../'
import * as actions from '../../actions'

class SelectCityAndSport extends Component {
  constructor (props) {
    super(props)

    this.screenId = props.screenId || 'SelectCityAndSport'
  }

  render () {
    let {cbDone, location, account, updateAccountSettings} = this.props
    return (
      <TouchableOpacity onPress={() => cbDone()} style={styles.container}>
        <View style={styles.content}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flex: 2,
                marginRight: 5,
                borderRightWidth: 1,
                borderColor: COLOR.lineNormal
              }}
            >
              <components.Text style={styles.title}>定位城市</components.Text>
              <View style={{alignItems: 'flex-start'}}>
                {location.city ? <components.Tag
                  text={location.city.name}
                  selected={location.city.code === account.settings.city.code}
                  onPress={() => {
                    cbDone()
                    updateAccountSettings({city: location.city})
                  }}
                /> : <components.Tag text='未知' />
                }
              </View>
              <components.Text style={styles.title}>热门城市</components.Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                  height: 72
                }}
              >
                {HOT_CITIES
                  .filter(v => !(location.city && v.code === location.city.code))
                  .map(v => <components.Tag
                    key={v.code}
                    text={v.name}
                    selected={v.code === account.settings.city.code}
                    onPress={() => {
                      cbDone()
                      updateAccountSettings({city: v})
                    }}
                  />)
                }
              </View>
            </View>
            <View style={{flex: 1}}>
              <components.Text style={styles.title}>运动项目</components.Text>
              <View style={{alignItems: 'flex-start'}}>
                {SPORTS.map(v =>
                  <components.Tag
                    key={v.code}
                    text={v.name}
                    selected={v.code === account.settings.sport.code}
                    disabled={v.disabled}
                    onPress={() => {
                      cbDone()
                      updateAccountSettings({sport: v})
                    }}
                  />
                )}
              </View>
            </View>
          </View>
          <components.TextNotice containerStyle={{paddingHorizontal: 0}}>
            运动项目目前开放了“网球”，其它将陆续开放。
          </components.TextNotice>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  content: {
    margin: 10,
    padding: 10,
    backgroundColor: COLOR.backgroundDarker,
    borderRadius: 5
  },
  title: {
    marginVertical: 5
  }
})

function mapStateToProps (state) {
  let {location, account} = state
  return {
    location,
    account
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCityAndSport)
