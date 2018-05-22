import React, { Component } from 'react'
import PropTypes from 'prop-types'
import  {List, ListItem} from 'react-onsenui'

export default class BikersHeaderItem extends Component {

  static propTypes = {

  }

  constructor(props){
    super(props)
  }

  render() {

    const v = this.props.row

    return (
      <div className="BikersHeaderItem-wrapper">
        <div>
          <span style={{width: "128px"}}>{v.type_name}</span>
          　-　
          <span>{v.target}</span>
        </div>
        <div>
          <span
            style={{fontSize: "20px", fontWeight: "600", paddingTop: "12px", paddingBottom: "8px", display: "inline-block"}}>
            {v.title}
          </span>
        </div>
      </div>
    )
  }
}
