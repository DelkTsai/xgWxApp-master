// pages/index/filter/filterPage.js
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth:0//窗口宽
    ,windowHeight:0//窗口高
    ,filterContnet:null//过滤内容
    ,pinPai:[]//选中品牌项
    ,leiXing:[]//选中类型项
    ,maShu:[]//选中码数
    ,yanSe:[]//选中颜色
    ,filterContent:null
    ,searchKey:""
    ,filterCount:0
    ,sourceJson:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("filter on load");
    var filterContent = options.filterContent;
    if (filterContent!=null)
    {
      this.data.filterContent = JSON.parse(filterContent);
      var a = this.data.filterContent['goodsName'];
      this.setData({
        searchKey: a
      })
      
    }
  


    //获取系统信息
    wx.getSystemInfo({
      success: function (res) {

        that.setData({
          windowWidth: res.windowWidth
          , windowHeight: res.windowHeight
        });
      }
    })

    util.getAjax("home/goods_fixation_attr", "", this.onGetFilterCallback);

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
  
  }

  ,onGetFilterCallback(json)
  {
    var _filterCount = 0;

    if(json.ret){
      this.data.sourceJson = JSON.parse(JSON.stringify(json.data));
     
      if (this.data.filterContent != null || this.data.filterContent!=void(0))
      {
        var filterContent = this.data.filterContent;
        
        for (var keyName in json.data) {
          var chineseKey = "";
          switch (keyName){
            case "brand":
              chineseKey = "品牌"
              break;
            case "color":
              chineseKey = "颜色"
              break;
            case "size":
              chineseKey = "码数";  
              break;
            case "type":
              chineseKey = "类型";
              break; 
          }
          if(chineseKey==""){
            break;
          }
          for (var i = 0; i < json.data[keyName].para.length;i++)
          {
            var para = json.data[keyName].para[i];
            if (filterContent[chineseKey]==null){
              break;
            }
            for (var j = 0; j <filterContent[chineseKey].length;j++)
            {
              if(keyName=="brand"){
                if (para.paraImg == filterContent[chineseKey][j]){
                    para.isSel = true;
                    _filterCount+=1;
                    para.paraImg = para.paraImg.replace(".png","_sel.png");
                }
              } else if (keyName == "color") {
                if (para.paraImg == filterContent[chineseKey][j]) {
                  para.isSel = true;
                  _filterCount+=1;
                }
              } else if (keyName == "size") {
                if (para.paraDesc == filterContent[chineseKey][j]) {
                  para.isSel = true;
                  _filterCount+=1;
                }
              } else if (keyName == "brand") {
                if (para.paraImg == filterContent[chineseKey][j]) {
                  para.isSel = true;
                  _filterCount+=1;
                  para.paraImg = para.paraImg.replace(".png,_sel.png");
                }
              }
            }
          
          }

        }

      }
      console.log(json.data);

      this.setData({
        filterContnet: json.data
        ,filterCount: _filterCount
      });
    }

   
  }
  //类型点击
  ,onLeiXingItemClick(event){
    var _filterCount = this.data.filterCount;
    var index = event.target.dataset.itemIndex;
    var _filfilterContnet = this.data.filterContnet;
    var item = _filfilterContnet['size'].para[index];
    var itemName = item.paraDesc;
    var imageUrl = item.paraImg;
    if (true == item.isSel) {
      item.isSel = false;
      _filterCount -=1;
    } else {
      item.isSel = true;
      _filterCount +=1;
    }
    item.paraImg = this.ReversalImage(imageUrl);;
    this.setData({
      filterContnet: _filfilterContnet
      ,filterCount: _filterCount
    })
  }
