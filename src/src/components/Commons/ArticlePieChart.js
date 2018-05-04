import React, { Component } from 'react'
import PropTypes from 'prop-types'
import  { List, ListItem } from 'react-onsenui'
import { PieChart, Pie, Sector, Cell, Legend } from 'recharts'

export default class ArticlePieChart extends Component {

  static propTypes = {
  }

  constructor(props){
    super(props)
  }

  render() {

    const COLORS = ['#3165CE', '#DE3810', '#FF9A00', '#109618', '#9C009C', '#009AC6', '#DE4573', '#89BE3F'];

    if(!this.props.item.data){
      return (<p>データがありません</p>)
    }

console.log(this.props.item)

    return (
      <div id="article-pie-chart">

        <PieChart width={window.innerWidth} height={260}>
          <Pie
            data={this.props.item.data}
            dataKey="count"
            cx="44%"
            cy="50%"
            labelLine={false}
            label
            outerRadius={80}
            fill="#8884d8"
            startAngle={90}
            endAngle={-270}
            onClick={(item, index, proxy)=> {this.props.item.onPieClick ? this.props.item.onPieClick(item, index) : null}}
          >
            {
              (this.props.item.data || []).map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
          <Legend tick={{fontSize: 8}} />
        </PieChart>
      </div>
    )
  }
}
