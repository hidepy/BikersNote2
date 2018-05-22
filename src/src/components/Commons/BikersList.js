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

    function convDispVal(row, propName){

      if(!propName) return null

      if((typeof propName === "object") || (typeof propName === "function")){
        return React.createElement(propName, {row: row})
      }

      const splitted = propName.split(":")

      // 表示種別指定ありの場合
      //   ⇒ xxx:IMG など : で区切られた場合の後ろのパラメータ
      if(splitted.length >= 2){
        const tagType = splitted[1]
        const propName_s = splitted[0]

        switch(tagType){
          case "IMG":{
            return (
              <div>
                <img src={row[propName_s]} style={{height: "44px", maxWidth: "44px"}}/>
              </div>
            )
          }

          default: {
            return row[propName_s]
          }
        }

      }

      return row[propName]
    }

    return (
      <List
        dataSource={this.props.items || []}
        className={(!this.props.items || (this.props.items.length === 0) ? "empty-list " : "") + (this.props.clsName || "")}
        renderRow={(row, i)=> (
          <ListItem key={i} onClick={(event)=> {this.props.onItemClick(event, i)}}>
            <div className='left'>
              {convDispVal(row, this.props.dispDef["left"])}
            </div>
            <div className='center'>
              {convDispVal(row, this.props.dispDef["center"])}
            </div>
            <div className='right'>
              {convDispVal(row, this.props.dispDef["right"])}
            </div>
            <div className="footer">
              <span className="footer-timestamp">{row["update_timestamp"]}</span>
            </div>
          </ListItem>
        )}
      />
    )
  }
}
