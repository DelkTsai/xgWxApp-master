// piece.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,//控制是第几页
    tokenSession: "",
    myChange:[],//我的兑换
    inviteCode:"",//邀请码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data
        that.setData({
          tokenSession: token
        });
      }
    });
    var inv = options.inviteCode;
    that.setData({
      inviteCode:inv
    });
    wx.setNavigationBarTitle({
      title: '鞋狗碎片',
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
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTba: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {

    var that = this;
    var current = e.target.dataset.current;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    //判断现在页面上显示的是哪一个页面
    if (current==0)
    {

    }
    else if (current==1)
    {
      //我的兑换
      var token = that.data.tokenSession;
      var myChangeSend = {
        "tokenSession": token
      }
      util.getAjax("chip/exchange_record",myChangeSend,that.myChangeCallBack)
    }
    else if (current==2)
    {

    }
  },
  //转跳到碎片列表
  myPiece:function()
  {
    wx.navigateTo({
      url: 'pieceList'
    })
  },
  //获取我的兑换列表回调函数
  myChangeCallBack:function(json)
  {
    console.log(json);
    var that = this;
    var listData = json.data
    if(json.ret == true)
    {
      var list = listData;
      that.setData({
        myChange: list
      })
    }
   
  },
  //点击请求碎片
  askPiece:function()
  {
    var that = this;
    var inv = that.data.inviteCode;
    wx.navigateTo({
      url: 'askPiece?inviteCode='+inv,
    })
  },
  //跳到交换碎片
  exchangePiece:function()
  {
    var that= this
    wx.navigateTo({
      url: 'exchangePiece',
    })
  },
  // 跳转到碎片商城
  chipMall:function()
  {
    wx.navigateTo({
      // url: 'chipMall',
      url: 'changePieceList',
    })
  }
})