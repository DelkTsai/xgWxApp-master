// orderDetail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession: "",
    //前一个页面传递过来的数据
    orderId:"",
    orderNo:"",
    score:"",
    address:"",
    coupon:"",
    //控制地址选择框与显示框，和优惠券显示框与显示框
    addressShow:"",
    addressHidden:"",
    couponShow:"",
    couponHiddern:"",
    //订单详细列表
    orderList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var orderIdp = options.orderId;
    var orderNop = options.orderNo;
    var scorep = options.orderNo;
    var addressp = options.address;
    var couponp = options.coupon;
    var getOrderList;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data
        that.setData({
          tokenSession: token
        });
        getOrderList={
          "tokenSession":token,
          "orderNo": orderNop
        }
        util.getAjax("order/order_detail",getOrderList,that.getAllDetail);
      }
    });
    // if (addressp == undefined || addressp==null)
    // {
    //   that.
    // }
    that.setData({
      orderId: orderIdp,
      orderNo: orderNop,
      score: scorep
    });
    wx.setNavigationBarTitle({
      title: '订单详情',
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
  // 获取订单详细回调函数
  getAllDetail:function(json)
  {
    console.log(json);
    var that = this;
    if(json.ret==true)
    {
      that.setData({
        orderList: json.data
      });
    }
    
  }
})