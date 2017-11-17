// pieceList.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession: "",
    itemList: [],//页面循环
    score: 0,//剩余积分
    showModalStatus: false, //弹窗用
    hidden: true,//弹窗用
    popImage: "",//弹出图片的url
    popName:"",
    popAttr:"",
    popId:"",
    chipDetail: [],//弹出碎片的id和数量
    topleft: "",
    topright: "",
    bottomleft: "",
    bottomright: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的碎片'
    });
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data;
        var sendChip = {
          "tokenSession": token,
          "chipType": "1"
        }
        that.setData({
          tokenSession: token
        })
        util.getAjax("chip/", sendChip, that.chipCallBack);
      },
      fail: function (res) { },
      complete: function (res) { },
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
  //获取碎片列表的回调
  chipCallBack: function (json) {
    var that = this;
    var ite = []
    if (json.ret == true) {
      for (var i = 0; i < json.data.goods.length; i++) {
        ite.push(json.data.goods[i]);
      }
    }
    var scorep = json.data.score;
    that.setData({
      itemList: ite,
      score: scorep
    })
  },
  // 点击显示弹窗
  powerDrawer: function (e) {
    var that = this;
    var currentStatu = e.currentTarget.dataset.statu;
    var confirm = e.currentTarget.dataset.confirm;
    this.util(currentStatu, confirm);
    this.setData({
      hidden: !that.data.hidden
    })
    if (e.currentTarget.dataset.statu == 'open') {
      var index = e.currentTarget.dataset.index;
      var chipDetailp = e.currentTarget.dataset.chipDetail;
      var goodsImg = e.currentTarget.dataset.goodsImg;
      var goodsAttr = e.currentTarget.dataset.attr;
      var goodsName = e.currentTarget.dataset.goodsName;
      var goodsId = e.currentTarget.dataset.goodsId;
      that.setData({
        popImage: goodsImg,
        chipDetail: chipDetailp,
        popName: goodsName,
        popAttr: goodsAttr ,
        popId: goodsId
      });
    }
  },
  util: function (currentStatu, confirm) {
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
        if (confirm == "confirm"){
          this.setData(
            {
              showModalStatus: false
            }
          );
          var goodsId = that.data.popId;
          var goodsImg = that.data.popImage;
          var goodsAttr = that.data.popAttr;
          var goodsName = that.data.popName;
          wx.navigateTo({
            url: 'addressSelect?goodsId=' + goodsId + "&goodsImg=" + goodsImg + "&goodsAttr=" + JSON.stringify(goodsAttr) + "&goodsName=" + goodsName
          })
        }
        else if (confirm =="close"){

        }
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
  
  // 遮罩层点击事件
  // clickCover: function (event) {
  //   var that = this;
  //   var pos = event.currentTarget.dataset.pos;//碎片位置
  //   var count = event.currentTarget.dataset.count;//碎片个数
  //   var chipId = event.currentTarget.dataset.chipId;//碎片id
  //   switch (pos) {
  //     case "topleft":
  //       if (count > 0) {
  //         // var countp = count-1;
  //         that.setData({
  //           topleft: "background-color:rgba(247, 247, 247, 0);",
  //           topright: "background-color:rgba(247, 247, 247, 0.7);",
  //           bottomleft: "background-color:rgba(247, 247, 247, 0.7);",
  //           bottomright: "background-color:rgba(247, 247, 247, 0.7);"
  //         });
  //       } else {
  //         wx.showToast({
  //           title: '该碎片剩余数量不足'
  //         });
  //       }
  //       break;
  //     case "topright":
  //       if (count > 0) {
  //         that.setData({
  //           topleft: "background-color:rgba(247, 247, 247, 0.7);",
  //           topright: "background-color:rgba(247, 247, 247, 0);",
  //           bottomleft: "background-color:rgba(247, 247, 247, 0.7);",
  //           bottomright: "background-color:rgba(247, 247, 247, 0.7);"
  //         });
  //       } else {
  //         wx.showToast({
  //           title: '该碎片剩余数量不足'
  //         });
  //       }
  //       break;
  //     case "bottomleft":
  //       if (count > 0) {
  //         that.setData({
  //           topleft: "background-color:rgba(247, 247, 247, 0.7);",
  //           topright: "background-color:rgba(247, 247, 247, 0.7);",
  //           bottomleft: "background-color:rgba(247, 247, 247, 0);",
  //           bottomright: "background-color:rgba(247, 247, 247, 0.7);"
  //         });
  //       } else {
  //         wx.showToast({
  //           title: '该碎片剩余数量不足'
  //         });
  //       }
  //       break;
  //     case "bottomright":
  //       if (count > 0) {
  //         that.setData({
  //           topleft: "background-color:rgba(247, 247, 247, 0.7);",
  //           topright: "background-color:rgba(247, 247, 247, 0.7);",
  //           bottomleft: "background-color:rgba(247, 247, 247, 0.7);",
  //           bottomright: "background-color:rgba(247, 247, 247, 0);"
  //         });
  //       } else {
  //         wx.showToast({
  //           title: '该碎片剩余数量不足'
  //         });
  //       }
  //       break;
  //   }
  // }
  
})