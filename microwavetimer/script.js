function calc() {
  let origWValue = document.getElementById("origW").value
  let origMinValue = document.getElementById("origMin").value
  let origSecValue = document.getElementById("origSec").value
  let targetWValue = document.getElementById("targetW").value

  let result = origWValue * (parseFloat(origMinValue) + origSecValue / 60.0) / targetWValue
  var min = Math.floor(result)
  var sec = Math.round(60 * (result - min))
  sec = Math.round(sec / 10) * 10

  if (sec == 60) {
    min++
    sec = 0
  }

  document.getElementById("result").textContent = targetWValue + "Wで" + min + "分" + sec + "秒です！"
}