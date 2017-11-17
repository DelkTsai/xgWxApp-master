// pages/index/ziXun/ziXunDetail.js
var util = require('../../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailPage:""
    ,that:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.that = this;
    wx.setNavigationBarTitle({
      title: options.infoTitle,
    })
    this.getZiXunDetail(options.infoId);
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
  //获取资讯详情
  ,getZiXunDetail:function(infoId){
    util.getAjax("home/info_detail?infoId=" + infoId+"&infoType=2", "", this.getZiXunDetailCallback)
  }
  //获取资讯详情回调
  ,getZiXunDetailCallback:function(json){
    console.log(json);


    // while(json.data.html.indexOf("<script")!=-1){
    //   var start = json.data.html.indexOf("<script");
    //   var end = json.data.html.indexOf("</script>");
    //   json.data.html.rep

    // }
    
  
    var replaceText = json.data.html.replace(/<script.*?>.*?<\/script>/ig, '');
    try{
      WxParse.wxParse("detailPage", "html", replaceText, this, 0);

    }catch(e){
      console.log(e)
    }
  }
})