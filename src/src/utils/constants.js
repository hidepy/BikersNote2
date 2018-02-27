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
  MAINTAINANCE_TYPE: [

  ],
  /*
  ヘッドライトバルブ交換
  フロントウインカーバルブ交換
  スピードメーターケーブル交換
  スピードメーターケーブル注油
  タコメーターケーブル交換
  タコメーターケーブル注油
  アクセルワイヤー注油
  アクセルワイヤー交換
  クラッチワイヤー注油
  クラッチワイヤー交換
  ブレーキマスターO/H
  ブレーキフルード交換(フロント)
  ステムベアリンググリスアップ
  ステムベアリング交換
  ブレーキパッド交換(フロント)
  ブレーキキャリパーO/H
  ブレーキシュー交換(フロント)
  ブレーキディスク交換
  フロントフォークオイル交換
  フロントフォークO/H
  フロントアクスルシャフトグリスアップ
  フロントタイヤ交換
  フロントタイヤ空気圧調整
  フロントホイールベアリング交換
  オイル交換
  オイルフィルター交換
  クーラント交換
  エンジン腰上O/H
  エンジン腰下O/H
  プラグ交換
  フロントスプロケット交換
  キャブレター清掃
  キャブレターO/H
  バッテリー充電
  バッテリー液補充
  バッテリー交換
  エアフィルター清掃
  エアフィルター交換
  シートレザー張替え
  リアサスペンションO/H
  チェーン清掃
  チェーン張り調整
  チェーン交換
  リアアクスルシャフトグリスアップ
  リアスプロケット交換
  ピボットシャフトグリスアップ
  リアタイヤ交換
  リアタイヤ空気圧調整
  リアハブダンパー交換
  リアホイールベアリング交換
  リアウインカーバルブ交換
  テールランプバルブ交換




  */
  // カスタムパーツの部位
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
  BIKE_MAKER: [
    {value: "01", name: "ホンダ"},
    {value: "02", name: "ヤマハ"},
    {value: "03", name: "スズキ"},
    {value: "04", name: "カワサキ"},
    {value: "05", name: "スネークモータース"},
    {value: "06", name: "メグロ"},
    {value: "07", name: "ハーレーダビッドソン"},
    {value: "08", name: "ビューエル"},
    {value: "09", name: "クリーブランド"},
    {value: "10", name: "インディアン"},
    {value: "11", name: "ヴィクトリー"},
    {value: "12", name: "フェニックス"},
    {value: "13", name: "ボスホス"},
    {value: "14", name: "ロデオモーターサイクル"},
    {value: "15", name: "ウエストコーストチョッパーズ"},
    {value: "16", name: "ドゥカティ"},
    {value: "17", name: "ベスパ"},
    {value: "18", name: "アプリリア"},
    {value: "19", name: "ピアジオ"},
    {value: "20", name: "ジレラ"},
    {value: "21", name: "MV アグスタ"},
    {value: "22", name: "モトグッチ"},
    {value: "23", name: "アディバ"},
    {value: "24", name: "マラグーティ"},
    {value: "25", name: "イタルジェット"},
    {value: "26", name: "カジバ"},
    {value: "27", name: "BMW"},
    {value: "28", name: "トライアンフ"},
    {value: "29", name: "ノートン"},
    {value: "30", name: "メガリ"},
    {value: "31", name: "KTM"},
    {value: "32", name: "ハスクバーナ"},
    {value: "33", name: "ガスガス"},
    {value: "34", name: "デルビ"},
    {value: "35", name: "台湾 台湾"},
    {value: "36", name: "キムコ"},
    {value: "37", name: "SYM"},
    {value: "38", name: "PGO"},
    {value: "39", name: "ヒョースン"},
    {value: "40", name: "デイリン"},
    {value: "41", name: "ロイヤルエンフィールド"},
    {value: "42", name: "エルエムエル"},
    {value: "43", name: "プジョー"},
    {value: "44", name: "BRP"},
    {value: "99", name: "その他"},
  ],
  MESSAGES: {
    CONFIRM_DELETE: "データを削除します。よろしいですか？",
  },
}
