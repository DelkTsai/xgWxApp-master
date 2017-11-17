// pieceConfirm.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession: "",
    addressId: "",
    contactMobile: "",
    contactPerson: "",
    province: "",
    city: "",
    district: "",
    address: "",
    goodsId: "",
    goodsImg: "",
    goodsName: "",
    goodsAttr: "",
    initImage: "",//页面下拉箭头弹出属性
    showModalStatus: false, //弹窗用
    hidden: true,//弹窗用
    sendArray: [],//提交数据用
    shuzu: [],
    shuzuName: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取全部字段
    var addressIdp = options.addressId
    var contactMobilep = options.contactMobile
    var contactPersonp = options.contactPerson
    var provincep = options.province
    var cityp = options.city
    var districtp = options.district
    var addressp = options.address
    var goodsIdp = options.goodsId
    var goodsImgp = options.goodsImg
    var goodsNamep = options.goodsName
    var goodsAttrp = JSON.parse(options.goodsAttr)
    
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data
        that.setData({
          tokenSession: token
        });
      },
      fail: function (res) { },
      complete: function (res) { },
    });

    that.setData({
      addressId: addressIdp,
      contactMobile: contactMobilep,
      contactPerson: contactPersonp,
      province: provincep,
      city: cityp,
      district: districtp,
      address: addressp,
      goodsId: goodsIdp,
      goodsImg: goodsImgp,
      goodsName: goodsNamep,
      goodsAttr: goodsAttrp,
      initImage: "../../utils/image/personal/btn_down.png"
    });
    
    wx.setNavigationBarTitle({
      title: '选择兑换商品属性'
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
  powerDrawer: function (e) {
    var that = this;
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu);
    this.setData({
      hidden: !that.data.hidden
    })
    if (e.currentTarget.dataset.statu == 'close') {
     //把数据提交到服务器
      var tokenSession = that.data.tokenSession;
      var goodsAttr = JSON.stringify(that.data.sendArray);
      var addressId = that.data.addressId;
      var goodsId = that.data.goodsId;
      var goodsName = that.data.goodsName;
      var goodsImg = that.data.goodsImg;
      
      var sendData = {
        "tokenSession": tokenSession,
        "addressId": addressId,
        "goodsAttr": goodsAttr,
        "goodsId": goodsId,
        "goodsName": goodsName,
        "goodsImg": goodsImg
      }
      util.postAjax("chip/exchange_goods",sendData,that.cxChangeCalleBack);
    }
  },
  //兑换商品的回调函数
  cxChangeCalleBack:function(json)
  {
    if(json.ret==true)
    {
      wx.showToast({
        title: '兑换商品成功'
      });
      wx.navigateBack({
        delta: 3
      })
    }
  },
  util: function (currentStatu) {
    /* 动画部分 */
    var that = this;
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  //属性点击事件
  clickPara: function (event) {
    var that = this;
    var item = event.currentTarget.dataset.item;
    var content = event.currentTarget.dataset.paraContent;
    var name = event.currentTarget.dataset.name;
    var puse = {
      paraType: item,
      value: content
    }
    if (that.data.shuzuName.length == 0) {
      that.data.shuzu.push(puse);
      that.data.shuzuName.push(name);
    }
    else {
      for (var i = 0; i < that.data.shuzuName.length; i++) {
        if (name == that.data.shuzuName[i]) {
          that.data.shuzu[i] = puse;
        }
        else {
          if (i == that.data.shuzuName.length) {
            that.data.shuzu.push(puse);
            that.data.shuzuName.push(name);
          }
        }
      }
    }
    that.setData({
      sendArray: that.data.shuzu
    });
    wx.showToast({
      title: '商品属性选择成功'
    })
  }
})