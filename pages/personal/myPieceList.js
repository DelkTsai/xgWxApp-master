// pages/personal/chipList.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession: "",
    chipli: "",//碎片列表
    inviteCode: "",//邀请码
    showModalStatus: false, //弹窗用
    hidden: true,//弹窗用
    goodsImg: "",
    goodsName: "",
    chipDetail: "",
    chipId: "",
    attrId: "",//点击选择的碎片
    maskst: "background-color:rgba(255,255,255,0.7);",//样式文件
    masknd: "background-color:rgba(255,255,255,0.7);",
    maskrd: "background-color:rgba(255,255,255,0.7);",
    maskth: "background-color:rgba(255,255,255,0.7);",
    index:"",//位置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的碎片',
    });
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data
        that.setData({
          tokenSession: token
        });
        var sendData = {
          "chipType": '1',
          "keyWord": "",
          "tokenSession": token
        }
        util.getAjax("chip/", sendData, that.chipListCallBack);
      }
    });
    var ivt = options.inviteCode;
    that.setData({
      inviteCode: ivt
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
  // 获取碎片列表的回调
  chipListCallBack: function (json) {
    var that = this;
    console.log(json);
    var datal = json.data.goods
    that.setData({
      chipli: datal
    });
  },
  //弹窗函数
  powerDrawer: function (e) {
    var that = this;
    var currentStatu = e.currentTarget.dataset.statu;
    var confirm = e.currentTarget.dataset.confirm
    var goodsImgp = e.currentTarget.dataset.goodsImg;
    var chipDetailp = e.currentTarget.dataset.chipDetail;
    var chipIdp = e.currentTarget.dataset.chipId;
    var goodsNamep = e.currentTarget.dataset.goodsName;
    // var mask = ["background-color: rgba(255, 255, 255, 0.7);", "background-color: rgba(255, 255, 255, 0.7);", "background-color: rgba(255, 255, 255, 0.7);", "background-color: rgba(255, 255, 255, 0.7);"];
    this.util(currentStatu, confirm);
    this.setData({
      hidden: !that.data.hidden
    });
    if (currentStatu == "open") {
      that.setData({
        goodsImg: goodsImgp,
        chipDetail: chipDetailp,
        chipId: chipIdp,
        goodsName: goodsNamep
      })
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
        this.setData(
          {
            showModalStatus: false
          }
        );
        if (confirm == "close") {
          that.setData({
            attrId: "",
            maskst: "background-color:rgba(255,255,255,0.7);",//样式文件
            masknd: "background-color:rgba(255,255,255,0.7);",
            maskrd: "background-color:rgba(255,255,255,0.7);",
            maskth: "background-color:rgba(255,255,255,0.7);"
          });
        }
        else if (confirm == "confirm") {
          var attr = that.data.attrId;
          if (attr == "" || attr == undefined) {
            wx.showToast({
              title: '请选择需要交换的碎片'
            });
          }
          else {
            var ivt = that.data.inviteCode;
            var atid = that.data.attrId;
            var img = that.data.goodsImg;
            var name = that.data.goodsName;
            var ind = that.data.index;
            wx.redirectTo({
              url: 'exchangePiece?inviteCode=' + ivt + "&attrId=" + atid + "&midImage=" + img + "&goodsName=" + name+"&index="+ind,
            })
          }
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
  //弹出框遮罩点击事件
  clickMask: function (event) {
    var that = this;
    var indexp = event.currentTarget.dataset.index;
    var attrIdp = event.currentTarget.dataset.attrId;
    switch (indexp) {
      case "1":
        that.setData({
          maskst: "background-color:rgba(255,255,255,0);",//样式文件
          masknd: "background-color:rgba(255,255,255,0.7);",
          maskrd: "background-color:rgba(255,255,255,0.7);",
          maskth: "background-color:rgba(255,255,255,0.7);",
          index:indexp,
          attrId: attrIdp
        });
        break;
      case "2":
        that.setData({
          maskst: "background-color:rgba(255,255,255,0.7);",//样式文件
          masknd: "background-color:rgba(255,255,255,0);",
          maskrd: "background-color:rgba(255,255,255,0.7);",
          maskth: "background-color:rgba(255,255,255,0.7);",
          index: indexp,
          attrId: attrIdp
        });
        break;
      case "3":
        that.setData({
          maskst: "background-color:rgba(255,255,255,0.7);",//样式文件
          masknd: "background-color:rgba(255,255,255,0.7);",
          maskrd: "background-color:rgba(255,255,255,0);",
          maskth: "background-color:rgba(255,255,255,0.7);",
          index: indexp,
          attrId: attrIdp
        });
        break;
      case "4":
        that.setData({
          maskst: "background-color:rgba(255,255,255,0.7);",//样式文件
          masknd: "background-color:rgba(255,255,255,0.7);",
          maskrd: "background-color:rgba(255,255,255,0.7);",
          maskth: "background-color:rgba(255,255,255,0);",
          index: indexp,
          attrId: attrIdp
        });
        break;
    }
  }
})