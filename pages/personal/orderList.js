// orderList.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession: "",
    itemList: [],
    jsonShuzu: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function(res) {
        that.setData({
          tokenSession:res.data
        });
        // 获取我的订单列表
        var sendGetOrderList={
          "tokenSession": that.data.tokenSession
        }
        util.getAjax("order/",sendGetOrderList,that.orderListCallBack);
      }
    });
    wx.setNavigationBarTitle({
      title: '我的订单'
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
  // 获取订单列表的信息
  orderListCallBack:function(json)
  {
    var that = this;
    if(json.ret==true)
    {
      for(var i = 0 ; i< json.data.length;i++)
      {
        that.data.jsonShuzu.push(json.data[i]);
      }
      that.setData({
        itemList: that.data.jsonShuzu
      });
    }
  },
  //转跳到订单详细页面
  jumpOrderDeatil: function (event) {
    var orderNo = event.currentTarget.dataset.orderNo;
    var payStatus = event.currentTarget.dataset.payStatus;
    var orderId = event.currentTarget.dataset.orderId
    if(payStatus=='1')
    {
      // 已经支付
      wx.navigateTo({
        url: 'orderDetailPay?orderNo=' + orderNo + "&orderId=" + orderId,
      })
    }
    else if(payStatus=='0')
    {
      wx.navigateTo({
        // 未支付
        url: 'orderDetail?orderNo=' + orderNo + "&orderId=" + orderId
      });
    }
   
  }
})