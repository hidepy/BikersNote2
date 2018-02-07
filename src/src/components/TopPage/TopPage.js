import React, { Component } from 'react'
//import ons from "onsenui"
import  { Page, Button, Toolbar, Carousel, CarouselItem } from 'react-onsenui'

import BikersList from "../Commons/BikersList"
import RoundButton from "../Commons/RoundButton"
import HeaderPage from "../../containers/HeaderPage"
import DetailPage from "../../containers/DetailPage"
import constants from "../../utils/constants"
import CommonFunc from "../../utils/CommonFunc"


export default class TopPage extends Component {

  constructor(props){
    super(props)

    this.state = {
      index: 0,
      items: ["#ccc", "#ddd", "#fff"],
      testImgSrc: "",
    }

    this.onPictureSelectClick = this.onPictureSelectClick.bind(this)
    this.onCarouselChange = this.onCarouselChange.bind(this)
    this.onBikersListItemClick = this.onBikersListItemClick.bind(this)
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this)
    this.onPlusButtonClick = this.onPlusButtonClick.bind(this)
  }

  componentWillMount(){
    // 記事の検索(検索条件を与えること)
    this.props.searchNewArticles({})
  }

  onPictureSelectClick(){
    CommonFunc.getPicture()
      .then(blob=> (this.state.testImgSrc = "data:image/jpeg;base64," + blob))
    /*
    try{
      navigator.camera.getPicture(
        (base64img)=> {
          alert("get picture ok")

          this.state.testImgSrc = "data:image/jpeg;base64," + base64img;
        },
        function(err){
            console.log("error");
        },
        {
            quality: 50,
            destinationType: 0,//Camera.DestinationType.DATA_URL,
            //destinationType: window.Camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
        }
      )
    }
    catch(e){
      alert("error...")
      console.log(e)
    }
    */
  }

  onCarouselChange(e){
    this.setState({index: e.activeIndex})
  }

  onBikersListItemClick(event, i){

    const item = this.props.TopPage.newArticles[i]

    // 詳細画面へ遷移する. paramsには選択された情報を渡す
    this.props.navigator.pushPage({
      component: DetailPage,
      title: '詳細',
      params: {
        selectedItem: item,
        listType: constants.PAGE_TYPE.BIKERS_LIST,
      }
    })
  }

  onSearchButtonClick(){
    this.props.navigator.pushPage({
      component: HeaderPage,
      title: '記事一覧',
      params: {
        listType: constants.PAGE_TYPE.BIKERS_LIST,
      }
    })
  }

  onPlusButtonClick(){
    this.props.navigator.pushPage({
      component: DetailPage,
      title: '追加',
      params: {
        listType: constants.PAGE_TYPE.BIKERS_LIST,
        isUpdateScreen: true
      }
    })
  }

  render() {

    const dispDefNewItems = {left: "type", center: "title", right: "timestamp"}

    return (
      <Page>
        <Toolbar>
          <div className="left" onClick={()=> this.props.toggleMenu()}>
          <span className="toolbar-button">
            <i className="ion-navicon"></i>
          </span>
          </div>
          <div className="center">BikersNote</div>
          <div className="right" onClick={this.onSearchButtonClick}>
            <button className="toolbar-button">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </Toolbar>

        <section>
          <Carousel onPostChange={this.onCarouselChange} index={this.state.index} swipeable autoScroll overscrollable>
          {
            this.state.items.map((item, index) => (
              <CarouselItem key={index} style={{backgroundColor: item}}>
                <div style={{marginTop: '50%', textAlign: 'center'}}>
                  Swipe me!
                </div>
                </CarouselItem>
            ))
          }
          </Carousel>
        </section>

        <section>
          <Button onClick={this.onPictureSelectClick}>Tap me!!</Button>
          <img src={this.state.testImgSrc} />
        </section>

        <section>
          <h3>New Articles</h3>

          <span className="">
            <RoundButton onButtonClick={this.onPlusButtonClick} />
          </span>

          <BikersList
            items={this.props.TopPage.newArticles}
            dispDef={dispDefNewItems}
            onItemClick={this.onBikersListItemClick}
          />
        </section>

      </Page>
    );
  }
}
