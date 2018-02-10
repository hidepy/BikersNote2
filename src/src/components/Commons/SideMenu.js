import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ons from "onsenui"

import { SplitterSide, Page, List, ListItem } from 'react-onsenui'

export default class SideMenu extends Component {

  static propTypes = {

  }

  constructor(props){
    super(props)
  }

  render() {
    return (
      <SplitterSide
        style={{
            boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
        }}
        side='left'
        width={200}
        collapse={true}
        swipeable={true}
        isOpen={this.props.isOpen}
        onClose={this.props.hide}
        onOpen={this.props.show}
      >
        <Page>
          <List
            renderRow={(title) => (
              <ListItem key={title} onClick={this.hide} tappable>{title}</ListItem>
            )}
          />
        </Page>
      </SplitterSide>
    )
  }
}
