// pages/index/qiangxie/qiangxie.js
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    currentPage:0
    ,dataList:""
    ,windowWidth:0
    ,windowHeight:0
    ,_type:null
    ,_goodsId:null
    ,paiMingList:null
    ,showModalBg:false
    ,showPaiMingModal:false
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this;
  console.log(options);
  wx.getSystemInfo({
    success: function(res) {
      that.data.windowHeight = res.windowHeight;
      that.data.windowWidth = res.windowWidth;
      that.setData({
        windowWidth: that.data.windowWidth
        , windowHeight: that.data.windowHeight
   
      });
    },
  });
  this.setData({
    _goodsId : options.goodsId
    , _type:options.type
  });
  var title = "";
  if (this.data._type == "3") {
    title = "球鞋发售";
  } else if (this.data._type == "2") {
    title = "每周抢鞋";
  }
  wx.setNavigationBarTitle({
    title: title,
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
    this.getContent(this.data._type, this.data._goodsId);
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
  getContent(_type,_goodsId){
    var para={
      "goodsId":_goodsId
    };
    if(_type=="3"){
      util.postAjax("home/sell", para, this.getContnetCallback);
    }else if(_type==2){
      util.postAjax("home/week", para, this.getContnetCallback);
    }
  }
  ,getContnetCallback(json){
    console.log(json);
    if(json.ret){
      this.data.dataList = json.data;
    }

    this.setData({
      dataList:this.data.dataList
    })
  }
  ,onItemClick(event){
    var goodsId = event.currentTarget.dataset.goodsId;
    var isOver = event.currentTarget.dataset.isOver;
    if("1"==isOver){
      this.setData({
        showModalBg:true
        ,showPaiMingModal:true
      })
      this.getResult(this.data._type, goodsId);
    }else{
      wx.navigateTo({
        url: 'xiangqing?type=' + this.data._type + "&goodsId=" + goodsId,
      })
    }
  }
  //获取抽奖结果  type==3代表球鞋发售，2代表每周抢鞋
  ,getResult(_type,_goodsId){
    util.getAjax("home/history_winner?type=" + _type+"&goodsId="+_goodsId, "", this.getResultCallback);
  }
  ,getResultCallback(json){
      this.setData({
        paiMingList: json.data
      })
    // }
  }
  ,hideModal(event){
    this.setData({
      showModalBg: false
      , showPaiMingModal: false
    });
  }


})