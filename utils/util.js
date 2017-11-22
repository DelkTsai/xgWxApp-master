function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//网络请求get
function getAjax(url, sendData, callBackFunction) {
  wx.request({
    url: 'http://192.168.3.16/shoedog/api/' + url,
    // url: 'http://119.23.66.37/shoedog/api/' + url,
    // url:'https://www.sneakerdog.cn/api/'+url,
    header: {
      'Content-Type': 'application/json'
    },
    method: "get",
    data: sendData,
    success: function (json) {
      // if (json.data.ret == true) {
        callBackFunction(json.data);
      // }
      // else {
        // console.log(json.data.forUser);
      // }
    },
    fail: function () {
      console.log("fail");
    }

  })
}
//网络请求post
function postAjax(url, sendData, callBackFunction) {
  wx.request({
    url: 'http://192.168.3.16/shoedog/api/' + url,
    // url: 'http://119.23.66.37/shoedog/api/' + url,
    // url: 'https://www.sneakerdog.cn/api/' + url,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "post",
    data: sendData,
    success: function (json) {
      // if (json.data.ret == true) {
        callBackFunction(json.data)
      // }
      // else {
      //   console.log(json.data.forUser);
      // }
    },
    fail:function(){
      console.log("fail");
    }
  })
}
module.exports = {
  formatTime: formatTime,
  getAjax:getAjax,
  postAjax:postAjax
}
