import React, { Component } from 'react'
import PropTypes from 'prop-types'
import  {List, ListItem} from 'react-onsenui'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

export default class NenpiChart extends Component {

  static propTypes = {
  }

  constructor(props){
    super(props)
  }

  render() {

    const sum_nenpi =
      (this.props.item || [])
        .reduce((p, c)=> p + c.nenpi, 0)

    const avg_nenpi = sum_nenpi / (this.props.item || [0]).length

    return (
      <div id="Nenpi-Chart">
        <p style={{fontSize: 12}}>平均燃費：<span style={{fontWeight: 600, fontSize: 20}}>{avg_nenpi}</span></p>

        <LineChart width={window.innerWidth * 0.95} height={200} data={this.props.item}
              margin={{top: 5, left: 0, bottom: 5}}>
         <XAxis dataKey="date" tick={{fontSize: 10}} />
         <YAxis tick={{fontSize: 12}} />
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Line type="monotone" dataKey="nenpi" stroke="#82ca9d" />
        </LineChart>
      </div>
    )
  }
}
