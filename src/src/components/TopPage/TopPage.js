import React, { Component } from 'react'
//import ons from "onsenui"
import  { Page, Button, Toolbar, Carousel, CarouselItem } from 'react-onsenui'

import BikersList from "../Commons/BikersList"
import RoundButton from "../Commons/RoundButton"
import HeaderPage from "../../containers/HeaderPage"
import DetailPage from "../../containers/DetailPage"
import constants from "../../utils/constants"
import CommonFunc from "../../utils/CommonFunc"

import Machine from "../../data-definition/Machine"

export default class TopPage extends Component {

  static key = "TopPage"

  constructor(props){
    super(props)

    this.state = {
      index: 0,
      testImgSrc: "",
      carouselItems: [],
    }

    this.onPictureSelectClick = this.onPictureSelectClick.bind(this)
    this.onCarouselChange = this.onCarouselChange.bind(this)
    this.onBikersListItemClick = this.onBikersListItemClick.bind(this)
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this)
    this.onPlusButtonClick = this.onPlusButtonClick.bind(this)
    this.onDetailPageSaveSuccessCallback = this.onDetailPageSaveSuccessCallback.bind(this)
    this.onEntryFirstBikeButtonClick = this.onEntryFirstBikeButtonClick.bind(this)
    this.onBikenameClick = this.onBikenameClick.bind(this)
  }

  componentWillMount(){
    // 機体の検索
    this.props.searchMachines()

    // 記事の検索(検索条件を与えること)
    this.props.searchNewArticles({})
  }

  onPictureSelectClick(){
    CommonFunc.getPicture()
      .then(blob=> {
        //this.state.testImgSrc = "data:image/jpeg;base64," + blob
        this.setState({
          testImgSrc: "data:image/jpeg;base64," + blob
        })
      })
  }

  onCarouselChange(e){
    this.setState({index: e.activeIndex})
  }

  // 詳細ページの保存成功時コールバック
  onDetailPageSaveSuccessCallback(){

    // 再検索実行
    this.props.searchNewArticles({})

    // 検索終了後にpoppage
    this.props.navigator.popPage()
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
        onSaveSuccessCallback: this.onDetailPageSaveSuccessCallback,
      }
    })
  }

  onSearchButtonClick(){
    this.props.navigator.pushPage({
      component: HeaderPage,
      title: '記事一覧',
      params: {
        listType: constants.PAGE_TYPE.BIKERS_LIST,
        withSearchCondition: true,
      }
    })
  }

  // 詳細ページの保存成功時コールバック
  onDetailPageSaveSuccessCallback(){

    // 再検索実行
    this.props.searchNewArticles()

    // 検索終了後にpoppage
    this.props.navigator.popPage()
  }

  onPlusButtonClick(){
    this.props.navigator.pushPage({
      component: DetailPage,
      title: '追加',
      params: {
        listType: constants.PAGE_TYPE.BIKERS_LIST,
        isUpdateScreen: true,
        onSaveSuccessCallback: this.onDetailPageSaveSuccessCallback,
      }
    })
  }

  onEntryFirstBikeButtonClick(){
    this.props.navigator.pushPage({
      component: DetailPage,
      title: '追加',
      params: {
        listType: constants.PAGE_TYPE.MACHINE_LIST,
        isUpdateScreen: true,
        onSaveSuccessCallback: this.onDetailPageSaveSuccessCallback,
      }
    })
  }

  onBikenameClick(i){
    const item = this.props.TopPage.machines[i]
    console.log(item)
    this.props.navigator.pushPage({
      component: DetailPage,
      title: '詳細',
      params: {
        selectedItem: item,
        listType: constants.PAGE_TYPE.MACHINE_LIST,
        onSaveSuccessCallback: this.onDetailPageSaveSuccessCallback,
      }
    })
  }

  shareClick(){
    window.plugins.socialsharing.share('メッセージ')
  }

  render() {
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

        <section id="TopPage-carousel-wrapper">
          <Carousel onPostChange={this.onCarouselChange} index={this.state.index} swipeable autoScroll overscrollable>
          {
            //([{...(new Machine({name: "_FIRST_CAROUSEL_ITEM_"}))}].concat(this.props.TopPage.machines))

            !!this.props.TopPage.machines && this.props.TopPage.machines.length > 0 ?

              this.props.TopPage.machines
                .map((item, index) => {

                  let style = {
                    backgroundColor: "#f4f4f4",
                    backgroundSize: "cover",
                    maxHeight: "100%",
                    overflow: "hidden",
                  }

                  if(item.img){
                    style["backgroundImage"] = "url(" + item.img + ")"
                  }

                  return (
                    <CarouselItem key={index} style={style}>
                      <div className="TopPage-carousel-bikename">
                        <span onClick={()=> this.onBikenameClick(index)}>{item.name}</span>
                      </div>
                      </CarouselItem>
                  )
                })

              : (
                <CarouselItem key={0} style={{maxHeight: "100%", overflow: "hidden"}}>
                  <Button id="TopPage-carousel-firstentry" onClick={this.onEntryFirstBikeButtonClick}>愛車を登録しよう！</Button>
                </CarouselItem>
              )
          }
          </Carousel>
        </section>

        <section>
        {/*
          <Button onClick={this.onPictureSelectClick}>Tap me!!</Button>
          <img src={this.state.testImgSrc} alt="" />
        */}
        </section>

        <section>
          <h3>新着</h3>

<button onClick={this.shareClick}>social sharing</button>


          <span className="">
            <RoundButton onButtonClick={this.onPlusButtonClick} />
          </span>

          <BikersList
            items={this.props.TopPage.newArticles}
            dispDef={this.props.TopPage.newArticlesDispDef}
            onItemClick={this.onBikersListItemClick}
          />
        </section>

      </Page>
    );
  }
}
