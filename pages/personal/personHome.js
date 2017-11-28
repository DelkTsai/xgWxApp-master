// personHome.js
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    blance:"",
    inviteCode:"",
    imgUrl:"",
    myscore:"",//我的积分
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求访问服务器
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function(res) {
        var sendData = {
          "tokenSession": res.data
        }
        util.getAjax("user/baseMsg", sendData, that.onLoadCallBack);
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.setNavigationBarTitle({
      title: '个人中心'
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
  //加载函数第一次请求服务器的回调函数
  onLoadCallBack:function(json)
  {
    var that = this;
    that.setData({
      blance:" ¥ "+ json.data.balance
    })
    that.setData({
      inviteCode: json.data.inviteCode
    })
    that.setData({
      imgUrl: json.data.userImg
    })
    that.setData({
      myscore: json.data.score
    });
  },
  //点击头像的响应事件
  userImage:function()
  {
    wx.navigateTo({
      url: 'userDetail'
    })
  },
  // 跳转至意见反馈页面
  adviceFeedBack:function()
  {
    wx.navigateTo({
      url: 'adviceFeedBack',
    })
  },
  //转跳到余额页面
  jumpBlance:function(){
    wx.navigateTo({
      url: 'blance'
    })
  },
  // 转跳到消息中心
  jumpMsgCenter:function(){
    wx.navigateTo({
      url: 'msgCenter'
    })
  },
  //跳去地址管理
  jumpAddress:function(){
    wx.navigateTo({
      url: 'address'
    })
  },
  // 余额下方四个转跳
  jumpDiffPage:function(event)
  {
    var target = event.currentTarget.dataset.jumpData;
    var url="";
    switch(target)
    {
      case "order":
      //订单页面
        url = "orderList";
        break;
      //团购页面
      case "group":
        // url = "groupList";
        wx.showToast({
          title: '敬请期待',
        })
        break;
      //悬赏页面
      case "reward":
        // url = "rewardList";
        wx.showToast({
          title: '敬请期待',
        })
        break;
      //收藏页面
      case "collect":
        url = "collection";
        break;
    }
    wx.navigateTo({
      url: url
    })
  },
  // 转跳到碎片页面
  jumpPieceList:function(event)
  {
    var ivt = event.currentTarget.dataset.inviteCode
    wx.navigateTo({
      url: 'piece?inviteCode='+ivt
    })
  },
  //转跳到优惠券页面
  jumpCoupon:function()
  {
    wx.navigateTo({
      url: 'myCouponList',
    })
  },
  //转跳到积分页面
  jumpScore:function()
  {
    wx.navigateTo({
      url: 'myscore'
    })
  },
  // 联系客服
  preImage:function()
  {
    var url = [];
    var that = this;
    var u = that.data.imgUrl;
    url.push(u);
    wx.previewImage({
      urls:url
    });
  },
  // 转跳到幸运九宫格
  jumpNine:function()
  {
    wx.redirectTo({
      url: 'luckNine',
    })
  }
})