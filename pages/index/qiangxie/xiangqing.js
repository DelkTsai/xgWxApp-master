// pages/index/qiangxie/xiangqing.js
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:null
    ,_goodsId:null
    , _type: null
    ,guiZeData:null
    , showModalBg:false
    , showFenShuModal:false
    , windowWidth:0
    , windowHeight:0
    ,clickCount:0
    ,selMaShu:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.data._type = options.type;
    this.data._goodsId = options.goodsId;
    this.setData({
      _type: this.data._type 
      , _goodsId: this.data._goodsId
    });

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowWidth: res.windowWidth
          , windowHeight:res.windowHeight
        })
      },
    })
    var title="";
    if (this.data._type=="3"){
      title="球鞋发售";
    } else if (this.data._type == "2"){
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
    this.getXiangQing();

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
    return {
      title: '鞋狗',
      path: '/page/index/collectionDetail?goodsId=' + that.data.dataList.goodsId + "&type=1",
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功'
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败'
        })
      }
    }
  }
  ,getXiangQing(){
    // var para={
    //   "type":"2"
    //   , goodsId:"0545dbd6a4e111e7a23a00163e08518f"
    // };
    var para = {
      "type": this.data._type
      , goodsId: this.data._goodsId
    };
    util.getAjax("home/goods_detail", para, this.getXiangQingCallback);
  }
  ,getXiangQingCallback(json){
    console.log(json);
    if(json.ret){
        this.setData({
          dataList: json.data
        });
    }
  }
  //分享
  ,onShareClick(event){
    wx.showToast({
      title: '点击右上角分享',
    });
  }
  //客服
  ,onKeFuClick(event){

  }
  //规则
  ,onGuiZeClick(event){
    var thar = this;
    if (this.data.guiZeData!=null){
      this.showGuiZeModal(this.data.guiZeData);

    }else{
      this.getGuize();
    }
  
  }
  ,getGuize(event){
    var para={
      "type": this.data._type
    }
    // var para = {
    //   "type": "1"
    // }
    util.getAjax("home/rule", para, this.getGuiZeCallback);

  }
  ,getGuiZeCallback(json){
    if(json.ret){
      this.data.guiZeData = json.data;
      this.showGuiZeModal(json.data);
    }
  }
  //显示规则对话框
  ,showGuiZeModal(guize){
    wx.showModal({
      title: '',
      content: guize.content,
    })
  }
  //购买
  ,onBuyClick(event){
    var that = this;

    var token = wx.getStorageSync("token");
    var para  = {
      "tokenSession":token
      , goodsId: that.data._goodsId
    }
    if (that.data._type=="3")
    {
      util.postAjax("sell/check_qualification", para, that.checkQualifiCallback);
    } else if (that.data._type == "2"){
      util.postAjax("week/check_qualification", para, that.checkQualifiCallback);
    }
     
  }
  //结果查询回调
  ,checkQualifiCallback(json){
      console.log(json);
      if(json.ret){
        // check ： 1：未进行次活动，2：已经保存了成绩，id：未保存成绩，根据这个id直接跳入支付界面
        // json.data.check="2";
        if(json.data.check=="1"){
          this.setData({
            showModalStatus:true
          })
        } else if (json.data.check == "2"){
          this.data.clickCount = json.data.performance;
       

          this.setData({
            clickCount: this.data.clickCount
          });
          this.showFenShuDialog();
        } else{
          //跳订单 
          wx.navigateTo({
            url: 'submitOrder?performanceId='+json.data.check+"&type="+this.data._type,
          });
        }
      }
  }
  //生成订单
  ,createOrder(){
    var url = "";
    var attr ;
    if (this.data.selMaShu!=null){
      attr = [{
        content: this.data.selMaShu.paraDesc
        , "paraType": "1"
      }];
    }else{
      attr=[];
    }
    var token = wx.getStorageSync("token");
    var para = {
      goodsId:this.data._goodsId
      ,goodsName: this.data.dataList.goodsName
      , goodsImg: this.data.dataList.showImg[0]
      , goodsAttr: JSON.stringify(attr)
      , shareStatus:"0"
      , tokenSession: token
    };
    if (this.data._type == "3") {
      url ="sell/create_order";
    } else if (this.data._type == "2") {
      url = "week/create_order";
    }
    util.postAjax(url, para, this.createOrderCallback);

  }
  //生成订单回调
  ,createOrderCallback(json){
    if(json.ret){
      //跳订单 
      wx.navigateTo({
        url: 'submitOrder?performanceId=' + json.data.performanceId + "&type=" + this.data._type,
      });
    }else{
      wx.showToast({
        title: json.forUser,
      })
    }
  }
  //显示结果对话框
  ,showFenShuDialog(){
    this.setData({
      showFenShuModal:true
      , showModalBg:true
    })
  }
  //隐藏对话框
  ,hideModal(){
    this.setData({
      showFenShuModal: false
      , showModalBg: false
    });
  }
  //码数点击
  , onMaShuItemClick(event) {

    var index = event.target.dataset.itemIndex;
    var _dataList = this.data.dataList;
    var attrList = _dataList.goodsAttr;
    var para = null;
    var i = 0;
    for (; i < attrList.length; i++) {
      if (attrList[i].name == '码数') {
        para = attrList[i].para;
        break;
      }
    }
    if (para == null) {
      return;
    }
    for (var p = 0; p < para.length; p++) {
      para[p].isSel = false;
      if (index == p) {
        para[p].isSel = true;
      }
    }
    var item = para[index];
    var itemName = item.paraDesc;
    var imageUrl = item.paraImg;
    this.setData({
      dataList: _dataList
      , selMaShu: item
    })

    this.onFilterChange();
  }
  //显示/隐藏 模态框
  , showOrHideShoppintModal(event) {
    var status = this.data.showModalStatus;
    this.setData({
      showModalStatus: !status
    });

  }
  //
  ,onSubmitClick(){
    this.createOrder();

  }
})