/**
 * 在球场
 * zaiqiuchang.com
 */

import React, {Component} from 'react'
import Gallery from 'react-native-gallery'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as components from './'
import * as helpers from '../helpers'
import * as actions from '../actions'

class Album extends Component {
  static navigationOptions = {
    title: '相册'
  };

  constructor (props) {
    super(props)

    this.screenId = props.screenId || 'Album'
  }

  componentDidMount () {
    let {navigation, setScreenState} = this.props
    let {files, currentIndex} = navigation.state.params
    setScreenState(this.screenId, {files, currentIndex})
  }

  componentWillUnmount () {
    let {resetScreenState} = this.props
    resetScreenState(this.screenId)
  }

  render () {
    let {screen} = this.props
    let {files} = screen[this.screenId]

    return (
      <components.Layout
        screenId={this.screenId}
        containerStyle={{backgroundColor: 'black'}}
      >
        <components.ActionSheet ref={ref => { this.actionSheet = ref }} />
        <Gallery
          images={files.map(v => helpers.fileImageSource(v, 'huge').uri)}
          pageMargin={5}
        />
      </components.Layout>
    )
  }
}

function mapStateToProps (state) {
  let {screen} = state
  return {
    screen
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Album)
