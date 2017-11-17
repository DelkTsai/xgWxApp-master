// pages/personal/confrimExchange.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession:"",
    extraId:"",
    ogoodsImg:"",//别人的数据
    ogoodsName:"",
    olocal:"",
    olt:"background-color:rgba(255,255,255,0.7)",
    ort: "background-color:rgba(255,255,255,0.7)",
    olb: "background-color:rgba(255,255,255,0.7)",
    orb: "background-color:rgba(255,255,255,0.7)",
    mgoodsImg: "../../utils/image/personal/pic_fangkuang.png",//我的数据
    mgoodsName: "",
    mlocal: "",
    mattrId:"",
    mgoodsId:"",
    mlt: "background-color:rgba(255,255,255,0.7)",
    mrt: "background-color:rgba(255,255,255,0.7)",
    mlb: "background-color:rgba(255,255,255,0.7)",
    mrb: "background-color:rgba(255,255,255,0.7)",
    addImage:"addImage",//控制点击事件
    buttonView:"",//控制下方按钮是否显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var extraId = options.extraId;
    var that = this;
    wx.setNavigationBarTitle({
      title: '碎片请求',
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
        util.postAjax("chip/get_chip_msg_for_ue", sendData, that.exChangeCallBack);
      }
    });
    var mgoodsImgp = options.mgoodsImg;
    var mgoodsNamep = options.mgoodsName;
    var mlocalp = options.mindex;
    var mattrIdp =options.mattrId;
    var mgoodsIdp = options.mgoodsId;
    if (mgoodsImgp != undefined || mgoodsImgp!=null)
    {
      that.setData({
        mgoodsImg: mgoodsImgp,
        mgoodsName: mgoodsNamep,
        mlocal: mlocalp,
        mattrId: mattrIdp,
        mgoodsId: mgoodsIdp,
        addImage:""
      });
      switch(mlocalp)
      {
        case "1":
          that.setData({
            mlt: "background-color:rgba(255,255,255,0)",
            mrt: "background-color:rgba(255,255,255,0.7)",
            mlb: "background-color:rgba(255,255,255,0.7)",
            mrb: "background-color:rgba(255,255,255,0.7)",
          });
          break;
        case "2":
          that.setData({
            mlt: "background-color:rgba(255,255,255,0.7)",
            mrt: "background-color:rgba(255,255,255,0)",
            mlb: "background-color:rgba(255,255,255,0.7)",
            mrb: "background-color:rgba(255,255,255,0.7)",
          });
          break;
        case "3":
          that.setData({
            mlt: "background-color:rgba(255,255,255,0.7)",
            mrt: "background-color:rgba(255,255,255,0.7)",
            mlb: "background-color:rgba(255,255,255,0)",
            mrb: "background-color:rgba(255,255,255,0.7)",
          });
          break;
        case "4":
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
  // 获取到交换信息之后的回调函数
  exChangeCallBack:function(json)
  {
    var that = this;
    var goodsImg = json.data.exchangeChipData.goodsImg;
    var goodsName = json.data.exchangeChipData.goodsName;
    var local = json.data.exchangeChipData.local;
    if(json.ret==true)
    {
      that.setData({
        ogoodsImg: goodsImg,//别人的数据
        ogoodsName: goodsName,
        olocal: local,
      });
      switch (local) {
        case "1":
          that.setData({
            olt: "background-color:rgba(255,255,255,0)",
            ort: "background-color:rgba(255,255,255,0.7)",
            olb: "background-color:rgba(255,255,255,0.7)",
            orb: "background-color:rgba(255,255,255,0.7)",
          });
          break;
        case "2":
          that.setData({
            olt: "background-color:rgba(255,255,255,0.7)",
            ort: "background-color:rgba(255,255,255,0)",
            olb: "background-color:rgba(255,255,255,0.7)",
            orb: "background-color:rgba(255,255,255,0.7)",
          });
          break;
        case "3":
          that.setData({
            olt: "background-color:rgba(255,255,255,0.7)",
            ort: "background-color:rgba(255,255,255,0.7)",
            olb: "background-color:rgba(255,255,255,0)",
            orb: "background-color:rgba(255,255,255,0.7)",
          });
          break;
        case "4":
          that.setData({
            olt: "background-color:rgba(255,255,255,0.7)",
            ort: "background-color:rgba(255,255,255,0.7)",
            olb: "background-color:rgba(255,255,255,0.7)",
            orb: "background-color:rgba(255,255,255,0)",
          });
          break;
      }
      if (json.data.giveChipData!=null)
      {
        var goodsImgm = json.data.giveChipData.goodsImg;
        var goodsNamem = json.data.giveChipData.goodsName;
        var localm = json.data.giveChipData.local;
        that.setData({
          mgoodsImg: goodsImgm,//我的数据
          mgoodsName: goodsNamem,
          mlocal: localm,
          addImage:""
        });
        switch (localm) {
          case "1":
            that.setData({
              mlt: "background-color:rgba(255,255,255,0)",
              mrt: "background-color:rgba(255,255,255,0.7)",
              mlb: "background-color:rgba(255,255,255,0.7)",
              mrb: "background-color:rgba(255,255,255,0.7)",
            });
            break;
          case "2":
            that.setData({
              mlt: "background-color:rgba(255,255,255,0.7)",
              mrt: "background-color:rgba(255,255,255,0)",
              mlb: "background-color:rgba(255,255,255,0.7)",
              mrb: "background-color:rgba(255,255,255,0.7)",
            });
            break;
          case "3":
            that.setData({
              mlt: "background-color:rgba(255,255,255,0.7)",
              mrt: "background-color:rgba(255,255,255,0.7)",
              mlb: "background-color:rgba(255,255,255,0)",
              mrb: "background-color:rgba(255,255,255,0.7)",
            });
            break;
          case "4":
            that.setData({
              mlt: "background-color:rgba(255,255,255,0.7)",
              mrt: "background-color:rgba(255,255,255,0.7)",
              mlb: "background-color:rgba(255,255,255,0.7)",
              mrb: "background-color:rgba(255,255,255,0)",
            });
            break;
        }
      }
      // if (json.data.dealStatus=='1')
      // {
      //   that.setData({
      //     buttonView:"visibility:hidden;display:none;"
      //   });
      // }
    }
  },
  // 获取我选择的碎片
  addImage:function()
  {
    var that = this;
    // var ogoodsImg = that.data.ogoodsImg;
    // var ogoodsName = that.data.ogoodsName;
    // var olocal = that.data.olocal;
      // ogoodsImg: "",//别人的数据
      // ogoodsName: "",
      // olocal: "",
    var extraId = that.data.extraId
    wx.redirectTo({
      url: 'myPieceListForExChange?extraId=' + extraId,
    });
  },
  // 确认交换按钮
  confirmToExchange:function()
  {
    var that =this;
    var attrId = that.data.mattrId;
    var ueId = that.data.extraId;
    var token = that.data.tokenSession;
    if (attrId==""||attrId==undefined||attrId==null)
    {
      wx.showToast({
        title: '请选择你需要交换的碎片',
      });
    }
    else {
      var sendData = {
        "attrId":attrId,
        "ueId":ueId,
        "tokenSession":token
      }
      util.postAjax("chip/give_exchange", sendData,that.confirmCallBack);
    }
  },
  confirmCallBack:function(json)
  {
    // console.log(json);
    if(json.ret==true)
    {
      wx.navigateBack({
        delta:4
      });
    }
  }
})