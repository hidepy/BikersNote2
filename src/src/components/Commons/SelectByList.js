import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SelectByList extends Component {

  static propTypes = {
    prefix:             PropTypes.string,
    defItem:            PropTypes.object,
    onSelectItemChange: PropTypes.func,
  }

  render() {

    return (
      <select
        ref={(this.props.prefix || "") + this.props.defItem.ref}
        name={(this.props.prefix || "") + this.props.defItem.ref}
        onChange={(event)=> {
          if(this.props.onSelectItemChange){
            this.props.onSelectItemChange(this.props.defItem, event.target.value)
          }
        }}
      >
      {
        (this.props.defItem.selectList || []).map((selectionItem, i)=> {
          return (
            <option key={i} value={selectionItem.value}>{selectionItem.name}</option>
          )
        })
      }
      </select>
    )
  }
}
