// email.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: "",
    inputContent: {},
    tokenSession: "",
    windowHeight:"",//屏幕高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      email: options.email
    });
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          tokenSession: res.data
        })
      }
    });
    wx.setNavigationBarTitle({
      title: '电子邮箱'
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
  // 用户填写电子邮件之后
  finishEmail:function(e)
  {
    this.data.inputContent[e.currentTarget.id] = e.detail.value;
  },
  //保存按钮
  saveEmail:function(){
    var that  = this;
    var email = that.data.inputContent.userEmail;
    var sendEmail;
    if(email==undefined || email == null || email == "") {
      if (that.data.email == "" || that.data.email == undefined || that.data.email == null) {
        wx.showToast({
          title: '电子邮箱不能为空'
        });
        return;
      }
      else {
        sendEmail = {
          "tokenSession": that.data.tokenSession,
          "modifyType": 2,
          "modifyContent": that.data.email
        }
      }
    }
    else{
      sendEmail = {
        "tokenSession": that.data.tokenSession,
        "modifyType": 2,
        "modifyContent": email
      }
    }
    util.postAjax("user/modifyMsg", sendEmail, that.emailModifyCallBack);
  },
  //保存电子邮箱的回调
  emailModifyCallBack:function(json)
  {
    if (json.ret == true) {
      wx.showToast({
        title: '修改成功'
      });
      wx.navigateBack({
        delta: 2
      })
    }
  }
})