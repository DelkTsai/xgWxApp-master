// userDetail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userHead:"",
    nickName:"",
    email:"",
    tel:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function(res) {
        //访问服务器获取详细信息
        var sendGetDatilData = {
          "tokenSession": res.data
        }
        util.getAjax("user/personalMsg", sendGetDatilData, that.onDetailCallBack);
      }
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
  // 获取用户的详细信息的回调函数
  onDetailCallBack:function (json)
  {
    var that = this;
    that.setData({
      userHead:json.data.userImg,
      nickName: json.data.nickname,
      email:json.data.email,
      tel: json.data.phoneNum
    })
  },
  // 跳转至手机号码绑定界面
  toTelBind:function()
  {
    wx.navigateTo({
      url: 'telBind'
    })
  },
  //转跳至头像更换页面
  openImage:function(event)
  {
    var imageUrl = event.target.dataset.imageUrl;
    wx.navigateTo({
      url: 'headImage?imageUrl='+imageUrl
    })
  },
  // 转跳至昵称更换页面
  jumpNickname:function(event)
  {
    var nickName = event.target.dataset.nickName;
    wx.navigateTo({
      url: 'nickName?nickName='+nickName
    })
  },
  // 转跳到电子邮箱修改页面
  jumpEmail:function(event)
  {
    var email = event.target.dataset.eMail;
    wx.navigateTo({
      url: 'email?email='+email
    })
  }
})