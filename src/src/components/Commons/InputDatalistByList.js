import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class InputDatalistByList extends Component {

  static propTypes = {
    prefix:             PropTypes.string,
    defItem:            PropTypes.object,
    onInputItemChange:  PropTypes.func,
  }

  render() {

    const componentName = (this.props.prefix || "") + this.props.defItem.ref

    return (
      <div>
        <input
          id={"dlid-" + componentName}
          ref={componentName}
          name={componentName}
          onChange={(event)=> {
            if(this.props.onInputItemChange){
              this.props.onInputItemChange(this.props.defItem, event.target.value)
            }
          }}
        />
        <datalist
          id={"dlid-" + componentName}
        >
        {
          (this.props.defItem.selectList || []).map((selectionItem, i)=> {
            return (
              <option key={i} value={selectionItem.value}>{selectionItem.name}</option>
            )
          })
        }
        </datalist>
      </div>
    )
  }
}
