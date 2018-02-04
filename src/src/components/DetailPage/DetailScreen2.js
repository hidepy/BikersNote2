import React, { Component } from 'react'

import ons from "onsenui"
import  {Page, Button, List, ListItem, Toolbar, BackButton} from 'react-onsenui'

export default class DetailScreen extends Component {

  constructor(){
    super()

    this.onClick = this.onClick.bind(this)

console.log(this.props)
  }

  onClick(){
    //ons.notification.alert("Hello, World!!")

console.log(this.props.navigator)

    this.props.navigator.pushPage({
      component: DetailScreen,
      title: 'detail2'
    });
  }

  render() {

    const list = [
      {name: "hs-name1", img: "./img/icon_link.png"},
      {name: "hs-name2", img: "./img/icon_link.png"},
      {name: "hs-name3", img: "./img/icon_link.png"},
      {name: "hs-name4", img: "./img/icon_link.png"},
      {name: "hs-name5", img: "./img/icon_link.png"},
    ]

    return (
      <Page>

        <Toolbar>
          <div className="center">FooDetail</div>
          <div className="left">
            <BackButton>Back</BackButton>
          </div>
        </Toolbar>

        <h2>Header Page!!</h2>

        <Button modifier="material" onClick={this.onClick}>Tap me!!</Button>

        <List
          dataSource={list}
          renderRow={(row, i)=> (
            <ListItem key={i}>
              <div className='left'>
                <img src={row.img} className='list-item__thumbnail' />
              </div>
              <div className='center'>
                {row.name}
              </div>
            </ListItem>
          )}
        />
      </Page>
    );
  }
}
