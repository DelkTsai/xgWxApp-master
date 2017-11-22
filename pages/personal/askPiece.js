// pages/personal/askPiece.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession:"",
    inviteCode:"",//邀请码
    midImage:"../../utils/image/personal/pic_fangkuang.png",//中间的图片
    goodsName:"",//商品名字
    maskst: "background-color:rgba(255,255,255,0);",//样式文件
    masknd: "background-color:rgba(255,255,255,0);",
    maskrd: "background-color:rgba(255,255,255,0);",
    maskth: "background-color:rgba(255,255,255,0);",
    showText:"我需要该碎片，请求交换",
    goToChipList:"goToChipList"//图片点击事件
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '碎片交换',
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
    var ivt = options.inviteCode;
    if(options.midImage!=undefined)
    {
      var img = options.midImage;
      var name = options.goodsName;
      var attrId = options.attrId;
      var indexp = options.index;
      if (indexp=="1")
      {
        that.setData({
          midImage: img,
          maskst: "background-color:rgba(255,255,255,0);",//样式文件
          masknd: "background-color:rgba(255,255,255,0.7);",
          maskrd: "background-color:rgba(255,255,255,0.7);",
          maskth: "background-color:rgba(255,255,255,0.7);",
          goToChipList:"",
          goodsName:name
        });
      }
      else if (indexp=="2"){
        that.setData({
          midImage: img,
          maskst: "background-color:rgba(255,255,255,0.7);",//样式文件
          masknd: "background-color:rgba(255,255,255,0);",
          maskrd: "background-color:rgba(255,255,255,0.7);",
          maskth: "background-color:rgba(255,255,255,0.7);",
          goodsName: name,
          goToChipList: ""
        });
      }
      else if (indexp=="3"){
        that.setData({
          midImage: img,
          maskst: "background-color:rgba(255,255,255,0.7);",//样式文件
          masknd: "background-color:rgba(255,255,255,0.7);",
          maskrd: "background-color:rgba(255,255,255,0);",
          maskth: "background-color:rgba(255,255,255,0.7);",
          goodsName: name,
          goToChipList: ""
        });
      }
      else if (indexp=="4")
      {
        that.setData({
          midImage: img,
          maskst: "background-color:rgba(255,255,255,0.7);",//样式文件
          masknd: "background-color:rgba(255,255,255,0.7);",
          maskrd: "background-color:rgba(255,255,255,0.7);",
          maskth: "background-color:rgba(255,255,255,0);",
          goodsName: name,
          goToChipList: ""
        });
      }
      
    }
    that.setData({
      inviteCode:ivt
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
  // 转跳到碎片列表
  goToChipList:function(event)
  {
    var that = this;
    var ivt = that.data.inviteCode
    wx.redirectTo({
      url: 'chipList?inviteCode='+ivt,
    })
  }
})