//タイトルの初期値
var title = "Calendar";

//パラメータを取得
let params = new URL(location.href).searchParams;

//今日の日付の取得
let date = new Date();
let thisYear = date.getFullYear();
let thisMonth = date.getMonth();
let today = date.getDate();

//表示する年月の初期値
var year = thisYear;
var month = thisMonth;

//カレンダーの年月を準備
function initYearMonth() {
  //パラメータによる年月の指定があれば値を更新、タイトルを更新
  let paramYear = params.get("year");
  if(!isNaN(paramYear) && paramYear >= 100 && paramYear <= 9999) {
    year = paramYear;
    title += "-" + paramYear;
  }

  let paramMonth = params.get("month");
  if(!isNaN(paramMonth) && paramMonth >= 1 && paramMonth <= 12) {
    month = paramMonth - 1;
    title += "-" + paramMonth;
  }

  //タイトルの設定
  document.title = title;
}

//パラメータによる設定変更
function initPreferences() {  
  //スタイルシートの取得
  let sheet = document.styleSheets.item(0);

  //パラメータによる文字色と枠線の指定があれば値を更新
  let paramColor = params.get("color");
  if(paramColor != null) {
    sheet.insertRule(`body {color : ${paramColor} !important;`);
    sheet.insertRule(`.today {background : ${paramColor} !important;`);
    sheet.insertRule(`.cell {border-color : ${paramColor} !important;`);
  }

  //パラメータによる背景色の指定があれば値を更新
  let paramBackground = params.get("background");
  if(paramBackground != null) {
    sheet.insertRule(`body {background : ${paramBackground} !important;`);
    sheet.insertRule(`.today {color : ${paramBackground} !important;`);
  }

  //パラメータによる枠線の色の指定があれば値を更新
  let paramBorderColor = params.get("bordercolor");
  if(paramBorderColor != null) {
    sheet.insertRule(`.cell {border-color : ${paramBorderColor} !important;`);
  }

  //パラメータによる強調の色の指定があれば値を更新
  let paramHighlightColor = params.get("highlightcolor");
  if(paramHighlightColor != null) {
    sheet.insertRule(`.today {background : ${paramHighlightColor} !important;`);
  }

  //パラメータによる横幅の指定があれば値を更新
  let paramWidth = params.get("width");
  if(paramWidth != null) {
    sheet.insertRule(`body {width : ${paramWidth} !important;`);
  }

  //パラメータによる縦幅の指定があれば値を更新
  let paramHeight = params.get("height");
  if(paramHeight != null) {
    sheet.insertRule(`body {height : ${paramHeight} !important;`);
    sheet.insertRule(".cell {height : 14% !important;");
  }

  //パラメータによる文字サイズの指定があれば値を更新
  let paramSize = params.get("size");
  if(paramSize != null) {
    sheet.insertRule(`.cell {font-size : ${paramSize} !important;`);
  }

  //パラメータによる曜日の文字サイズの指定があれば値を更新
  let paramHeaderSize = params.get("headersize");
  if(paramHeaderSize != null) {
    sheet.insertRule(`.header {font-size : ${paramHeaderSize} !important;`);
  }

  //パラメータによる枠線の太さの指定があれば値を更新
  let paramBorderWidth = params.get("borderwidth");
  if(paramBorderWidth != null) {
    sheet.insertRule(`.cell {border-width : ${paramBorderWidth} !important;`);
  }

  //パラメータによるフォントの指定があれば値を更新
  let paramFont = params.get("font");
  if(paramFont != null) {
    sheet.insertRule(`body {font-family : ${paramFont} !important;`);
  }

  //パラメータによる曜日のフォントの指定があれば値を更新
  let paramHeaderFont = params.get("headerfont");
  if(paramHeaderFont != null) {
    sheet.insertRule(`.header {font-family : ${paramHeaderFont} !important;`);
  }

  //パラメータによるフルスクリーンの指定があれば値を更新
  let paramFullscreen = params.get("fullscreen");
  if(paramFullscreen == "true") {
    sheet.insertRule("body {height : 100vh !important;");
    sheet.insertRule(".cell {height : 14% !important;");
  }
}

//曜日マスの作成
function initHeader() {
  //曜日行に表示する文字
  var headerArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  //パラメータによる言語の指定があれば値を更新
  let paramLang = params.get("lang");
  if(paramLang == "ja") {
    headerArray = ["日", "月", "火", "水", "木", "金", "土"];
  }

  for(let header of headerArray) {
    let cell = document.createElement("span");
    cell.classList.add("cell", "header");
    cell.innerHTML = header;
    document.body.appendChild(cell);
  }
}

//カレンダーを作成
function initCalendar() {
  //1日の曜日と最終日の日付を取得
  let firstDay = new Date(year, month, 1).getDay();
  let lastDate = new Date(year, month + 1, 0).getDate();

  for(let i = 1; i <= 42; i++) {
    //表示開始位置と表示内容の調整
    var dateValue = i - firstDay;
    if(dateValue < 1 || dateValue > lastDate) {
      dateValue = "&nbsp;";
    }

    //日付マスの作成
    let cell = document.createElement("span");
    cell.classList.add("cell");
    cell.innerHTML = dateValue;

    //表示するマスの値が今日のもので、nohighlightがtrueでなければtodayクラスを追加
    let paramNoHighlight = params.get("nohighlight");
    if(year == thisYear && month == thisMonth && dateValue == today && paramNoHighlight != "true") {
      cell.classList.add("today");
    }

    document.body.appendChild(cell);
  }
}

initYearMonth();
initPreferences();
initHeader();
initCalendar();