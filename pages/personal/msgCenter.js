// msgCenter.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession:"",
    itemList:[],
    jsonShuzu:[],
    lastId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data
        that.setData({
          tokenSession: token
        });
        var sendFirstPage = {
          "tokenSession": res.data,
          "lastId": ""
        }
        util.postAjax("user/msg", sendFirstPage, that.sendFirstMsgCallBack);
      }
    });
    wx.setNavigationBarTitle({
      title: '消息中心'
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
    var that = this;
    var sendSecondPage={
      "tokenSession": that.data.tokenSession,
      "lastId": that.data.lastId
    }
    util.postAjax("user/msg", sendSecondPage, that.sendSecondMsgCallBack);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 消息中心第一次返回页面数据
  sendFirstMsgCallBack:function(json)
  {
    var that = this;
    that.data.jsonShuzu= [];
    if(json.ret==true)
    {
      for(var i=0;i<json.data.length;i++)
      {
        if(i==json.data.length-1)
        {
          var last = json.data[i].msgId
          that.setData({
            lastId: last
          });
        }
        that.data.jsonShuzu.push(json.data[i]);
      }
    }
    that.setData({
      itemList: that.data.jsonShuzu
    })
  },
  // 上拉到顶的刷新
  sendSecondMsgCallBack:function(json){
    var that = this;
    that.data.jsonShuzu = [];
    if(json.ret==true)
    {
      that.data.jsonShuzu = [];
      for(var i =0;i<json.data.length;i++)
      {
        var last = json.data[i].msgId
        if (i == json.data.length - 1) {
          that.setData({
            lastId: last
          });
        }
        
        that.data.jsonShuzu.push(json.data[i]);
      }
      that.setData({
        itemList: that.data.jsonShuzu
      })
    }
  },
  // 判断是否是碎片交换模块
  isPiece:function(event)
  {
    // console.log(event);
    var msgType = event.currentTarget.dataset.msgType;
    var extraId = event.currentTarget.dataset.extraId;
    if(msgType=="5")
    {
      //跳转到确认互换页面
      wx.navigateTo({
        url: 'confrimExchange?extraId=' + extraId,
      })
    }
    else if (msgType=="51")
    {
      //转跳到最终确认页面
      wx.navigateTo({
        url: 'finalConfirm?extraId=' + extraId,
      })
    }
  }
})