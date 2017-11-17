// pages/personal/myPieceListForExChange.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    extraId:"",
    tokenSession:"",
    dataList:"",//数据列表
    showModalStatus: false, //弹窗用
    hidden: true,//弹窗用,
    goodsId:"",
    goodsImg:"",
    goodsName:"",
    chipDetail:"",
    attrId:"",
    index:"",
    extraId:"",
    maskst:"background-color:rgba(255,255,255,0.7)",
    masknd:"background-color:rgba(255,255,255,0.7)",
    maskrd:"background-color:rgba(255,255,255,0.7)",
    maskth:"background-color:rgba(255,255,255,0.7)" 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var extraIdp = options.extraId;
    that.setData({
      extraId: extraIdp
    });
    wx.setNavigationBarTitle({
      title: '我的碎片',
    });
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data
        that.setData({
          tokenSession: token,
        });
        var sendData = {
          "tokenSession": token,
          "chipType": '1'
        }
        util.postAjax("chip/", sendData, that.myListCallBack);
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
  //获取到碎片列表的回调函数
  myListCallBack:function(json)
  {
    var that =this;
    if(json.ret==true)
    {
      var data = json.data.goods;
      that.setData({
        dataList:data,
      });
    }
  },
  //弹窗函数
  powerDrawer: function (e) {
    var that = this;
    var currentStatu = e.currentTarget.dataset.statu;
    var confirm = e.currentTarget.dataset.confirm;
    var goodsImgp = e.currentTarget.dataset.goodsImg;
    var chipDetailp = e.currentTarget.dataset.chipDetail;
    var goodsIdp = e.currentTarget.dataset.goodsId;
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
        goodsName:goodsNamep,
        goodsId:goodsIdp
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

        }
        else if (confirm == "confirm")
        {
          // goodsId: "",
          //   goodsImg:"",
          //     goodsName:"",
          //       chipDetail:"",
          //         attrId:"",
          //           index:"",
          var goodsId = that.data.goodsId;
          var goodsImg = that.data.goodsImg;
          var goodsName = that.data.goodsName;
          var attrId = that.data.attrId;
          var index = that.data.index;
          var extraId = that.data.extraId;
          if(attrId!="")
          {
            wx.navigateTo({
              url: 'confrimExchange?mgoodsId=' + goodsId + "&mgoodsImg=" + goodsImg + "&mgoodsName=" + goodsName + "&mattrId=" + attrId + "&mindex=" + index + "&extraId=" + extraId,
            });
          }
          else {
            wx.showToast({
              title: '请选择需要的图片',
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
  //点击遮罩层的响应事件
  clickMask:function(event)
  {
    var that = this;
    var attrIdp = event.currentTarget.dataset.attrId;
    var indexp = event.currentTarget.dataset.index;
    switch(indexp)
    {
      case '1':
        that.setData({
          attrId: attrIdp,
          index: indexp,
          maskst: "background-color:rgba(255,255,255,0)",
          masknd: "background-color:rgba(255,255,255,0.7)",
          maskrd: "background-color:rgba(255,255,255,0.7)",
          maskth: "background-color:rgba(255,255,255,0.7)" 
        });
        break;
      case '2':
        that.setData({
          attrId: attrIdp,
          index: indexp,
          maskst: "background-color:rgba(255,255,255,0.7)",
          masknd: "background-color:rgba(255,255,255,0)",
          maskrd: "background-color:rgba(255,255,255,0.7)",
          maskth: "background-color:rgba(255,255,255,0.7)"
        });
        break;
      case '3':
        that.setData({
          attrId: attrIdp,
          index: indexp,
          maskst: "background-color:rgba(255,255,255,0.7)",
          masknd: "background-color:rgba(255,255,255,0.7)",
          maskrd: "background-color:rgba(255,255,255,0)",
          maskth: "background-color:rgba(255,255,255,0.7)"
        });
        break;
      case '4':
        that.setData({
          attrId: attrIdp,
          index: indexp,
          maskst: "background-color:rgba(255,255,255,0.7)",
          masknd: "background-color:rgba(255,255,255,0.7)",
          maskrd: "background-color:rgba(255,255,255,0.7)",
          maskth: "background-color:rgba(255,255,255,0)"
        });
        break;
    }
  }
})