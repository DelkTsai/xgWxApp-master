// blance.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blance:"",
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var sendBlance = {
          "tokenSession":res.data
        }
        util.getAjax("user/getBalance",sendBlance,that.blaceCallBack);
      },
      fail: function (res) { },
      complete: function (res) { },
    });
    wx.setNavigationBarTitle({
      title: '余额'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  // 获取余额的回调函数
  blaceCallBack:function(json)
  {
    // console.log(json);
    var that = this;
    that.setData({
      blance: "￥ " + json.data.balance
    });  
  },
  //转跳到充值页面
  charge:function(){
    wx.navigateTo({
      url: 'charge'
    })
  }
})