// myCouponList.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession: "",
    couponList: [],//优惠券列表
    hidden: "",
    orderNo: "",
    orderId: "",
    getAddressId: "",
    getAddress: "",
    contactPerson: "",
    contactMobile: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的优惠券',
    })
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data
        var sendCoupon = {
          "tokenSession": token
        }
        that.setData({
          "tokenSession": token
        })

        util.getAjax("coupon/getMyCoupons", sendCoupon, that.couponCallBack);
      },
      fail: function (res) { },
      complete: function (res) { },
    });
    // 上一个页面传递的值
    var orderNo = options.orderNo;
    var orderId = options.orderId;
    var getAddressId = options.getAddressId;
    var getAddress = options.getAddress;
    var contactPerson = options.contactPerson;
    var contactMobile = options.contactMobile;
    that.setData({
      orderNo: orderNo,
      orderId: orderId,
      getAddressId: getAddressId,
      getAddress: getAddress,
      contactPerson: contactPerson,
      contactMobile: contactMobile
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
  //获取优惠券列表回调
  couponCallBack: function (json) {
    var that = this;
    if (json.ret == true) {
      var dataList = json.data
      if (dataList.length > 0) {
        that.setData({
          hidden: "visibility:hidden;display:none;"
        });
      }
      that.setData({
        "couponList": dataList
      })
    }
  },
  //选择优惠券回调
  goToDetail: function (event) {
    console.log(event);
    var that = this;
    var couponId = event.currentTarget.dataset.couponId;
    var price = event.currentTarget.dataset.price;
    var orderNo = that.data.orderNo;
    var orderId = that.data.orderId;
    var getAddressId = that.data.getAddressId;
    var getAddress = that.data.getAddress;
    var ordercontactPerson = that.data.contactPerson;
    var contactMobile = that.data.contactMobile;
    wx.redirectTo({
      url: 'orderFront?orderNo=' + orderNo + "&orderId=" + orderId + "&couponPrice=" + price + "&couponId=" + couponId + "&addressId=" + getAddressId + "&contactMobile=" + contactMobile + "&contactPerson=" + ordercontactPerson + "&totalAddress=" + getAddress,
    })
  }
})