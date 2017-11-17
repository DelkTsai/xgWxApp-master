// pages/personal/exchangePiece.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession: "",
    inviteCode: "",//邀请码
    midImage: "../../utils/image/personal/pic_fangkuang.png",//中间的图片
    maskst: "background-color:rgba(255,255,255,0.7);",//样式文件
    masknd: "background-color:rgba(255,255,255,0.7);",
    maskrd: "background-color:rgba(255,255,255,0.7);",
    maskth: "background-color:rgba(255,255,255,0.7);",
    goToChipList: "goToChipList",//图片点击事件
    attrId:"",
    goodsName:"",
    index:"",//碎片位置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '交换碎片'
    });
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data
        that.setData({
          tokenSession: token
        });
      }
    });
    if (options.midImage != undefined) {
      var mid = options.midImage;
      var ind = options.index;
      var name = options.gooodsName;
      var attr = options.attrId;
      var ivt = options.inviteCode;
      if(ind == '1')
      {
        that.setData({
          maskst: "background-color:rgba(255,255,255,0);",//样式文件
          masknd: "background-color:rgba(255,255,255,0.7);",
          maskrd: "background-color:rgba(255,255,255,0.7);",
          maskth: "background-color:rgba(255,255,255,0.7);",
        });
      }
      else if (ind == '2')
      {
        that.setData({
          maskst: "background-color:rgba(255,255,255,0.7);",//样式文件
          masknd: "background-color:rgba(255,255,255,0);",
          maskrd: "background-color:rgba(255,255,255,0.7);",
          maskth: "background-color:rgba(255,255,255,0.7);",
        });
      }
      else if (ind == '3')
      {
        that.setData({
          maskst: "background-color:rgba(255,255,255,0.7);",//样式文件
          masknd: "background-color:rgba(255,255,255,0.7);",
          maskrd: "background-color:rgba(255,255,255,0);",
          maskth: "background-color:rgba(255,255,255,0.7);",
        });
      }
      else if(ind == '4')
      {
        that.setData({
          maskst: "background-color:rgba(255,255,255,0.7);",//样式文件
          masknd: "background-color:rgba(255,255,255,0.7);",
          maskrd: "background-color:rgba(255,255,255,0.7);",
          maskth: "background-color:rgba(255,255,255,0);",
        });
      }
      that.setData({
        midImage:mid,
        attrId:attr,
        inviteCoed:ivt,
        index:ind
      })
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
  // 点击中间十字图片的事件
  goToChipList:function(){
    var that = this;
    var ivt = that.data.inviteCode
    wx.navigateTo({
      url: 'myPieceList?inviteCode='+ivt,
    })
  },
  //用户邀请码输入完成之后
  finishInsert:function(event)
  {
    var that = this;
    var invite = event.detail.value;
    that.setData({
      inviteCode:invite
    });
  },
  //提交邀请
  sendInvite:function()
  {
    var that = this;
    var token = that.data.tokenSession;
    var ivt = that.data.inviteCode;
    var attr = that.data.attrId;
    if(attr!=undefined||attr!=null)
    {
      var sendData = {
        "tokenSession": token,
        "attrId": attr,
        "inviteCode": ivt
      }
      util.postAjax("chip/check_invite_code", sendData, that.invteCallBack);
    }
   else {
     wx.showToast({
       title: '请选择要交换的碎片',
     });
   }
  },
  // 提交邀请回调
  invteCallBack:function(json)
  {
    if(json.ret==false)
    {
      wx.showToast({
        title: json.forUser,
      });
    }
    else{
      wx.navigateBack({
        delta: 2
      })
    }
  }
})