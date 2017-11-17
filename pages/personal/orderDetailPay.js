// pages/personal/orderDetailPay.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:"",//列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //去后台获取数据
    var that = this;
    var orderNo = options.orderNo;
    var orderId = options.orderId;
    that.setData({
      orderNo: orderNo,
      orderId: orderId
    });
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data;
        var sendData = {
          "tokenSession": token,
          "orderNo": orderNo
        }
        that.setData({
          tokenSession: token
        })
        util.getAjax("order/order_detail", sendData, that.orderDetailCallBack);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    wx.setNavigationBarTitle({
      title: '商品详情(已经支付)'
    })
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
  // 获取数据的回调函数
  orderDetailCallBack:function(json)
  {
    console.log(json);
    var that = this;
    if(json.ret==true)
    {
      that.setData({
        dataList:json.data
      });
    }
  }
})