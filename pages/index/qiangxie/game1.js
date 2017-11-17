// pages/index/qiangxie/game1.js
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gameTime:3
    ,clickCount:0
    ,isStart:false
    ,isOver:false
    ,windowWidth:0
    ,windowHiehgt:0
    ,si:null
    ,_type:null
    , performanceId:null
    , showFenShuModal: false
    , showModalBg: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.performanceId = options.performanceId;
    this.data._type = options.type;
    var res = wx.getSystemInfoSync();
    this.setData({
      windowWidth:res.windowWidth
      ,windowHeight:res.windowHeight
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
  
  }

  //点击按钮
  ,onGameStartClick(event){
    if(this.data.isOver){
      return;
    }

    if(!this.data.isStart){
      this.data.si = setInterval(this.jishi,1000);
      this.data.isStart = true;
    } else {
      this.data.clickCount++;
    }

    this.setData({
      isStart:this.data.isStart
      ,clickCount: this.data.clickCount
    });
  }
  ,jishi(){
    this.data.gameTime -=1;
    if (this.data.gameTime == 0){
      this.data.isOver = true;
      clearInterval(this.data.si);
      this.submitAchievement();
    }
    this.setData({
      gameTime: this.data.gameTime
    });
  }
  //提交成绩
  , submitAchievement(){
    var url;
    if(this.data._type=="3"){
      url = "sell/save_performance";
    }else if(this.data._type=="2"){
      url = "week/save_performance";
    }
    var token = wx.getStorageSync("token");
    var para = {
      performanceId: this.data.performanceId
      , performance : this.data.clickCount
      , tokenSession: token
    }


    wx.showLoading({
      title: '正在提交成绩',
    })
    util.postAjax(url, para, this.submitCallback);

  }
  ,submitCallback(json){
    wx.hideLoading();
    console.log(json);
    if(json.ret){
      this.setData({
        showFenShuModal: true
        , showModalBg: true
      });
    }else{
      wx.showToast({
        title: json.forUser,
      })
    }
  }
  , hideModal(event){
    wx.navigateBack({
      delta: 1,
    });
  }
})