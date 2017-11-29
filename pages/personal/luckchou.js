// pages/personal/luckchou.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showType:"0",//判断是哪一种抽奖2碎片抽奖1普通抽奖
    score:"",//抽奖一次所需要的积分
    itemSize:30,
    windowwidth:"",//屏幕宽度
    tokenSession:"",
    lotItemDatas:"",//用于抽奖的东西
    getTranslate:[],
    url:"",
    flip:"rotateY(180deg)",//控制反转
    hidden:"",//用于隐藏下面的抽奖按钮
    mask:"visibility:hidden;display:none;",//页面遮罩层
    showText:"visibility:hidden;display:none;",//显示文字
    showPiece:"visibility:hidden;display:none;",//显示碎片
    text:"",
    pieceImage:"",//碎片图片路径
    pieceAttr:"",//选择的piece的id
    one:"background-color: rgba(255, 255, 255, 0.7);",
    two: "background-color: rgba(255, 255, 255, 0.7);",
    three: "background-color: rgba(255, 255, 255, 0.7);",
    four: "background-color: rgba(255, 255, 255, 0.7);",
    sendType:"",
    scores:"",
    attrIds:"",
    couponIds:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      var showTypep = options.index;
      var scorep = options.score
      that.setData({
        showType: showTypep,
        score: scorep
      });
      // 判断是显示那种图片
      if (showTypep=="2")
      {
        //碎片抽奖
        that.setData({
          url:"../../utils/image/personal/suipianchoujiang.png"
        });
        wx.setNavigationBarTitle({
          title: '碎片抽奖',
        })
      }
      else if (showTypep=="1")
      {
        //普通抽奖
        that.setData({
          url: "../../utils/image/personal/putongchoujiang.png"
        });
        wx.setNavigationBarTitle({
          title: '普通抽奖',
        })
      }
      //获取屏幕信息
      wx.getSystemInfo({
        success: function (res) {
          // console.log(res.model)
          // console.log(res.pixelRatio)
          // console.log(res.windowWidth)
          // console.log(res.windowHeight)
          // console.log(res.language)
          // console.log(res.version)
          that.setData({
            windowwidth: res.windowWidth
          });
        }
      });
      var wid = (that.data.windowwidth-40)/3
      that.setData({
          itemSize:wid
        });
      wx.getStorage({
        key: 'token',
        success: function (res) {
          var token = res.data
          var st = options.index
          var senddata = {
            "tokenSession": token,
            "type":st
          }
          that.setData({
            tokenSession: token
          })
          util.postAjax("lottery/", senddata, that.lotteryCallBack);
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
  getTranslate:function(index)
  {
    var x = index % 3 * (this.itemSize + 10);
    var y = parseInt(index / 3) * (this.itemSize + 10);
    return 'translate(' + x + 'px,' + y + 'px)';
  },
  // 获取的回调
  lotteryCallBack:function(json)
  {
    console.log(json);
    var that = this;
    var data = json.data;
    that.setData({
      lotItemDatas:data
    });
    var getTranslatep = [];
    for(var i =0;i<data.length;i++)
    {
      var itemSize = that.data.itemSize;
      var x = i % 3 * (itemSize + 10);
      var y = parseInt(i / 3) * (itemSize + 10);
      getTranslatep.push('translate(' + x + 'px,' + y + 'px)');
    }
    that.setData({
      getTranslate: getTranslatep
    })
  },
  // 点击item
  lotteryItemClick:function(e)
  {
    console.log(e);
    var that = this;
    that.setData({
      mask:""
    });
    var id = e.currentTarget.dataset.id;
    var lotItemDatasp = that.data.lotItemDatas;
    if (lotItemDatasp[id].type=='1')
    {
      // 积分
      var viewText = "获得" + lotItemDatasp[id].score+"积分";
      that.setData({
        text: viewText,
        showText:"",
        showPiece: "visibility:hidden;display:none;",
        sendType:"1",
        scores: lotItemDatasp[id].score
      })
    }
    else if (lotItemDatasp[id].type == '2')
    {
      //碎片
      that.setData({
        pieceImage: lotItemDatasp[id].goodsImg,//碎片图片路径
        pieceAttr: lotItemDatasp[id].attrId,//选择的piece的id
        showText: "visibility:hidden;display:none;",
        showPiece: "",
        sendType:"2",
        attrIds: lotItemDatasp[id].attrId
      });
      var local = lotItemDatasp[id].local;
      if(local=='1')
      {
        that.setData({
          one: "background-color: rgba(255, 255, 255, 0);",
          two: "background-color: rgba(255, 255, 255, 0.7);",
          three: "background-color: rgba(255, 255, 255, 0.7);",
          four: "background-color: rgba(255, 255, 255, 0.7);",
        });
      }
      else if(local=='2')
      {
        that.setData({
          one: "background-color: rgba(255, 255, 255, 0.7);",
          two: "background-color: rgba(255, 255, 255, 0);",
          three: "background-color: rgba(255, 255, 255, 0.7);",
          four: "background-color: rgba(255, 255, 255, 0.7);",
        });
      }
      else if(local=='3')
      {
        that.setData({
          one: "background-color: rgba(255, 255, 255, 0.7);",
          two: "background-color: rgba(255, 255, 255, 0.7);",
          three: "background-color: rgba(255, 255, 255, 0);",
          four: "background-color: rgba(255, 255, 255, 0.7);",
        });
      }
      else if(local=='4')
      {
        that.setData({
          one: "background-color: rgba(255, 255, 255, 0.7);",
          two: "background-color: rgba(255, 255, 255, 0.7);",
          three: "background-color: rgba(255, 255, 255, 0.7);",
          four: "background-color: rgba(255, 255, 255, 0);",
        })
      }
      
    }
    else if (lotItemDatasp[id].type == '3')
    {
      //优惠券
      var viewText = "￥" + lotItemDatasp[id].price;
      that.setData({
        text: viewText,
        showText: "",
        showPiece: "visibility:hidden;display:none;",
        sendType:"3",
        couponIds:lotItemDatasp[id].couponId
      });
    }
    else if (lotItemDatasp[id].type == '4')
    {
      //谢谢惠顾
      that.setData({
        text: "谢谢惠顾",
        showText: "",
        showPiece: "visibility:hidden;display:none;",
        sendType:"4"
      });
    }
  },
  // 点击兑换按钮
  clickChange:function()
  {
    // flip:"rotateY(180deg)"
    var that = this;
    that.setData({
      flip: ""
    });
    that.sleep(500);
    that.setData({
      flip: "rotateY(180deg)"
    });
    //打乱顺序20次
    var pos = that.data.getTranslate;
    for(var i = 0;i<20;i++)
    {
      // that.sleep(500);
      pos.sort(function () {
        return (0.5 - Math.random());
      });
      that.setData({
        getTranslate:pos
      });
    }
    // 隐藏抽奖按钮
    that.setData({
      hidden:"visibility:hidden;display:none;"
    });
  },
  // 休眠函数
  sleep: function (numberMillis)
  {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
      now = new Date();
      // console.log(now.getTime()+"    4545454         "+exitTime);
      if (now.getTime() > exitTime)
        return; 
    }
  },
  submitChou:function()
  {
    
    var that = this;
    var typep = that.data.sendType;
    var attrIdp = that.data.attrIds;
    var scorep = that.data.scores;
    var couponIdp = that.data.couponIds;
    var sendDatac;
    if (typep=='1')
    {
      sendDatac={
        "type": typep,
        "score": scorep
      }
      util.postAjax("lottery/exchange", sendDatac,that.sendeCallBack);
    }
  },
  sendeCallBack:function(json)
  {
    wx.navigateBack({
      delta: 1
    })
  }
})