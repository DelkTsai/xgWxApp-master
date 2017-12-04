// buyCarList.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenSession: "",
    buyCardLastId: "",//购物车的lastID
    checkBox: [],//购物车的前面的checkbox
    num: [],//数量数组
    buyCarList: "",
    shuzu: [],
    shuzui:[],
    showModalStatus: false, //弹窗用
    hidden: true,//弹窗用
    indexp:0,//第几个元素
    dataList:"",//商品详细
    cbh:[],//控制checkbox是否隐藏
    cbih:[],//控制checkbox图片是否隐藏
    money:[],//全部价格
    sendgoodsId:"",//以下8个字段都是用于发送修改购物车
    sendgoodsAttr:"",
    sendgoodsImg:"",
    sendgoodsName:"",
    sendprice:"",
    sendshopCarId:"",
    sendnum:"",
    totalMoney:0,//总价钱
    shopCarListId:[],//购物车选中的内容的id
    fall:"",//控制全选勾状态
    windowHeight:"",//屏幕高度
    windowWidth:"",//屏幕宽
    leftWidth:"",//剩余宽度
    showModalStatus: false, //弹窗用
    // select:"",//选中之后的样式
    paraDesc:"",//选择的码数
    index:"",//当前选择是第几个
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var that = this;
    wx.setNavigationBarTitle({
      title: '购物车'
    });
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data
        that.setData({
          tokenSession: token
        });
        var sendGetBuyCar = {
          "tokenSession": res.data,
          "lastId": that.data.buyCardLastId
        }
        util.getAjax("user/shop_car", sendGetBuyCar, that.buyCarCallBack);
      }
    });
    //获取屏幕信息
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.model)
        // console.log(res.pixelRatio)
        // console.log(res.windowWidth)
        // console.log(res.windowHeight)
        // console.log(res.language)
        // console.log(res.version)
        var leftw = res.windowWidth - 280;
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          leftWidth: leftw
        });
      }
    });
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
    var that = this;
    var sendBUttom={
      "tokenSession": that.data.tokenSession,
      "lastId": that.data.buyCardLastId
    }
    util.getAjax("user/shop_car", sendBUttom, that.buyCarCallBack);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 第一次获取购物车的回调
  buyCarCallBack: function (json) {
    var that = this;
    var checkt = [], numt = [],cbht=[],cbiht=[],moneyt=[];
    that.data.shuzu=[];
    for (var i = 0; i < json.data.length; i++) {
      if (i == json.data.lenght - 1) {
        var lastid = json.data[i].shopCarId
        that.setData({
          buyCardLastId: lastid
        })
      }
      that.data.shuzu.push(json.data[i]);
      //在这里给checkbox数组以及num数组初始化赋值
      checkt.push('');
      cbht.push('visible');
      cbiht.push('hidden');
      moneyt.push(json.data[i].price);
      numt.push(parseInt(json.data[i].num));
    }
    that.setData({
      buyCarList: that.data.shuzu,
      checkBox: checkt,
      cbh:cbht,
      cbih:cbiht,
      num: numt,
      money: moneyt
    });
  },
  // 收藏商品减少数量
  jiannum: function (event) {
    var that = this;
    var index = event.currentTarget.dataset.index;

    var price = event.currentTarget.dataset.money;
    var goodsAttr = event.currentTarget.dataset.goodsAttr;
    var goodsId = event.currentTarget.dataset.goodsId;
    var goodsImg = event.currentTarget.dataset.goodsImg;
    var goodsName = event.currentTarget.dataset.goodsName;
    var shopCarId = event.currentTarget.dataset.shopCarId;
    var num = event.currentTarget.dataset.num;
    //是否有选中
    var cb = that.data.checkBox;
    //总价
    var tprice = that.data.totalMoney;
    //购物车列表
    var clist = that.data.shopCarListId;
    var nump = [];
    var moneyp = [];
    moneyp = that.data.money;
    nump = that.data.num;
    // if (cb[index] =='checked')
    // {
    //   //如果是选中再改数量
    //   var pp = nump[index] * price;
    //   tprice-=pp;
    //   if (nump[index] <= 0) {

    //   }
    //   else {
    //     nump[index] -= 1;
    //     moneyp[index] -= price;
    //     pp = nump[index]*price;
    //     tprice += pp;
    //   }
    //   that.setData({
    //     totalMoney: tprice
    //   })
    // }
    // else{
    //   if (nump[index] <= 0) {

    //   }
    //   else {
    //     nump[index] -= 1;
    //     moneyp[index] -= price;
    //   }
    // }
   
    // that.setData({
    //   num: nump,
    //   money: moneyp
    // })

    if(cb[index]=='checked')
    {
      //如果有选中
      //没有减少前的商品价值
      var ttmoney = nump[index] * price;
      if (parseInt(nump[index])>0)
      {
        nump[index] = parseInt(nump[index]) - 1;
      }
      else{
        wx.showToast({
          title: '商品数量不能小于0',
        })
      }
      //当前这个商品的选择的数量的总价
      var pp = nump[index] * price;
      var oldTotalPrice = that.data.totalMoney;
      var newTotalPrice = oldTotalPrice - ttmoney + pp;
      that.setData({
        totalMoney: newTotalPrice,
        num: nump
      })
    }
    else if (cb[index] == '')
    {
      if (parseInt(nump[index]) > 0) {
        nump[index] = parseInt(nump[index]) - 1;
      }
      else {
        wx.showToast({
          title: '商品数量不能小于0',
        })
      }
      that.setData({
        num: nump
      })
    }

    var num = nump[index];
    // 执行购物车修改接口
    var token = that.data.tokenSession;
    var sendChangeShopCarList={
      "tokenSession":token,
      "goodsId":goodsId,
      "goodsName": goodsName,
      "goodsImg": goodsImg,
      "goodsAttr": goodsAttr,
      "shopCarId": shopCarId,
      "num": num,
      "price": price
    }
    util.postAjax("mall/add_car", sendChangeShopCarList,that.sendShopListCallBack);
  },
  //收藏品增加数量
  jianum: function (event) {
    var that = this;
    var index = event.currentTarget.dataset.index;

    var price = event.currentTarget.dataset.money;
    var goodsAttr = event.currentTarget.dataset.goodsAttr;
    var goodsId = event.currentTarget.dataset.goodsId;
    var goodsImg = event.currentTarget.dataset.goodsImg;
    var goodsName = event.currentTarget.dataset.goodsName;
    var shopCarId = event.currentTarget.dataset.shopCarId;
    // 判断有没有选中属性
    if (goodsAttr.length==0)
    {
      wx.showToast({
        title: '请先选择商品属性',
      });
      return;
    }
    //是否有选中
    var cb = that.data.checkBox;
    //总价
    var tprice = that.data.totalMoney;
    //购物车列表
    var clist = that.data.shopCarListId;
    var nump = [];
    var moneyp = [];
    moneyp = that.data.money;
    nump = that.data.num;
    // if (cb[index] == 'checked') {
    //   //如果是选中再改数量
    //   var pp = nump[index] * price;
    //   tprice=0;
    //   tprice += pp;
    //   if (nump[index] < 0) {

    //   }
    //   else {
    //     nump[index] += 1;
    //     moneyp[index] += price;
    //     pp = nump[index] * price;
    //     tprice=0;
    //     tprice += pp;
    //   }
    //   that.setData({
    //     totalMoney: tprice
    //   })
    // }
    // else {
    //   if (nump[index] < 0) {

    //   }
    //   else {
    //     nump[index] += 1;
    //     moneyp[index] += price;
    //   }
    // }
    // that.setData({
    //   num: nump,
    //   money: moneyp
    // })
    if(cb[index] == 'checked')
    {
      // 如果选中
      // 未增加数量前的改商品价值
      var ttmoney = nump[index] * price
      nump[index] = parseInt(nump[index])+1;
      //当前这个商品的选择的数量的总价
      var pp = nump[index] * price;
      var oldTotalPrice = that.data.totalMoney;
      var newTotalPrice = oldTotalPrice - ttmoney + pp;
      that.setData({
        totalMoney: newTotalPrice,
        num: nump
      })
    }
    else if (cb[index] == ''){
      //没有选中
      nump[index] = parseInt(nump[index]) + 1;
      that.setData({
        num: nump
      })
    }
    var num = nump[index];
    // 执行购物车修改接口
    var token = that.data.tokenSession;
    var sendChangeShopCarList = {
      "tokenSession": token,
      "goodsId": goodsId,
      "goodsName": goodsName,
      "goodsImg": goodsImg,
      "goodsAttr": goodsAttr,
      "shopCarId": shopCarId,
      "num": num,
      "price": price
    }
    util.postAjax("mall/add_car", sendChangeShopCarList, that.sendShopListCallBack);
  },
  // checkbox选中事件
  checkChange:function(event)
  {
    var that = this;
    var index = event.currentTarget.dataset.index;
    //商品价钱
    var price = event.currentTarget.dataset.price;
    //购物车id
    var shopCarId = event.currentTarget.dataset.shopCarId;
    //购物车id列表
    var slist = that.data.shopCarListId;
    //购物车数量列表
    var cnum = that.data.num;
    var totalPrice = that.data.totalMoney;
    var checkBoxP = that.data.checkBox;// 购物车的前面的checkbox
    var cbhP = that.data.cbh;//控制checkbox是否隐藏
    var cbihP = that.data.cbih;//控制checkbox图片是否隐藏
    if (that.data.checkBox[index]=='')
    {
      // 选中事件
      checkBoxP[index] ='checked'; 
      cbhP[index] ='hidden';
      cbihP[index] = 'visible';
      //选中时计算总价
      var pp = price * cnum[index];
      totalPrice+=pp;
      //把购物车id放入列表
      slist.push(shopCarId)
      that.setData({
        totalMoney: totalPrice,
        shopCarListId: slist
      });
    }
    else if(that.data.checkBox[index]=='checked')
    {
      checkBoxP[index] = '';
      cbhP[index] = 'visible';
      cbihP[index] = 'hidden';
      //取消选中时的总价
      var pp = price * cnum[index];
      totalPrice -= pp;
      //把购物车id从列表中移除
      var val = 0;
      for (var i = 0; i < slist.length;i++)
      {
        if (shopCarId == slist[i])
        {
          val = i ;
          break;
        }
      }
      slist.splice(val, 1);
      that.setData({
        totalMoney: totalPrice,
        shopCarListId: slist
      });
    }
    that.setData({
      checkBox: checkBoxP,
      cbh: cbhP,
      cbhi:cbihP
    });
  },
  // 点击属性显示弹窗
  powerDrawer: function (e) {
    var that = this;
    var currentStatu = e.currentTarget.dataset.statu;
    var goodsId = e.currentTarget.dataset.goodsId;

    var goodsAttr = e.currentTarget.dataset.goodsAttr;
    var goodsImg = e.currentTarget.dataset.goodsImg;
    var goodsName = e.currentTarget.dataset.goodsName;
    var index = e.currentTarget.dataset.index;
    var price = e.currentTarget.dataset.money;
    var shopCarId = e.currentTarget.dataset.shopCarId;
    var num = e.currentTarget.dataset.num;

    this.util(currentStatu);
    this.setData({
      hidden: !that.data.hidden
    })
    if (currentStatu == 'open') {
      var index = e.currentTarget.dataset.index;
      
      that.setData({
        indexp:index,
        sendgoodsId: goodsId,
        sendgoodsAttr: goodsAttr,
        sendgoodsImg: goodsImg,
        sendgoodsName: goodsName,
        sendprice: price,
        sendshopCarId: shopCarId,
        sendnum:num,
        index: index,
      })
      var token = that.data.tokenSession;
      var sendGetGoodsAttr= {
        "tokenSession":token,
        "goodsId":goodsId,
        "type":"1"
      }
      that.setData({
        shuzui:[]
      })
      util.getAjax("home/goods_detail",sendGetGoodsAttr,that.attrsCallBack)
    }
    else if (currentStatu=="close")
    {
      var buyCarListp = that.data.buyCarList;
      var idnex = that.data.indexp;
      buyCarListp[idnex].goodsAttr = that.data.sendgoodsAttr;
      that.setData({
        buyCarList: buyCarListp
      })
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
  },
  //获取属性列表回调
  attrsCallBack:function(json)
  {
      var that = this;
      if(json.ret==true){
      var data = json.data;
      that.setData({
        dataList:data
      });
      }
  },
  //文字属性点击事件
  wenziPara:function(event)
  {
    var that = this;
    var paraIndex=event.currentTarget.dataset.paraIndex;
    var paraDesc = event.currentTarget.dataset.paraDesc;
    var paraImg = event.currentTarget.dataset.paraImg;
    var paraType = event.currentTarget.dataset.paraType;
    var attr = that.data.sendgoodsAttr;
    var flag = true;
    if (attr != null) {
      if (attr.length != 0) {
        for (var i = 0; i < attr.length; i++) {
          if (attr[i].paraType == paraType) {
            attr[i].content = paraDesc;
            break;
          }
          else {
            if (i == attr.length - 1) {
              var para = {
                "content": paraDesc,
                "paraType": paraType
              }
              attr.push(para);
              that.setData({
                sendgoodsAttr: attr,

              });
              flag = false;
            }
          }
        }
        if (flag == true) {
          that.setData({
            sendgoodsAttr: attr,

          });
        }
      }
      else {
        var para = {
          "content": paraDesc,
          "paraType": paraType
        }
        that.data.shuzui.push(para);
        that.setData({
          sendgoodsAttr: that.data.shuzui,

        });
      }
    }
    else {
      var para = {
        "content": paraDesc,
        "paraType": paraType
      }
      that.data.shuzui.push(para);
      that.setData({
        sendgoodsAttr: that.data.shuzui,

      });
    }
    //准备发送的数据
    var sendgoodsId = that.data.sendgoodsId;
    var sendgoodsAttr = that.data.sendgoodsAttr;
    var sendgoodsImg = that.data.sendgoodsImg;
    var sendgoodsName = that.data.sendgoodsName;
    var sendprice = that.data.sendprice;
    var sendshopCarId = that.data.sendshopCarId;
    var token = that.data.tokenSession;
    var sendnum = that.data.sendnum;
    var sendData={
      "tokenSession":token,
      "goodsId":sendgoodsId,
      "goodsName": sendgoodsName,
      "goodsImg":sendgoodsImg,
      "goodsAttr":sendgoodsAttr,
      "price":sendprice,
      "shopCarId":sendshopCarId,
      "num": sendnum
    }
    util.postAjax("mall/add_car",sendData,that.attrShopCarListCallBack);
    wx.showToast({
      title: '已成功选择码数'
    })
  },
  //图片属性点击事件
  tupianPara:function(event)
  {
    var that = this;
    var paraIndex = event.currentTarget.dataset.paraIndex;
    var paraDesc = event.currentTarget.dataset.paraDesc;
    var paraImg = event.currentTarget.dataset.paraImg;
    var paraType = event.currentTarget.dataset.paraType;
    var attr = that.data.sendgoodsAttr;
    var flag = true;
    if (attr != null) {
      if(attr.length!=0){
        for (var i = 0; i < attr.length; i++) {
          if (attr[i].paraType == paraType) {
            attr[i].content = paraImg;
            break;
          }
          else {
            if (i == attr.length - 1) {
              var para = {
                "content": paraImg,
                "paraType": paraType
              }
              attr.push(para);
              that.setData({
                sendgoodsAttr: attr,

              });
              flag = false;
            }
          }
        }
        if (flag == true) {
          that.setData({
            sendgoodsAttr: attr,

          });
        }
      }
      else{
        var para = {
          "content": paraImg,
          "paraType": paraType
        }
        that.data.shuzui.push(para);
        that.setData({
          sendgoodsAttr: that.data.shuzui,

        });
      }
    }
    else {
      var para = {
        "content": paraImg,
        "paraType": paraType
      }
      that.data.shuzui.push(para);
      that.setData({
        sendgoodsAttr: that.data.shuzui,

      });
    }
    
    //准备发送的数据
    var sendgoodsId = that.data.sendgoodsId;
    var sendgoodsAttr = that.data.sendgoodsAttr;
    var sendgoodsImg = that.data.sendgoodsImg;
    var sendgoodsName = that.data.sendgoodsName;
    var sendprice = that.data.sendprice;
    var sendshopCarId = that.data.sendshopCarId;
    var token = that.data.tokenSession;
    var sendnum = that.data.sendnum;
    var sendData = {
      "tokenSession": token,
      "goodsId": sendgoodsId,
      "goodsName": sendgoodsName,
      "goodsImg": sendgoodsImg,
      "goodsAttr": sendgoodsAttr,
      "price": sendprice,
      "shopCarId": sendshopCarId,
      "num":sendnum
    }
    util.postAjax("mall/add_car", sendData, that.attrShopCarListCallBack);
    wx.showToast({
      title: '已成功选择颜色'
    });
  },
  //更改数量的回调函数
  sendShopListCallBack:function(json)
  {
    if(json.ret==false)
    {
      var msg = json.forUser;
      wx.showToast({
        title: msg
      })
    }
  },
  //调整购物车商品属性回调函数
  attrShopCarListCallBack:function(json)
  {
    if(json.ret==false)
    {
      var msg = json.forUser;
      wx.showToast({
        title: msg
      })
    }
  },
  // 点击结算按钮
  sumClick:function()
  {
    var that = this;
    var shList = that.data.shopCarListId;
    var token = that.data.tokenSession;
    var sendData={
      "shopCarId":shList,
      "tokenSession":token
    }
    util.postAjax("mall/add_order", sendData,that.saveCarListCallBack);
  },
  //保存购物车列表回调函数
  saveCarListCallBack:function(json)
  {
    console.log(json);
    var orderId = json.data.orderId;//"c822c4a29def11e784191c1b0d7314c3";
    var orderNo = json.data.orderNo;//"S2017092059839";
    var score = json.data.score;//"0";
    if (json.ret==false)
    {
      wx.showToast({
        title: '请选择选中商品的属性'
      });
    }
    else if(json.ret==true)
    {
      wx.navigateTo({
        // url: 'orderFront?orderId=' + orderId + "&orderNo=" + orderNo + "&score=" + score,
        url: '../personal/orderDetail?orderId=' + orderId + "&orderNo=" + orderNo + "&score=" + score,
      });
    }
  },
  // 全选勾
  checkAll:function()
  {
    var that = this;
    var bcList = that.data.buyCarList
    var cblist = that.data.checkBox;
    // num,money
    var nump = that.data.num;
    var moneyp = that.data.money;
    var totalM = 0;
    var pp =0.00;
    var sList = [];
    if (that.data.fall=='')
    {
      for(var i=0;i<bcList.length;i++)
      {
        sList.push(bcList[i].shopCarId);
        pp=nump[i]*moneyp[i];
        cblist[i]='checked';
        totalM+=pp;
      }
      that.setData({
          totalMoney: totalM,
          shopCarListId: sList,
          fall:'checked',
          checkBox:cblist
      })
    }
    else if (that.data.fall == 'checked')
    {
      for (var i = 0; i < bcList.length; i++) {
       
        cblist[i] = '';

      }
      that.setData({
        totalMoney: 0,
        shopCarListId: [],
        fall: '',
        checkBox: cblist
      })
    }
  },
  // 隐藏显示模态框
  showOrHideShoppintModal:function(e)
  {
    var status = this.data.showModalStatus;
    this.setData({
      showModalStatus: !status
    });
    console.log(e);
  },
  //码数点击
  onMaShuItemClick:function(event) {
    console.log(event);
    var that = this;
    var itemIndex = event.currentTarget.dataset.itemIndex;
    var itemPara = event.currentTarget.dataset.itemPara;
    var itemParentIndex = event.currentTarget.dataset.itemParentIndex;
    var paraDesc = event.currentTarget.dataset.paraDesc;
    wx.showToast({
      title: "您选择了:"+paraDesc,
    });
    that.setData({
      paraDesc: paraDesc
    });
  },
  // 点击确认
  onSubmitClick:function()
  {
    var that = this
    var buyCarListp = that.data.buyCarList;
    var i = that.data.index;
    var paraDescp = that.data.paraDesc;
    var attr = {
      "paraType":"1",
      "content": paraDescp
    }
    buyCarListp[i].goodsAttr=[];
    buyCarListp[i].goodsAttr.push(attr);
    that.setData({
      buyCarList: buyCarListp
    });
    var status = that.data.showModalStatus;
    that.setData({
      showModalStatus: !status
    });
    //把修改的信息发送到服务器
    //准备发送的数据
    var sendgoodsId = that.data.sendgoodsId;
    var sendgoodsAttr = that.data.sendgoodsAttr;
    var sendgoodsImg = that.data.sendgoodsImg;
    var sendgoodsName = that.data.sendgoodsName;
    var sendprice = that.data.sendprice;
    var sendshopCarId = that.data.sendshopCarId;
    var token = that.data.tokenSession;
    var sendnum = that.data.sendnum;
    var seJson = JSON.stringify(buyCarListp[i].goodsAttr)
    var sendData = {
      "tokenSession": token,
      "goodsId": sendgoodsId,
      "goodsName": sendgoodsName,
      "goodsImg": sendgoodsImg,
      "goodsAttr": seJson,
      "price": sendprice,
      "shopCarId": sendshopCarId,
      "num": sendnum,
      "checkAttrKey":"false"
    }
    util.postAjax("mall/add_car", sendData, that.attrShopCarListCallBack);
  }
})