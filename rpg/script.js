// パスワードを作成する処理
function createPassword(length, characters) {
	var tmpDuplicates = "";
	var i;

	// 文字種の重複を削除
	for (i = 0; i < characters.length; i++) {
		if(!tmpDuplicates.includes(characters.charAt(i))) {
			tmpDuplicates += characters.charAt(i);
		}
	}
	characters = tmpDuplicates;

	// 重複削除の結果、1種類しか残らない場合やパスワードの長さが1未満の場合は終了
	if (characters.length < 2 || length < 1) {
		return "";
	}

	// 文字が連続しないようにしながらパスワードを生成
	var password = "";
	i = 0;
	while (i < length) {
		let random = Math.floor(Math.random() * characters.length);
		if (password.slice(-1) != characters.charAt(random)) {
			password += characters.charAt(random);
			i++;
		}
	}
	return password;
}

// 設定を初期化する処理
function resetSettings() {
	document.getElementById("length").value = 16;
	document.getElementById("lengthRange").value = 16;
	document.getElementById("password").value = "";
	document.getElementById("password").placeholder = "ここにパスワードが表示されます";
	document.getElementById("useNumber").checked = true;
	document.getElementById("useLower").checked = true;
	document.getElementById("useUpper").checked = true;
	document.getElementById("useSymbol").checked = false;
	document.getElementById("includedNumber").value = "0123456789";
	document.getElementById("includedLower").value = "abcdefghijklmnopqrstuvwxyz";
	document.getElementById("includedUpper").value = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	document.getElementById("includedSymbol").value = "!\"#$%&'()-=^~\\|@`[{;+:*]},<.>/?_";
	document.getElementById("includedNumber").disabled = false;
	document.getElementById("includedLower").disabled = false;
	document.getElementById("includedUpper").disabled = false;
	document.getElementById("includedSymbol").disabled = true;
	document.getElementById("alertSuccess").textContent = "";
	document.getElementById("alertSuccess").hidden = true;
	document.getElementById("alertDanger").textContent = "";
	document.getElementById("alertDanger").hidden = true;

	if(window.matchMedia('(prefers-color-scheme: light)').matches) {
		document.getElementsByTagName("body")[0].setAttribute("data-bs-theme", "light");
	} else {
		document.getElementsByTagName("body")[0].setAttribute("data-bs-theme", "dark");
	}
}

// 成功時メッセージを表示
function showSuccessMessage(message) {
	var successElement = document.getElementById("alertSuccess");
	var dangerElement = document.getElementById("alertDanger");
	successElement.textContent = message;
	dangerElement.textContent = "";
	successElement.hidden = false;
	dangerElement.hidden = true;
}

// 失敗時メッセージを表示
function showErrorMessage(message) {
	var successElement = document.getElementById("alertSuccess");
	var dangerElement = document.getElementById("alertDanger");
	successElement.textContent = "";
	dangerElement.textContent = message;
	successElement.hidden = true;
	dangerElement.hidden = false;
}

// ヘッダクリック時の処理
function onHeaderClicked() {
	var bodyElement = document.getElementsByTagName("body")[0];
	if(bodyElement.getAttribute("data-bs-theme") == "light") {
		bodyElement.setAttribute("data-bs-theme", "dark");
	}else{
		bodyElement.setAttribute("data-bs-theme", "light");
	}
}

// 文字数が直接入力された時の処理
function onLengthChanged() {
	var lengthElement = document.getElementById("length");
	var lengthRangeElement = document.getElementById("lengthRange");
	lengthRangeElement.value = lengthElement.value;
}

// 文字数レンジが操作された時の処理
function onLengthRangeChanged() {
	var lengthElement = document.getElementById("length");
	var lengthRangeElement = document.getElementById("lengthRange");
	lengthElement.value = lengthRangeElement.value;
}

// チェックボックスがクリックされた時の処理
function onCheckBoxChanged(elementId, isChecked) {
	document.getElementById(elementId).disabled = !isChecked
}

// 作成ボタンが押された時の処理
function onGenerateButtonPressed() {
	var length = document.getElementById("length").value;
	if (length >= 100000 && !confirm("処理に時間がかかりますがよろしいですか？")) {
		return;
	}

	// 入力フォームの内容を取得し、createPasswordを呼ぶ
	var characters = "";
	var passwordElement = document.getElementById("password");
	characters += document.getElementById("useNumber").checked ? document.getElementById("includedNumber").value : "";
	characters += document.getElementById("useLower").checked ? document.getElementById("includedLower").value : "";
	characters += document.getElementById("useUpper").checked ? document.getElementById("includedUpper").value : "";
	characters += document.getElementById("useSymbol").checked ? document.getElementById("includedSymbol").value : "";
	passwordElement.value = createPassword(length, characters);

	if(passwordElement.value != ""){
		showSuccessMessage("作成に成功しました！");
	}else{
		showErrorMessage("設定に誤りがあります！");
	}
}

// 初期化ボタンが押された時の処理
function onResetButtonPressed() {
	if (confirm("設定を初期化しますがよろしいですか？")) {
		resetSettings();
	}
}

// コピーボタンが押された時の処理
function onCopyButtonPressed() {
	let passwordElement = document.getElementById("password");
	if (passwordElement.value == "") {
		showErrorMessage("パスワードが作成されていません！");
		return;
	}

	navigator.clipboard.writeText(passwordElement.value).then(
		() => {
			showSuccessMessage("コピーに成功しました！");
		},
		() => {
			showErrorMessage("コピーに失敗しました！");
		}
	);
}

// 初回読み込み時に、一度初期化
resetSettings();
