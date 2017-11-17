// addressAddOrEdit.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['', '', ''],
    customItem: '全部',
    action: "",
    inputContent: {},
    tokenSession: "",
    addressId: "",
    contactPerson: "",
    contactMobile: "",
    address: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var action = options.action;
    var that = this;
    that.setData({
      action: action
    })
    wx.setNavigationBarTitle({
      title: '编辑收货地址',
    });
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          tokenSession: res.data
        })
      }
    })
    if (action == "add") {
      // 新增状态

    }
    else if (action == "edit") {
      var thisRegion = ['', '', ''];
      thisRegion[0] = options.province
      thisRegion[1] = options.city;
      thisRegion[2] = options.district;
      //修改状态
      that.setData({
        addressId: options.addressId,
        contactPerson: options.contactPerson,
        contactMobile: options.contactMobile,
        address: options.address,
        region: thisRegion
      });

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
  //地址选择器发生变化
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  // 填写完成之后保存
  saveAddress: function () {
    var that = this;
    var action = that.data.action;
    var receive = that.data.inputContent.receiveUser;
    var content = that.data.inputContent.content;
    var address = that.data.inputContent.address;
    var sendSaveAddress;
    //检查是否有空值
    if (receive == null || receive == "" || receive == undefined) {
      if (that.data.contactPerson == null || that.data.contactPerson == "" || that.data.contactPerson == undefined) {
        wx.showToast({
          title: '收货人不能为空'
        });
        return;
      }
      else {
        receive = that.data.contactPerson;
      }
    }
    else if (content == "" || content == null || content == undefined) {
      if (that.data.contactMobile == "" || that.data.contactMobile == null || that.data.contactMobile == undefined) {
        wx.showToast({
          title: '联系方式不能为空'
        });
        return;
      }
      else {
        content = that.data.contactMobile;
      }
    }
    else if (that.data.region[0] == "" || that.data.region[0] == null || that.data.region[0] == undefined) {
      wx.showToast({
        title: '所在区域不能为空'
      })
      return;
    }
    else if (address == "" || address == null || address == undefined) {
      if (that.data.address == "" || that.data.address == null || that.data.address == undefined) {
        wx.showToast({
          title: '详细地址不能空'
        })
        return;
      }
      else {
        address = that.data.address;
      }
    }
    if (action == "add") {
      sendSaveAddress = {
        "tokenSession": that.data.tokenSession,
        "contactPerson": receive,
        "contactMobile": content,
        "address": address,
        "province": that.data.region[0],
        "city": that.data.region[1],
        "district": that.data.region[2]
      }
    }
    else if (action == "edit") {
      sendSaveAddress = {
        "tokenSession": that.data.tokenSession,
        "addressId": that.data.addressId,
        "contactPerson": receive,
        "contactMobile": content,
        "address": address,
        "province": that.data.region[0],
        "city": that.data.region[1],
        "district": that.data.region[2]
      }
    }
    util.postAjax("user/updateAddress", sendSaveAddress, that.saveAddressCallBack)
  },
  //收货人填写完成之后
  receiveChange: function (e) {
    this.data.inputContent[e.currentTarget.id] = e.detail.value;
  },
  //联系方式填写完成之后
  contentChange: function (e) {
    this.data.inputContent[e.currentTarget.id] = e.detail.value;
  },
  // 详细地址填写完成之后
  addressChange: function (e) {
    this.data.inputContent[e.currentTarget.id] = e.detail.value;
  },
  // 保存地址之后的回调函数
  saveAddressCallBack: function (json) {
    var that = this;
    var action = that.data.action;
    if (json.ret == true) {
      if (action == "add") {
        wx.showToast({
          title: '地址新增成功'
        });
        wx.navigateBack({
          delta: 2
        })
      }
      else if (action == "edit") {
        wx.showToast({
          title: '地址修改成功'
        });
        wx.navigateBack({
          delta: 2
        })
      }
    }
  }
})