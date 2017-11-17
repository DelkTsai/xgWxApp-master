// nickName.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:"",
    inputContent: {},
    tokenSession:"",
    windowHeight:"",//屏幕高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      nickname: options.nickName
    });
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          tokenSession:res.data
        })
      }
    });
    wx.setNavigationBarTitle({
      title: '昵称'
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
  // 填写用户昵称后
  finishNickname:function(e){
    this.data.inputContent[e.currentTarget.id] = e.detail.value;
  },
  // 把昵称提交到去服务器
  saveNickname:function()
  {
    var that = this;
    var nick = that.data.inputContent.userNickname;
    var sendNickname;
    if(nick==""||nick==undefined||nick==null)
    {
      if (that.data.nickname == "" || that.data.nickname == undefined || that.data.nickname ==null)
      {
        wx.showToast({
          title: '用户昵称不能为空'
        })
        return;
      }
      else{
        sendNickname = {
          "tokenSession": that.data.tokenSession,
          "modifyType": 1,
          "modifyContent": that.data.nickname
        }
      }
    }
    else{
      sendNickname = {
        "tokenSession": that.data.tokenSession,
        "modifyType": 1,
        "modifyContent": nick
      }
    }
    util.postAjax("user/modifyMsg",sendNickname,that.nickNameModifyCallBack)
  },
  //修改昵称后的回调函数
  nickNameModifyCallBack:function(json){
    if(json.ret==true){
      wx.showToast({
        title: '修改成功'
      });
      wx.navigateBack({
        delta: 2
      })
    }
  }
})