//品牌点击
,onPinPaiItemClick(event)
{
  var _filterCount = this.data.filterCount;
  var index = event.target.dataset.itemIndex;
  var _filfilterContnet = this.data.filterContnet;
  var item = _filfilterContnet['brand'].para[index];
  var itemName = item.paraDesc;
  var imageUrl = item.paraImg;

  if (true == item.isSel) {
    item.isSel = false;
    _filterCount -=1;
  } else {
    item.isSel = true;
    _filterCount +=1;
  }
  item.paraImg = this.ReversalImage(imageUrl);;
  this.setData({
    filterContnet: _filfilterContnet
    ,filterCount: _filterCount
  })
}
//码数点击
,onMaShuItemClick(event){
  var _filterCount = this.data.filterCount;
  var index = event.target.dataset.itemIndex;
  var _filfilterContnet = this.data.filterContnet;
  var item = _filfilterContnet['size'].para[index];
  var itemName = item.paraDesc;
  var imageUrl = item.paraImg;
  if (true == item.isSel){
    item.isSel = false;
    _filterCount-=1;
  }else{
    item.isSel = true;
    _filterCount+=1;
  }
  this.setData({
    filterContnet: _filfilterContnet
    , filterCount: _filterCount
  })
}
//颜色点击
,onYanSeItemClick(event){
  var _filterCount = this.data.filterCount;
  var index = event.target.dataset.itemIndex;
  var _filfilterContnet = this.data.filterContnet;
  var item = _filfilterContnet['color'].para[index];
  var itemName = item.paraDesc;
  var imageUrl = item.paraImg;
  if (true == item.isSel) {
    item.isSel = false;
    _filterCount-=1;
  } else {
    item.isSel = true;
    _filterCount+=1;
  }
  this.setData({
    filterContnet: _filfilterContnet
    , filterCount: _filterCount
  })
}
//改变选中图片
  ,ReversalImage(imageUrl){
    if (imageUrl.match("_sel.png")) {
      imageUrl = imageUrl.replace("_sel.png", ".png");
    } else {
      imageUrl = imageUrl.replace(".png", "_sel.png");
    }
    return imageUrl;
},//筛选确定
OnFilterConfirm(event) {
  this.data.leiXing = [];
  this.data.pinPai = [];
  this.data.yanSe = [];
  this.data.maShu = [];
  for (var i in this.data.filterContnet)
  {
    for (var j = 0; j < this.data.filterContnet[i].para.length;j++)
    {
      var paraImg = null;
      var paraDes = null;
      if (this.data.filterContnet[i].para[j].isSel==true)
      {
        if (this.data.filterContnet[i].para[j].paraImg != null && this.data.filterContnet[i].para[j].paraImg!=""){//含有图片
          paraImg = this.data.filterContnet[i].para[j].paraImg.replace("_sel.png",".png");
        }else{
          paraDes = this.data.filterContnet[i].para[j].paraDesc;
        }
        
      }

      if (paraImg != null || paraDes!=null){
        if (this.data.filterContnet[i].attrName == "类型") {
          this.data.leiXing.push(paraImg);
        } else if (this.data.filterContnet[i].attrName == "品牌") {
          this.data.pinPai.push(paraImg);
        } else if (this.data.filterContnet[i].attrName == "码数") {
          this.data.maShu.push(paraDes);
        } else if (this.data.filterContnet[i].attrName == "颜色") {
          this.data.yanSe.push(paraImg);

        }
        paraImg=null;
        paraDes=null;
      }
    }
    
  }
  var pages = getCurrentPages();
  var prevPage = pages[pages.length - 2];  //上一个页面
 var json = {
    "类型": this.data.leiXing
   , "品牌": this.data.pinPai
   , "码数": this.data.maShu
   , "颜色": this.data.yanSe
   , "goodsName":this.data.searchKey
  }
  prevPage.setData({
    filterContent: json
    ,filterRefresh:true
  });
  wx.navigateBack({ delta: 1 });
}
//获取输入框值
,searchInput(e){
 this.setData({
   searchKey:e.detail.value
 }) ;
}
//全部清除
,onClearAllFilter(event){
  this.setData({
    filterCount:0
    ,filterContnet:this.data.sourceJson
    , searchKey: ""
  });
}

})

