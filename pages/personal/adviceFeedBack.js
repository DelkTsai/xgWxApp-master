// adviceFeedBack.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputConter:{},
    tokenSession:"",
    windowHeight:"",//屏幕高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that= this;
    wx.setNavigationBarTitle({
      title: '意见反馈'
    });
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          tokenSession : res.data
        });
      }
    });
    //获取屏幕信息
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.model)
        // console.log(res.pixelRatio)
        // console.log(res.windowWidth)
        // console.log(res.windowHeight)
        // console.log(res.language)
        // console.log(res.version)
        that.setData({
          windowHeight: res.windowHeight
        });
      }
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
  // 意见填写完毕之后
  finishAdvice:function(e)
  {
    this.data.inputConter[e.currentTarget.id]=e.detail.value;
  },
  // 保存按钮
  saveAdvice:function()
  {
    var that = this;
    var sendAdvice={
      "tokenSession": that.data.tokenSession,
      "content": that.data.inputConter.userAdvice
    }
    util.postAjax("user/feedback",sendAdvice,that.feedBackCallBack);
  },
  // 保存的回调函数
  feedBackCallBack:function(json)
  {
    if(json.ret==true)
    {
      wx.showToast({
        title: '意见提交成功'
      });
      wx.navigateBack({
        delta: 1
      });
    }
  }
})