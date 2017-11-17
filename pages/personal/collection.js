// collection.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    tookenSession:"",
    shoeList:[],
    shuzu:[],
    lastId:"",
    showWindowHeight:'',//屏幕高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的收藏'
    });
    // 获取商城第一次数据
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data
        that.setData({
          tokenSession: token
        });
        var sendFirstPage = {
          "tokenSession": res.data,
          "lastId": "",
          "type":"1"
        }
        util.getAjax("user/get_collection", sendFirstPage, that.sendFirstPageCallBack);
      }
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
        var he = res.windowHeight-46;
        that.setData({
          showWindowHeight: he
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
    var that = this;
    var sendButoomData;
    if (that.data.currentTab==0)
    {
      //商场商品
      var last = that.data.lastId
      sendButoomData={
        "tokenSession": that.data.tokenSession,
        "type":"1",
        "lastId":last
      }
      util.getAjax("user/get_collection",sendButoomData,that.lastIdCallBack);
    }
    else if (that.data.currentTab == 1)
    {
      //团购商品
    }
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
    var sendSidle;
    if (e.detail.current=='0')
    {
      //商城商品
      console.log(e.detail.current);
      that.data.shuzu = [];
      sendSidle={
        "tokenSession":that.data.tokenSession,
        "lastId": "",
        "type":'1'
      }
      util.getAjax("user/get_collection", sendSidle, that.sendFirstPageCallBack);
    }
    else if (e.detail.current=='1')
    {
      //团购商品
      console.log(e.detail.current);
      that.data.shuzu = [];
      sendSidle = {
        "tokenSession": that.data.tokenSession,
        "lastId": "",
        "type": '2'
      }
      util.getAjax("user/get_collection", sendSidle, that.sendFirstPageCallBack);
    }
  },
  //点击切换
  clickTab: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    var sendSidle;
    if (e.target.dataset.current=='0')
    {
        //商城商品
      console.log(e.target.dataset.current);
      that.data.shuzu = [];
      sendSidle = {
        "tokenSession": that.data.tokenSession,
        "lastId": "",
        "type": '1'
      }
      util.getAjax("user/get_collection", sendSidle, that.sendFirstPageCallBack);
    }
    else if (e.target.dataset.current=='1')
    {
        //团购商品
      console.log(e.target.dataset.current);
      that.data.shuzu = [];
      sendSidle = {
        "tokenSession": that.data.tokenSession,
        "lastId": "",
        "type": '2'
      }
      util.getAjax("user/get_collection", sendSidle, that.sendFirstPageCallBack);
    }
  },
  // 加载事件时的第一次获取商场信息
  sendFirstPageCallBack:function(json){
    console.log(json);
    var that  = this;
    that.data.shuzu=[];
    if(json.ret==true){
      for (var i = 0; i < json.data.length; i++) {
        if (i == json.data.length - 1) {
          var last = json.data[i].collectionId
          that.setData({
            lastId: last
          })
        }
        that.data.shuzu.push(json.data[i]);
      }
      that.setData({
        shoeList: that.data.shuzu
      });
    }
    
  },
  //获取了最后的id之后
  lastIdCallBack:function(json)
  {
    var that = this;
    that.data.shuzu=[];
    if(json.ret==true)
    {
      for (var i = 0; i < json.data.length; i++) {
        if (i == json.data.length - 1) {
          var last = json.data[i].collectionId
          that.setData({
            lastId: last
          })
        }
        that.data.shuzu.push(json.data[i]);
      }
      that.setData({
        shoeList: that.data.shuzu
      });
    }
  },
  // 转跳到商品详情
  jumpCollection:function(event)
  {
    var goodsId = event.currentTarget.dataset.goodsId
    var dataType = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: 'collectionDetail?goodsId=' + goodsId+"&type="+dataType
    })
  }
})