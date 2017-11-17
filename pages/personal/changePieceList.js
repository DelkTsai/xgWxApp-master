// changePieceList.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession: "",
    scorep: 0,//用户的总积分
    showModalStatus: false, //弹窗用
    hidden: true,//弹窗用
    pieceList:[],//碎片列表
    popChipDetail:[],//弹窗碎片详细
    popGoodsImg:"",//弹窗商品图片
    popChipId:"",//弹窗的chipid
    popWord:"",//弹出窗的显示兑换积分
    popMask:[],//弹出的遮罩样式
    sendAttrId:"",//选择的碎片的属性id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '兑换碎片',
    });
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data
        var sendList = {
          "tokenSession": token
        }
        that.setData({
          "tokenSession": token
        })
        util.getAjax("chip/goods", sendList, that.pieceCallBack);
      },
      fail: function (res) { },
      complete: function (res) { },
    });
    var score = options.score;
    that.setData({
      scorep: score
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
  //获取可兑换碎片回调
  pieceCallBack:function(json)
  {
    var that = this;
    var dataList = json.data;
    that.setData({
      pieceList:dataList
    });
  },
  // 点击显示弹窗
  powerDrawer: function (e) {
    var that = this;
    var currentStatu = e.currentTarget.dataset.statu;
    var goodsImg = e.currentTarget.dataset.goodsImg;
    var chipDetail = e.currentTarget.dataset.chipDetail;
    var chipId = e.currentTarget.dataset.chipId;
    var confirm = e.currentTarget.dataset.confirm;
    var mask = ["background-color: rgba(255, 255, 255, 0.7);", "background-color: rgba(255, 255, 255, 0.7);", "background-color: rgba(255, 255, 255, 0.7);","background-color: rgba(255, 255, 255, 0.7);"];
    this.util(currentStatu, confirm);
    this.setData({
      hidden: !that.data.hidden
    });
    if (currentStatu == "open") {
     that.setData({
       popChipDetail: chipDetail,//弹窗碎片详细
       popGoodsImg: goodsImg,//弹窗商品图片
       popChipId: chipId,//弹窗的chipid
       popMask: mask,
       popWord:"",
       sendAttrId:""
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
        this.setData(
          {
            showModalStatus: false
          }
        );
        if (confirm =="confirm")
        {
          if (that.data.sendAttrId == "") {
            wx.showToast({
              title: '请选择碎片'
            });
          }
          else{
            var chipIdp = that.data.popChipId;
            var attrIdp = that.data.sendAttrId;
            var token = that.data.tokenSession;
            var sendData = {
              "tokenSession":token,
              "chipId":chipIdp,
              "attrId": attrIdp
            }
            util.postAjax("chip/exchange_chip",sendData,that.changePCallBack);
          }
        }
        else if (confirm =="delete")
        {

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
  //点击碎片位置
  clickChip:function(event)
  {
    var attrId = event.currentTarget.dataset.attrId;
    var count = event.currentTarget.dataset.count;
    var score = event.currentTarget.dataset.score;
    var local = event.currentTarget.dataset.local;
    var mask = ["","","",""];
    var word = "";
    var attr="";
    var that = this;
    if(count>0)
    {
      switch (local) {
        case "1":
          //左上
          mask[0] ="background-color: rgba(255, 255, 255, 0);";
          mask[1] = "background-color: rgba(255, 255, 255, 0.7);";
          mask[2] = "background-color: rgba(255, 255, 255, 0.7);";
          mask[3] = "background-color: rgba(255, 255, 255, 0.7);";
          word = score+"积分兑换商品";
          attr = attrId;
          break;
        case "2":
          //右上
          mask[0] = "background-color: rgba(255, 255, 255, 0.7);";
          mask[1] = "background-color: rgba(255, 255, 255, 0);";
          mask[2] = "background-color: rgba(255, 255, 255, 0.7);";
          mask[3] = "background-color: rgba(255, 255, 255, 0.7);";
          word = score + "积分兑换商品";
          attr = attrId;
          break;
        case "3":
          //左下
          mask[0] = "background-color: rgba(255, 255, 255, 0.7);";
          mask[1] = "background-color: rgba(255, 255, 255, 0.7);";
          mask[2] = "background-color: rgba(255, 255, 255, 0);";
          mask[3] = "background-color: rgba(255, 255, 255, 0.7);";
          word = score + "积分兑换商品";
          attr = attrId;
          break;
        case "4":
          //右下
          mask[0] = "background-color: rgba(255, 255, 255, 0.7);";
          mask[1] = "background-color: rgba(255, 255, 255, 0.7);";
          mask[2] = "background-color: rgba(255, 255, 255, 0.7);";
          mask[3] = "background-color: rgba(255, 255, 255, 0);";
          word = score + "积分兑换商品";
          attr = attrId;
          break;
      }
      that.setData({
        popMask:mask,
        popWord:word,
        sendAttrId:attr
      });
    }
    else{
      wx.showToast({
        title: '该碎片没有剩余，请选择另外一个碎片'
      })
    }
  },
  //选取碎片之后的保存
  changePCallBack:function(json)
  {
    wx.showToast({
      title: '兑换成功'
    })
    wx.navigateBack({
      delta:2
    })
  }
})