// collectionDetail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    dataList:"",
    goodsId:"",
    dataType:"",
    showModalStatus: false, //弹窗用
    hidden:true,//弹窗用
    goodsAttr:[],
    tokenSession:""
    ,windowHeight:0
    , windowWidth: 0
    ,selCount:0
    ,selMaShu:null
    ,price:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var goodsId = options.goodsId;
    var dataType = options.type;
    that.setData({
      goodsId: goodsId,
      dataType: dataType
    })
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          tokenSession: res.data
        });
        var sendGoodsData = {
          "tokenSession": res.data,
          "goodsId": goodsId,
          "type": dataType
        }
        util.getAjax("home/goods_detail", sendGoodsData, that.getGoodsCallBack);
      }
    });
    // 高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight =res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
          ,windowHeight: res.windowHeight
          , windowWidth: res.windowWidth

        });
      }
    });
    wx.setNavigationBarTitle({
      title: '  '
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
    console.log("share");
    var that = this;
    return {
      title: '鞋狗',
      path: '/page/personal/collectionDetail?goodsId=' + that.data.dataList.goodsId + "&type=1",
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
  },
  // 滚动切换标签样式
  switchTab:function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav:function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor:function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  // footerTap: app.footerTap,
  // 获取商品详情的回调函数
  getGoodsCallBack:function(json)
  {
    var that = this;
    if(json.ret==true)
    {
      that.setData({
        dataList:json.data
      })
    }
  },
  // 显示弹窗
  powerDrawer: function (e) {
    var that = this;
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu);
    this.setData({
      hidden:!that.data.hidden
    })
    if (e.currentTarget.dataset.statu=='close')
    {
      var goodsId = e.currentTarget.dataset.goodsId;
      var goodsName = e.currentTarget.dataset.goodsName;
      var goodsImg = e.currentTarget.dataset.goodsImg;
      var price = e.currentTarget.dataset.price;
      var sendBuyCar={
        "tokenSession": that.data.tokenSession,
        "goodsId":goodsId,
        "goodsName":goodsName,
        "goodsImg":goodsImg,
        "goodsAttr": that.data.goodsAttr,
        "num":"1",
        "price":price
      }
      util.postAjax("mall/add_car",sendBuyCar,that.buyCarCallBack)
    }
  }, 
  util: function (currentStatu) {
    /* 动画部分 */
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
  } ,
  // 码数选择之后
  wenziPara:function(event)
  {
    var that = this;
    var paraDesc = event.currentTarget.dataset.paraDesc;
    var paraImg = event.currentTarget.dataset.paraImg;
    var name = event.currentTarget.dataset.name;
    var ischoice = event.currentTarget.dataset.ischoice;
    var paraType = event.currentTarget.dataset.paraType;
    var para = {
      "paraDesc":paraDesc,
      "paraImg": paraImg
    }
    var goodAttr = {
      "name":name,
      "ischoice":ischoice,
      "para":para,
      "paraType":paraType
    }
    that.data.goodsAttr.push(goodAttr);
    wx.showToast({
      title: '已选取码数'
    })
  },
  // 图片选择完成后
  tupianPara:function(event)
  {
    var that = this;
    var paraDesc = event.currentTarget.dataset.paraDesc;
    var paraImg = event.currentTarget.dataset.paraImg;
    var name = event.currentTarget.dataset.name;
    var ischoice = event.currentTarget.dataset.ischoice;
    var paraType = event.currentTarget.dataset.paraType;
    var para = {
      "paraDesc": paraDesc,
      "paraImg": paraImg
    }
    var goodAttr = {
      "name": name,
      "ischoice": ischoice,
      "para": para,
      "paraType": paraType
    }
    that.data.goodsAttr.push(goodAttr);
    wx.showToast({
      title: '已选取颜色'
    })
  },
  // 加入购物车的回调
  buyCarCallBack:function(json){
    if(json.ret==true)
    {
      var shopCarId = json.data.shopCarId;
      console.log(json);
    }
  }
  //显示/隐藏 模态框
  ,showOrHideShoppintModal(event){
    var status = this.data.showModalStatus;
    this.setData({
      showModalStatus: !status
    });
    
  }//码数点击
  , onMaShuItemClick(event) {

    var index = event.target.dataset.itemIndex;
    var para = this.data.dataList.goodsAttr[event.target.dataset.itemParentIndex].para;
    if (para==null){
      return;
    }
    for(var p=0;p<para.length ; p++){
      para[p].isSel=false;
      if(index==p){
        para[p].isSel = true;
      }
    }
    var item = para[index];
    item.paraType = this.data.dataList.goodsAttr[event.target.dataset.itemParentIndex].paraType;
    var itemName = item.paraDesc;
    var imageUrl = item.paraImg;
    this.setData({
      dataList: this.data.dataList
      ,selMaShu:item
    })

    this.onFilterChange();
  }
  //修改数量
  ,onModifyCountClick(event)
  {
    var opera = event.target.dataset.opera;
    if (parseInt(this.data.selCount) <= 0 && parseInt(opera)==-1){
      return;
    }
    this.setData({
      selCount: parseInt(this.data.selCount)+parseInt(opera)
    });

    this.onFilterChange();
  }
  //算钱
  ,onFilterChange(){
    var count = parseInt(this.data.selCount);
    var selMaShu = this.data.selMaShu;
    if(selMaShu==null){
      return;
    }
    var maShu = parseInt(selMaShu.paraDesc);
    var price ;
    if(maShu>=40){
      price = this.data.dataList.malePrice;
    }else{
      price = this.data.dataList.price;
    }
    price = price * count;
    this.setData({
      price:price
    });
  }
  //确定下单
  ,onSubmitClick(event){
    var goodsId = this.data.dataList.goodsId;
    var goodsName = this.data.dataList.goodsName;
    var goodsImg = this.data.dataList.showImg[0];
    var num = parseInt(this.data.selCount);
    var price = this.data.price;
    var femalePrice = this.data.price;
    var malePrice = this.data.malePrice; 


    var goodsAttr = [];
    if (this.data.selMaShu!=null){
      console.log(this.data.selMaShu);
      goodsAttr.push({
        content: this.data.selMaShu.paraDesc
        , paraType: this.data.selMaShu.paraType
      });
    }
    console.log("11111");

    var checkAttrKey = "码数^^" + this.data.selMaShu.paraDesc;
    var saveType = "2";
    this.addToShopptinCar(goodsId, goodsName, goodsImg, num, price, femalePrice, malePrice,saveType, goodsAttr, checkAttrKey, this.buyCallback);
  }
  //添加到购物车
  ,onAddToShoppintcarClick(event)
  {
    var goodsId = this.data.dataList.goodsId;
    var goodsName = this.data.dataList.goodsName;
    var goodsImg = this.data.dataList.showImg[0];
    var num = "1";
    var price = this.data.price;
    var femalePrice = this.data.price;
    var malePrice = this.data.malePrice;
    var goodsAttr = "";
    var checkAttrKey = "";
    var saveType = "1";
    this.addToShopptinCar(goodsId, goodsName, goodsImg, num, price, femalePrice, malePrice, saveType, goodsAttr, checkAttrKey, this.addToShoppintCarCallback);
  }
  , addToShopptinCar(goodsId, goodsName, goodsImg, num, price, femalePrice, malePrice, saveType,goodsAttr,checkAttrKey,callback){
    var sendBuyCar = {
      "tokenSession": this.data.tokenSession
      ,"goodsId": goodsId
      ,"goodsName": goodsName
      ,"goodsImg": goodsImg
      ,"num": num
      ,"price": price
      , "femalePrice":femalePrice
      , "malePrice": malePrice
      , "saveType":saveType
      , "goodsAttr": JSON.stringify(goodsAttr)
      , "checkAttrKey":checkAttrKey
    }
    util.postAjax("mall/add_car", sendBuyCar, callback)
  }
  //一键购买回调
  ,buyCallback(json){
    if(json.ret){
      var orderId = json.data.orderId;
      var orderNo = json.data.orderNo;
      wx.redirectTo({
        url: 'orderDetail?orderNo=' + orderNo + "&orderId=" + orderId,
      });
    }
  }
  //添加到购物车回调
  ,addToShoppintCarCallback(json){
    if(json.ret){
      wx.showToast({
        title: '成功添加到购物车！',
      })
    }
  }
  //收藏点击
  ,onCollectionClick(event){
    var data = this.data.dataList;
    data.isCollect = ("0" == data.isCollect)?"1":"0";
        
    var para = {
      "goodsId": this.data.dataList.goodsId
      ,"type" : "1"
      , "tokenSession": this.data.tokenSession
      , "way": data.isCollect
    }
    util.postAjax("user/collect_goods", para, this.collectionCallback);
    this.setData({
      dataList:data
    });

  }
  ,collectionCallback(json){
    if(json.ret){

    }
  }
  ,customShareClick(event){
    wx.showToast({
      title: '点击右上角分享',
    });
  }
  ,onBrowImageClick(event){
    var images = [];
    images.push(event.currentTarget.dataset.imageUrl);
    wx.previewImage({ urls: images})
  }
  

})