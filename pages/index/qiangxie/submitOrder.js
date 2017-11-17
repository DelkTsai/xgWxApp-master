// pages/index/qiangxie/submitOrder.js
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _type:"",
    performanceId:"",
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
    addressResult: null,
    couponResult: null,
    needPay:true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //去后台获取数据
    var that = this;
    var token = wx.getStorageSync("token");
    var performanceId = options.performanceId;
    this.data._type = options.type;
    this.data.performanceId = options.performanceId;

    var sendData = {
      tokenSession: token,
      performanceId: performanceId
    };

    if(this.data._type=="3"){
      util.getAjax("sell/before_pay", sendData, that.orderDetailCallBack);
    }else if(this.data._type=="2"){
      util.getAjax("week/before_pay", sendData, that.orderDetailCallBack);
    }
  
    wx.setNavigationBarTitle({
      title: '订单详情'
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
    if (this.data.addressResult != null) {
      var options = this.data.addressResult;
      console.log(options);
      // 判断有没有地址
      if (options.addressId != undefined && options.addressId != "" && options.addressId != null) {
        console.log(options);
        this.setData({
          getAddress: options.totalAddress,//从其他页面获取的地址
          contactPerson: options.contactPerson,
          contactMobile: options.contactMobile,
          getAddressId: options.addressId,
          getCouponPrice: options.couponPrice,//从其他页面获取的优惠券价值
          getCouponId: options.couponId,
          isAddress: "",
          noAddress: "visibility:hidden;display:none;"
        });
      }
    }
    if (this.data.couponResult != null) {
      var options = this.data.couponResult;
      // 判断有没有优惠券
      if (options.couponId != undefined && options.couponId != null && options.couponId != "") {
        console.log(options);

        this.setData({
          getAddress: options.totalAddress,//从其他页面获取的地址
          contactPerson: options.contactPerson,
          contactMobile: options.contactMobile,
          getAddressId: options.addressId,
          getCouponPrice: options.couponPrice,//从其他页面获取的优惠券价值
          getCouponId: options.couponId,
          isCoupon: "",
          noCoupon: "visibility:hidden;display:none;"
        });
      }
      this.data.couponResult = null;
    }
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
    var that = this;
    return {
      title: '鞋狗',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功'
        })
        var para={
          tokenSession:wx.getStorageSync("token")
          , performanceId: that.data.performanceId
          , shareStatus:"1"
        }
        if(that.data._type=="3"){
          util.postAjax("sell/set_share_status", para, that.setShareStatusCallback);

        }else if(that.data._type=="2")
        {
          util.postAjax("week/set_share_status", para, that.setShareStatusCallback);
        }
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败'
        })
      }
    }
  }
  ,//设置分享回调
  setShareStatusCallback(json){
    console.log(json);
    if(json.ret){
      this.data.needPay=false;
      this.pay();

    }else{
      wx.showToast({
        title: json.forUser,
      })
    }
  }

  //获取订单详细回调函数
 , orderDetailCallBack: function (json) {
    var that = this;
    console.log(json);
    if (json.ret == true) {
      that.setData({
        jsonData: json.data
      });
      var getAddress = that.data.getAddress;
      var getAddressId = that.data.getAddressId;
      if (getAddressId == "") {
        if (getAddress != "" || json.data.address != "") {
          // 如果有地址信息
          that.setData({
            noAddress: "visibility:hidden;display:none;",//没有地址时候的样式
            isAddress: "",//有地址的样式
            getAddress: json.data.address,//从其他页面获取的地址
            contactPerson: json.data.contactPerson,
            contactMobile: json.data.contactMobile
          });
        }
        else {
          //没有地址信息
          that.setData({
            noAddress: "",//没有地址时候的样式
            isAddress: "visibility:hidden;display:none;",//有地址的样式
          });
        }
      }
      else if (getAddressId != "") {
        if (getAddress != "" || json.data.address != "") {
          // 如果有地址信息
          that.setData({
            noAddress: "visibility:hidden;display:none;",//没有地址时候的样式
            isAddress: "",//有地址的样式
            // getAddress: json.data.address,//从其他页面获取的地址
            // contactPerson: json.data.contactPerson,
            // contactMobile: json.data.contactMobile
          });
        }
        else {
          //没有地址信息
          that.setData({
            noAddress: "",//没有地址时候的样式
            isAddress: "visibility:hidden;display:none;",//有地址的样式
          });
        }
      }
      //是否有使用优惠券
      var getCouponPrice = that.data.getCouponPrice
      var getCouponId = that.data.getCouponId;
      var isCouponVisiable;
      var noCouponVisiable;
      if (json.data.couponStatus == "0"){
        isCouponVisiable = "visibility:hidden;display:none;";
        noCouponVisiable = "";
        getCouponPrice = "0";
        getCouponId = null;
      }else{
        isCouponVisiable = "";
        noCouponVisiable = "visibility:hidden;display:none;";
      } 
      this.setData({
        isCoupon: isCouponVisiable
        , noCoupon: noCouponVisiable
        , getCouponPrice: getCouponPrice
        , getCouponId: getCouponId
      })
    }
  },
  // 没有地址的时候转跳到获取地址页面
  getAddress: function () {
    var that = this;
    var orderNo = that.data.orderNo;
    var orderId = that.data.orderId;
    var getCouponPrice = that.data.getCouponPrice;
    var getCouponId = that.data.getCouponId;
    wx.navigateTo({
      url: '../../personal/addressForOrderDetail?orderNo=' + orderNo + "&orderId=" + orderId + "&couponPrice=" + getCouponPrice + "&couponId=" + getCouponId,
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
    wx.navigateTo({
      url: '../../personal/couponListForOrderDetail?orderNo=' + orderNo + "&orderId=" + orderId + "&getAddressId=" + getAddressId + "&getAddress=" + getAddress + "&contactPerson=" + contactPerson + "&contactMobile=" + contactMobile,
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
    var performanceId = that.data.performanceId
    var getAddressId = that.data.getAddressId
    var blanceStauts = that.data.blanceStauts;
    var token = wx.getStorageSync("token");
    var payType;
    if(this.data._type=="3"){
      payType="3";
    } else if (this.data._type == "2"){
      payType="2";
    }
    var sendData = {
      "payType": payType,
      "addressId": getAddressId,
      performanceId: performanceId,
      "balanceType": blanceStauts,
      "couponId": getCouponId,
      "source": 1,
      "tokenSession": token
    }
    util.postAjax("pay/wechat_pay", sendData, that.payCallBack);
  },
  payCallBack: function (json) {
    console.log(json);
    var that = this;
    if (json.ret) {
      if (!this.data.needPay){
        wx.redirectTo({
            url: 'game1?type=' + this.data._type + "&performanceId=" + this.data.performanceId,
          })
          return;
      }

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
          wx.redirectTo({
            url: 'game1?type=' + that.data._type + "&performanceId=" + that.data.performanceId,
          })
        },
        'fail': function (res) {
          console.log("用户取消");
          console.log(res);
        }
      });
    }else{
      wx.showToast({
        title: json.forUser,
      })
    }
  }
  ,shareBtnClick(event){
    wx.showToast({
      title: '点击右上角分享',
    });
  }
  ,goToPay(event){
    wx.redirectTo({
      url: 'game1?type=' + this.data._type + "&performanceId=" + this.data.performanceId,
    })
  }
})