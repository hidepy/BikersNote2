import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ons from "onsenui"
import  {Fab, Icon} from 'react-onsenui'

export default class RoundButton extends Component {

  static propTypes = {
    onButtonClick:  PropTypes.func,
    iconName:       PropTypes.string,
    customStyle:    PropTypes.object,
    isHidden:       PropTypes.bool,
  }

  render() {

    return (
      <Fab
        style={{
          backgroundColor: ons.platform.isIOS() ? '#4282cc' : null,
          position: "fixed",
          display: (this.props.isHidden ? "none": "inherit"),
          ...this.props.customStyle
        }}
        onClick={this.props.onButtonClick}
        position='bottom right'>
        <Icon icon={this.props.iconName || 'fa-plus'} />
      </Fab>
    )
  }
}
