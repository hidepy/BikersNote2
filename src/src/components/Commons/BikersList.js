import React, { Component } from 'react'
import PropTypes from 'prop-types'
import  {List, ListItem} from 'react-onsenui'

export default class BikersList extends Component {

  static propTypes = {
    items:        PropTypes.array,
    dispDef:      PropTypes.object.isRequired, // {left: "myImg", center: "text", right: "text2"}
    onItemClick:  PropTypes.func,
  }

  constructor(props){
    super(props)

    console.log(this.props)
  }

  render() {

    if(!this.props.dispDef) return null

    const positions = ["left", "center", "right"]

    let styles={
      left: {},
      center: {},
      right: {},
    }

    // left, center, rightそれぞれ定義されていないものは非表示とする
    positions.forEach(s=> {
      if(!this.props.dispDef[s]){
        styles[s]["display"] = "none"
      }
    })

    return (
      <List
        dataSource={this.props.items || []}
        className={!this.props.items || (this.props.items.length === 0) ? "empty-list" : ""}
        renderRow={(row, i)=> (
          <ListItem key={i} onClick={(event)=> {this.props.onItemClick(event, i)}}>
            <div className='left'>
              {row[this.props.dispDef["left"]]}
            </div>
            <div className='center'>
              {row[this.props.dispDef["center"]]}
            </div>
            <div className='right'>
              {row[this.props.dispDef["right"]]}
            </div>
          </ListItem>
        )}
      />
    )
  }
}
