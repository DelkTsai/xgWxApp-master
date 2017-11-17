// orderDetail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: "",
    orderNo: "",
    tokenSession: "",
    jsonData: "",//获取的数据
    noAddress: "",//没有地址时候的样式
    isAddress: "",//有地址的样式
    isCoupon: "",//有使用优惠券
    noCoupon: "",//没有使用优惠券
    getAddress: "",//从其他页面获取的地址
    contactPerson: "",
    contactMobile: "",
    getAddressId: "",
    getCouponPrice: "",//从其他页面获取的优惠券价值
    getCouponId: "",
    blanceStauts: 1,//是否使用余额状态
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
    // 判断有没有地址
    if (options.addressId != undefined && options.addressId != "" && options.addressId != null) {
      that.setData({
        getAddress: options.totalAddress,//从其他页面获取的地址
        contactPerson: options.contactPerson,
        contactMobile: options.contactMobile,
        getAddressId: options.addressId,
        getCouponPrice: options.couponPrice,//从其他页面获取的优惠券价值
        getCouponId: options.couponId
      });
    }
    // 判断有没有优惠券
    if (options.couponId != undefined && options.couponId != null && options.couponId != "") {
      that.setData({
        getAddress: options.totalAddress,//从其他页面获取的地址
        contactPerson: options.contactPerson,
        contactMobile: options.contactMobile,
        getAddressId: options.addressId,
        getCouponPrice: options.couponPrice,//从其他页面获取的优惠券价值
        getCouponId: options.couponId
      });
    }
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
      title: '商品详情'
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
  //获取订单详细回调函数
  orderDetailCallBack: function (json) {
    var that = this;
    console.log(json);
    if (json.ret == true) {
      that.setData({
        jsonData: json.data
      });
      var getAddress = that.data.getAddress;
      if (getAddress != "" || json.data.address != "") {
        // 如果有地址信息
        that.setData({
          noAddress: "visibility:hidden;display:none;",//没有地址时候的样式
          isAddress: "",//有地址的样式
          getAddress: json.data.address,//从其他页面获取的地址
          // contactPerson: json.data.contactPerson,
          // contactMobile: json.data.contactMobile,
          // getAddressId: "",
        });
      }
      else {
        //没有地址信息
        that.setData({
          noAddress: "",//没有地址时候的样式
          isAddress: "visibility:hidden;display:none;",//有地址的样式
        });
      }
      //是否有使用优惠券
      var getCouponPrice = that.data.getCouponPrice
      if (getCouponPrice == "" && json.data.couponStatus == "0") {
        //没有使用优惠券
        that.setData({
          isCoupon: "visibility:hidden;display:none;",//有使用优惠券
          noCoupon: "",//没有使用优惠券
        });
      }
      else {
        // 有使用优惠券
        that.setData({
          isCoupon: "",//有使用优惠券
          noCoupon: "visibility:hidden;display:none;",//没有使用优惠券
          // getCouponPrice: json.data.couponPrice,//从其他页面获取的优惠券价值
          // getCouponId: "",
        });
      }
    }
  },
  // 没有地址的时候转跳到获取地址页面
  getAddress: function () {
    var that = this;
    var orderNo = that.data.orderNo;
    var orderId = that.data.orderId;
    var getCouponPrice = that.data.getCouponPrice;
    var getCouponId = that.data.getCouponId;
    wx.redirectTo({
      url: 'address?orderNo=' + orderNo + "&orderId=" + orderId + "&couponPrice=" + getCouponPrice + "&couponId=" + getCouponId,
    })
  },
  //没有优惠券获取优惠券
  getCoupon: function () {
    var that = this;
    var orderNo = that.data.orderNo;
    var orderId = that.data.orderId;
    var getAddress = that.data.getAddress;
    var contactPerson = that.data.contactPerson;
    var contactMobile = that.data.contactMobile;
    var getAddressId = that.data.getAddressId;
    wx.redirectTo({
      url: 'myCouponList?orderNo=' + orderNo + "&orderId=" + orderId + "&getAddressId=" + getAddressId + "&getAddress=" + getAddress + "&contactPerson=" + contactPerson + "&contactMobile=" + contactMobile,
    })
  },
  // 是否使用余额开关
  switchChange: function (e) {
    var that = this;
    var val = e.detail.value;
    if (val == true) {
      //使用余额
      that.setData({
        blanceStauts: 2
      });
    }
    else if (val == false) {
      //不使用余额
      that.setData({
        blanceStauts: 1
      });
    }
  },
  // 支付按钮
  pay: function () {
    var that = this;
    var getCouponId = that.data.getCouponId
    var orderId = that.data.orderId
    var getAddressId = that.data.getAddressId
    var blanceStauts = that.data.blanceStauts;
    var token = that.data.tokenSession;
    var sendData = {
      "payType": 1,
      "orderId": orderId,
      "addressId": getAddressId,
      "balanceType": blanceStauts,
      "couponId": getCouponId,
      "source": 1,
      "tokenSession": token
    }
    util.postAjax("pay/wechat_pay", sendData, that.payCallBack);
  },
  payCallBack: function (json) {
    console.log(json);
    if (json.ret == true) {
      var timeStamp = json.data.timeStamp;
      var nonceStr = json.data.nonceStr;
      var packagep = "prepay_id=" + json.data.prepayId;
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
            delta: 2
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