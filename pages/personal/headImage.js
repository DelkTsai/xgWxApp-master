// headImage.js
var Upyun = require('../../utils/upyun-wxapp-sdk.js');
var upyun = new Upyun({
  bucket: 'testimgs',
  operator: 'sunny',
  getSignatureUrl: 'http://192.168.3.16/shoedog/api/upyun'
})
var home = require('personHome.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:"",
    actionSheetHidden:true,
    tokenSession:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      imageUrl: options.imageUrl
    });
     //显示选择框
     this.setData({
       actionSheetHidden: !this.data.actionSheetHidden
     });
     wx.setNavigationBarTitle({
       title: '用户头像'
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
  //关闭下方弹出框
  listenerActionSheet:function()
  {
      this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },
  //打开相册选取文件
  openAlbum:function()
  {
    var that = this;
    var token = that.data.tokenSession;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        // var tempFile = res.tempFiles;
        // console.log(tempFilePaths);
        // console.log(tempFile);
        wx.uploadFile({
          url: 'http://192.168.3.16/shoedog/api/user/modifyMsg', //仅为示例，非真实的接口地址
          // url: 'http://119.23.66.37/shoedog/api/user/modifyMsg',
          filePath: tempFilePaths[0],
          name: 'modifyContent',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: {
            'modifyType': '0',
            'tokenSession':token,
            "modifyContent": tempFilePaths[0],
          },
          success: function (res) {
            var data = res.data
            //do something
            // console.log(res);
            wx.navigateBack({
              delta: 2
            });
           
          },
          fail:function(res)
          {
            console.log(res);
          }
        })
      }
    });
  },
  // 打开摄像头获取文件
  openCamera:function()
  {
    var that = this;
    var token = that.data.tokenSession;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        // var tempFile = res.tempFiles;
        // console.log(tempFilePaths);
        // console.log(tempFile);
        wx.uploadFile({
          url: 'http://192.168.3.16/shoedog/api/user/modifyMsg', //仅为示例，非真实的接口地址
          // url: 'http://119.23.66.37/shoedog/api/user/modifyMsg',
          filePath: tempFilePaths[0],
          name: 'modifyContent',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: {
            'modifyType': '0',
            'tokenSession': token,
            "modifyContent": tempFilePaths[0],
          },
          success: function (res) {
            var data = res.data
            //do something
            // console.log(res);
            wx.navigateBack({
              delta: 2
            });

          },
          fail: function (res) {
            console.log(res);
          }
        })
      }
    });
  }
})