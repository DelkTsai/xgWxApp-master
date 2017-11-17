// address.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession: "",
    hiddenValue: "",
    itemList: [],
    shuzu: [],
    startX: 0, //开始坐标
    startY: 0
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
        var sendAddress = {
          "tokenSession": token
        }
        that.setData({
          tokenSession: token
        })
        util.getAjax("user/myAdressList", sendAddress, that.addressCallBack);
      },
      fail: function (res) { },
      complete: function (res) { },
    });
    wx.setNavigationBarTitle({
      title: '收货地址'
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
  // 第一次获取到的回调
  addressCallBack: function (json) {
    var that = this;
    if (json.ret == true) {
      if (json.data.length == 0) {
        that.setData({
          hiddenValue: ""
        });
      }
      else {
        that.setData({
          hiddenValue: "hidden"
        });
        for (var i = 0; i < json.data.length; i++) {
          that.data.shuzu.push(
            {
              data: json.data[i],
              isTouchMove: false

            });
        }
        that.setData({
          itemList: that.data.shuzu
        });
      }
    }
  },
  // 转跳至新增或修改地址页面
  newAddress: function () {
    wx.navigateTo({
      url: 'addressAddOrEdit?action=add'
    })
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.itemList.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
  
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      iteitemListms: this.data.itemList
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.itemList.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      itemList: that.data.itemList
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //转跳到更新地址页面
  editAddress:function(event)
  {
    var addressId = event.currentTarget.dataset.addressId;
    var contactPerson = event.currentTarget.dataset.contactPerson;
    var contactMobile = event.currentTarget.dataset.contactMobile;
    var province = event.currentTarget.dataset.province;
    var city = event.currentTarget.dataset.city;
    var district = event.currentTarget.dataset.district;
    var address = event.currentTarget.dataset.address;
    wx.navigateTo({
      url: 'addressAddOrEdit?action=edit&addressId=' + addressId + "&contactPerson=" + contactPerson + "&contactMobile=" + contactMobile+
      "&province=" + province + "&city=" + city + "&district=" + district + "&address=" + address
    })
  },
  // 删除某个地址
  delAddress:function(event)
  {
    var that = this;
    var addressId = event.currentTarget.dataset.addressId;
    var sendDeleteAddress = {
      "tokenSession": that.data.tokenSession,
      "addressId":addressId
    }
    util.postAjax("user/delAddress",sendDeleteAddress,that.deleteAddressCallBack);
  },
  // 删除地址回调函数
  deleteAddressCallBack:function(json)
  {
    if(json.ret==true)
    {
      wx.showToast({
        title: '删除地址成功'
      });
      wx.navigateBack({
        delta:1
      })
    }
  }
})