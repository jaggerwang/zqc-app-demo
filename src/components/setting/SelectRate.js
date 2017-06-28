/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {COLOR} from '../../config'
import {VIDEO_RATES} from '../../const'
import * as components from '../'
import * as actions from '../../actions'

class SelectRate extends Component {
  static navigationOptions = ({navigation}) => {
    let {title} = navigation.state.params
    return {
      title
    }
  };

  constructor (props) {
    super(props)

    this.screenId = props.screenId || 'SelectRate'
  }

  render () {
    let {navigation} = this.props
    let {selected, onSelect} = navigation.state.params

    return (
      <components.Layout screenId={this.screenId}>
        <components.Block containerStyle={{marginTop: 10}}>
          {VIDEO_RATES.map((v, i) =>
            <components.BlockItem
              key={v.value}
              leftText={v.label}
              rightIcon={v.value === selected ? 'check' : ''}
              rightIconStyle={{color: COLOR.theme}}
              containerStyle={{borderTopWidth: (i === 0 ? 0 : 1)}}
              onPress={() => { onSelect(v.value); navigation.goBack() }}
            />
          )}
        </components.Block>
      </components.Layout>
    )
  }
}

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectRate)
