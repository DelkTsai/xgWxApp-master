// pages/personal/finalConfirm.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession: "",
    extraId: "",
    ogoodsImg: "",//别人的数据
    ogoodsName: "",
    olocal: "",
    olt: "background-color:rgba(255,255,255,0.7)",
    ort: "background-color:rgba(255,255,255,0.7)",
    olb: "background-color:rgba(255,255,255,0.7)",
    orb: "background-color:rgba(255,255,255,0.7)",
    mgoodsImg: "",//我的数据
    mgoodsName: "",
    mlocal: "",
    mlt: "background-color:rgba(255,255,255,0.7)",
    mrt: "background-color:rgba(255,255,255,0.7)",
    mlb: "background-color:rgba(255,255,255,0.7)",
    mrb: "background-color:rgba(255,255,255,0.7)",
    dealStatus:"",//交换状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var extraId = options.extraId;
    var that = this;
    wx.setNavigationBarTitle({
      title: '最终确认',
    });
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data
        that.setData({
          tokenSession: token,
          extraId: extraId
        });
        var sendData = {
          "tokenSession": token,
          "ueId": extraId
        }
        util.postAjax("chip/get_chip_msg_for_ue", sendData, that.finalCallBack);
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
  // 获取交换数据的回调函数
  finalCallBack:function(json)
  {
    var that = this;
    if(json.ret==true)
    {
      var ogoodsName = json.data.exchangeChipData.goodsName;
      var ogoodsImg = json.data.exchangeChipData.goodsImg;
      var olocal = json.data.exchangeChipData.local;
      var dealStatusp = json.data.dealStatus;
      var mgoodsName = json.data.giveChipData.goodsName;
      var mgoodsImg = json.data.giveChipData.goodsImg;
      var mlocal = json.data.giveChipData.local;
      that.setData({
        ogoodsImg: ogoodsImg,//别人的数据
        ogoodsName: ogoodsName,
        olocal: olocal,
        mgoodsImg: mgoodsImg ,//我的数据
        mgoodsName: mgoodsName,
        mlocal: mlocal,
        dealStatus: dealStatusp
      });
      switch (olocal)
      {
        case '1':
          that.setData({
            olt: "background-color:rgba(255,255,255,0)",
            ort: "background-color:rgba(255,255,255,0.7)",
            olb: "background-color:rgba(255,255,255,0.7)",
            orb: "background-color:rgba(255,255,255,0.7)",
          });
          break;
        case '2':
          that.setData({
            olt: "background-color:rgba(255,255,255,0.7)",
            ort: "background-color:rgba(255,255,255,0)",
            olb: "background-color:rgba(255,255,255,0.7)",
            orb: "background-color:rgba(255,255,255,0.7)",
          });
          break;
        case '3':
          that.setData({
            olt: "background-color:rgba(255,255,255,0.7)",
            ort: "background-color:rgba(255,255,255,0.7)",
            olb: "background-color:rgba(255,255,255,0)",
            orb: "background-color:rgba(255,255,255,0.7)",
          });
          break;
        case '4':
          that.setData({
            olt: "background-color:rgba(255,255,255,0.7)",
            ort: "background-color:rgba(255,255,255,0.7)",
            olb: "background-color:rgba(255,255,255,0.7)",
            orb: "background-color:rgba(255,255,255,0)",
          });
          break;
      }
      switch (mlocal)
      {
        case '1':
          that.setData({
            mlt: "background-color:rgba(255,255,255,0)",
            mrt: "background-color:rgba(255,255,255,0.7)",
            mlb: "background-color:rgba(255,255,255,0.7)",
            mrb: "background-color:rgba(255,255,255,0.7)",
          });
          break;
        case '2':
          that.setData({
            mlt: "background-color:rgba(255,255,255,0.7)",
            mrt: "background-color:rgba(255,255,255,0)",
            mlb: "background-color:rgba(255,255,255,0.7)",
            mrb: "background-color:rgba(255,255,255,0.7)",
          });
          break;
        case '3':
          that.setData({
            mlt: "background-color:rgba(255,255,255,0.7)",
            mrt: "background-color:rgba(255,255,255,0.7)",
            mlb: "background-color:rgba(255,255,255,0)",
            mrb: "background-color:rgba(255,255,255,0.7)",
          });
          break;
        case '4':
          that.setData({
            mlt: "background-color:rgba(255,255,255,0.7)",
            mrt: "background-color:rgba(255,255,255,0.7)",
            mlb: "background-color:rgba(255,255,255,0.7)",
            mrb: "background-color:rgba(255,255,255,0)",
          });
          break;
      }
    }
  },
  // 最终确认交换点击事件
  confirmToExchange:function(json)
  {
    var that = this;
    var extraId = that.data.extraId;
    var token = that.data.tokenSession;
    var sendData={
      "ueId": extraId,
      "tokenSession":token
    }
    util.postAjax("chip/comfirm_exchange",sendData,that.finalConfirmCallBack);
  },
  finalConfirmCallBack:function(json)
  {
    if(json.ret==true)
    {
      wx.showToast({
        title: '交换成功',
      })
      wx.navigateBack({
        delta:2
      })
    }
  }
})