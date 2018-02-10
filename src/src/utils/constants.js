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
    MEMO: "ME",
  },
  // 普通にデータの持ち方間違えたー
  ARTICLE_TYPE_NAME: {
    M:  "メンテナンス",
    C:  "カスタム",
    T:  "ツーリング",
    P:  "写真",
    N:  "給油記録・燃費",
    PU: "商品購入",
    E:  "イベント",
    ME: "メモ"
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
  // 配列でindex管理しよ
  PARTS_TYPE: [
    { value: "0", name: "ヘッドライト" },
    { value: "1", name: "メーター" },
    { value: "2", name: "ウインカー" },
    { value: "3", name: "ハンドル" },
    { value: "4", name: "ブレーキマスター" },
    { value: "5", name: "ブレーキキャリパー" },
    { value: "6", name: "フォーク" },
    { value: "7", name: "フロントフェンダー" },
    { value: "8", name: "フロントタイヤ" },
    { value: "9", name: "ブレーキディスク" },
    { value: "10", name: "タンク" },
    { value: "11", name: "電装" },
    { value: "12", name: "バッテリー" },
    { value: "13", name: "シート" },
    { value: "14", name: "ステップ" },
    { value: "15", name: "エンジン" },
    { value: "16", name: "キャブレター" },
    { value: "17", name: "エアフィルター" },
    { value: "18", name: "外装(カウル)" },
    { value: "19", name: "サイドカバー" },
    { value: "20", name: "リアサスペンション" },
    { value: "21", name: "チェーン" },
    { value: "22", name: "フロントスプロケット" },
    { value: "23", name: "リアスプロケット" },
    { value: "24", name: "リアタイヤ" },
    { value: "25", name: "テールランプ" },
    { value: "26", name: "リアフェンダー" },
    { value: "27", name: "その他" },
  ],
  MESSAGES: {
    CONFIRM_DELETE: "データを削除します。よろしいですか？",
  },
}
