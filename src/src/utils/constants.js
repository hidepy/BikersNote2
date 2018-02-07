/*
ARTICLE=
commons: type, title, date, comment, img(multi), url, place, price, tag
all:
  type, title, date, comment, img(multi), url, place, price, tag, part, time, spots, distance, litter, litter_price


MACHINE= name, img, purchace_date, maker, current_distance
*/

const STORAGE_PREFIX = "BIKERSNOTE_"

export default {
  // BikersNoteのメインとなるユーザが入力する情報の1記事の種別
  ARTICLE_TYPE: {
    MAINTAINANCE: "M",  // part(multi), time,
    CUSTOM: "C",        // part(multi), time,
    TOURING: "T",       // spots
    PICTURE: "P",       // spots
    NENPI: "N",         // nenpi, distance, litter, litter_price
    PURCHACE: "PU",     //
    EVENT: "E",         //
  },
  // HeaderPage, DetailPageで使用する. その画面が何の情報について表示しているかを示すタイプ
  PAGE_TYPE: {
    BIKERS_LIST: "B",
    MACHINE_LIST: "M",
    MASTER_LIST: "MA",
  },
  // LocalStorageにデータを保存する際のキー
  LOCAL_STORAGE_NAME: {
    BIKERS_LIST: STORAGE_PREFIX + "B",
    MACHINE_LIST: STORAGE_PREFIX + "M",
  },
  MASTER_SETTINGS: [

  ],
  MESSAGES: {
    CONFIRM_DELETE: "データを削除します。よろしいですか？",
  },
}
