// telBind.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession:"",
    phoneNum: "",
    confirmCode:"",
    showMsg:"|获取验证码",
    second:120,
    errorMsg:"",
    windowHeight:"",//屏幕高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        //访问服务器获取详细信息
        that.setData({
          tokenSession:res.data
        });
      }
    })
    wx.setNavigationBarTitle({
      title: '改绑手机'
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
  // 手机号码改变事件
  inputChange:function(e)
  {
    // this.data.inputContent[e.currentTarget.id] = e.detail.value;
    var that = this;
    var pnum = e.detail.value;
    that.setData({
      phoneNum: pnum
    });
  },
  //获取验证码
  getConfirm:function(){
    var that = this;
    var phoneNum = that.data.phoneNum;
    if(phoneNum!=""&&phoneNum!=null&&phoneNum!=undefined)
    {
      var sendDataConfirm = {
        "tokenSession": that.data.tokenSession,
        "phoneNum": phoneNum
      }
      util.postAjax("user/getVerifyCodeNotBind", sendDataConfirm, that.confirmCallBack)
    }
    else{
      wx.showToast({
        title: '请输入新的手机号码',
      })
    }
  },
  //获取验证码回调函数
  confirmCallBack:function(json)
  {
    if(json.ret==true)
    {
      //更改获取验证码，变成倒计时
      var that = this;
      that.countDown(that);
    }
    else{
      var msg = json.forUser;
      wx.showToast({
        title: msg,
      })
    }
  },
  //提交验证码和手机号码
  saveTel:function()
  {
    var that = this;
    //手机号码
    var phoneNum = that.data.inputContent.telNum;
    //验证码
    var confirmCode = that.data.confirmCode;
    if (phoneNum==undefined||phoneNum==""||phoneNum==null)
    {
      wx.showToast({
        title: '手机号码不能为空'
      })
    }
    if(confirmCode==undefined||confirmCode==""||confirmCode==null)
    {
      wx.showToast({
        title: '验证码不能为空'
      })
    }
    var sendBindTel={
      "phoneNum": phoneNum,
      "verifyCode": confirmCode,
      "tokenSession": that.data.tokenSession
    }
    util.postAjax("user/bind_phone", sendBindTel,that.callBackBindTel);
  },
  //验证码填写之后
  finishConfirm:function(e)
  {
    var that = this;
    var confirmCode = e.detail.value;
    that.setData({
      confirmCode: confirmCode
    });
  },
  //倒计时用函数
  countDown:function(that)
  {
    var second = that.data.second;
    if (second == 0) {
      that.setData({
        showMsg: "已重新发送验证码",
        second:120
      });
      that.getConfirm();
      return;
    }
    var time = setTimeout(
      function () {
        that.setData({
          second: second - 1
        });
        that.setData({
          showMsg: that.data.second+"秒后重新获取验证码"
        });
        that.countDown(that);
      }
      ,1000
    )
  },
  // 点击保存键之后
  callBackBindTel:function(json)
  {
    var that = this;
    if(json.ret==false)
    {
      that.setData({
        errorMsg:"*"+ json.forUser
      });
    }
    else{
      wx.showToast({
        title: '手机号码绑定成功'
      });
      wx.navigateBack({
        delta: 2
      })
    }
  }
})