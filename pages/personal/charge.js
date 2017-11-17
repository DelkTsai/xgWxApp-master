// charge.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession:"",
    fee:""//充值的金额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token =res.data
        that.setData({
          tokenSession: token
        })
      }
    });
    wx.setNavigationBarTitle({
      title: '余额充值',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 充值金额输入完成
  finishCharge:function(e){
    var that = this;
    var feep = e.detail.value;
    that.setData({
      fee:feep
    })
  },
  // 微信支付接口
  charge:function()
  {
    var that = this;
    var fee = that.data.fee;
    if(fee==undefined||fee==null||fee==""||fee==0)
    {
      wx.showToast({
        title: '请填写充值金额'
      });
      return;
    }
    var sendCharge={
      "payType":4,
      "source":1,
      "tokenSession": that.data.tokenSession,
      "fee":fee
    }
    util.postAjax("pay/wechat_pay",sendCharge,that.chargeCallBack);
  },
  //点击支付之后的回调函数
  chargeCallBack:function(json){
    console.log(json);
    if(json.ret==true)
    {
      // 发起调用
      // console.log(json);
      var timeStamp = json.data.timeStamp;
      var nonceStr = json.data.nonceStr;
      var packagep = "prepay_id="+json.data.prepayId;
      // var signType = json.data;
      var paySign = json.data.htmlPay;
      wx.requestPayment({
        'timeStamp': timeStamp,
        'nonceStr': nonceStr,
        'package': packagep,
        'signType': 'MD5',
        'paySign': paySign,
        'success': function (res) {
          console.log("成功");
          wx.navigateBack({
            delta:2
          })
        },
        'fail': function (res) {
          console.log("用户取消");
          console.log(res);
        }
      });
    }
  }
})