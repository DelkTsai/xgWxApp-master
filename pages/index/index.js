//index.js
var util = require('../../utils/util.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    currentTab: 0,
    tookenSession: "",
    imgUrls: [],//轮播图数组
    indicatorDots: true,//是否会出现焦点
    autoplay: true,//是否自动播放
    interval: 3000,//自动播放间隔时间
    duration: 200,//滑动动画时间
    weekGoods: "",//每周抢鞋
    shoeList: [],//商品列表
    shopLastId: "",//商城的lastid
    shopSearchValue: "",//商城搜索关键字
    windowWidth:"",//屏幕宽度
    buttonS:"",//筛选按钮样式
    shuzu: [],
    ziXunList:[],//潮流资讯列表
    ziXunLastId:""//潮流资讯lastId
    ,dingZhiList:[]//球鞋定制列表
    ,tabPageHeight:0
    ,showModal:false//显示模态框
    , dingZhiImgList:""//模态框显示的图片
    ,dingZhiModalSwiperCurrentTab:0
    , dingZhiModalSwiperMax:0
    ,dingZhiImgWidth:0
    ,homeSlide:""//首页轮播图 每周枪鞋
    ,filterContent:null//筛选内容
    ,filterRefresh:false//是否根据筛选刷新
    
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow:function(){
    wx.stopPullDownRefresh();
    if (this.data.filterContent != null) {
      var sendFirstPageShoe = {
        "tokenSession": this.data.tokenSession,
        "lastId": "",
        "searchValue": this.data.filterContent
      }
      util.getAjax("home/mall", sendFirstPageShoe, this.firstPageShoeCallBack);
      this.data.filterContent == null;
    }
  }
  ,
  onLoad: function () {
    var that = this;
   
    
    // 获取首页商城数据
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          tokenSession: res.data
        });
        if (that.data.currentTab == 0) {
          var token = res.data;
          var sendFirstPage = {
            "tokenSession": token
          }
          util.getAjax("home/", sendFirstPage, that.shopCallBack);
          var sendFirstPageShoe = {
            "tokenSession": that.data.tokenSession,
            "lastId": "",
            "searchValue": ""
          }
          util.getAjax("home/mall", sendFirstPageShoe, that.firstPageShoeCallBack);
        }

      }
    });
    //获取屏幕信息
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.model)
        // console.log(res.pixelRatio)
        console.log(res.windowWidth)
        // console.log(res.windowHeight)
        // console.log(res.language)
        // console.log(res.version)
        that.setData({
          windowWidth: res.windowWidth
          ,tabPageHeight : res.windowHeight
          , dingZhiImgWidth: (res.windowWidth-30)/2
        });
      }
    });
    wx.setNavigationBarTitle({
      title: '首页',
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var sendButoomData;
    if (that.data.currentTab == 0) {
      //商场商品
      sendButoomData = {
        "tokenSession": that.data.tokenSession,
        "lastId": that.data.shopLastId,
        "searchValue": that.data.shopSearchValue
      }
      util.getAjax("home/mall", sendButoomData, that.firstPageShoeCallBack);
      util.getAjax("home/mall", null, that.firstPageShoeCallBack);
    }
    else if (that.data.currentTab == 1) {
      //球鞋定制
    }
    else if (that.data.currentTab == 2) {
      //潮流资讯
    }
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTba: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //商城获取数据之后的回调
  shopCallBack: function (json) {
    wx.stopPullDownRefresh();
    var that = this;
    console.log(json);
    that.setData({
      imgUrls: json.data.slide,
      weekGoods: json.data.weekGoods,
    });
    // 设置筛选按钮位置
    
    wx.getSystemInfo({
      success: function (res) {
        var wi = res.windowWidth;
        var le = (wi-94)/2
        that.setData({
          buttonS:le
        })
        
      }
    });
  },
  // 转跳到商品详情
  jumpCollection: function (event) {
    var goodsId = event.currentTarget.dataset.goodsId
    var dataType = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../personal/collectionDetail?goodsId=' + goodsId + "&type=" + dataType
    })
  },
  // 商城没有搜索第一页返回页面
  firstPageShoeCallBack: function (json) {
    var that = this;
    that.data.shuzu = [];
    if (json.ret) {
      for (var i = 0; i < json.data.length; i++) {
        if (i == json.data.length - 1) {
          var lastid = json.data[i].goodsId
          that.setData({
            shopLastId: lastid
          })
        }
        that.data.shuzu.push(json.data[i]);
      }
      that.setData({
        shoeList: that.data.shuzu
      });
    }
  }
  //潮流资讯 刷新回调
  ,ziXunRefreshCallback:function(json){
    wx.stopPullDownRefresh();
    this.setData({
      ziXunList: json.data
    })  ;
  }
  //潮流资讯 加载回调
  , ziXunLoadMoreCallback: function (json) {
    if(json.data!=null && json.data.length==0){
      wx.showToast({
        title: '已经到底了',
      })
      return;
    }
  
    var orgList = this.data.ziXunList;
    orgList=orgList.concat(json.data);
    this.setData({
      ziXunList: orgList
    });
  }
  //资讯 上拉加载
  , ziXunLoadMore: function (event) {
    var _lastId = this.data.ziXunList[this.data.ziXunList.length - 1].infoId;
    var par = {
      lastId: _lastId
    };
    util.getAjax("home/info", par,this.ziXunLoadMoreCallback);
  }
  //球鞋定制 刷新回调
  ,dingZhiRefreshCallback:function(json){
    wx.stopPullDownRefresh()
    this.setData({
      dingZhiList: json.data
    });
  }
  //球鞋定制 加载回调
  , dingZhiLoarMoreCallback: function (json) {
    console.log(json);
    if (json.data != null && json.data.length == 0) {
      wx.showToast({
        title: '已经到底了',
      })
      return;
    }

    var orgList = this.data.dingZhiList;
    orgList=orgList.concat(json.data);
    this.setData({
      dingZhiList: orgList
    });
  }
  //球鞋定制 上拉加载
  , dingZhiLoadMore: function (event) {
    console.log(this.data.dingZhiList);
    var lastKey="";
    for (var keyname in this.data.dingZhiList) {
      lastKey = keyname;
    }
    var lastGroup = this.data.dingZhiList[lastKey];
    var _caseId = lastGroup[lastGroup.length-1].caseId;
    var par = {
      lastId: _caseId
    };

    console.log(par);
    util.getAjax("home/cases", par, this.dingZhiLoarMoreCallback);

  }
  //潮流资讯点击
  ,ziXunClick(event){
    wx.navigateTo({
      url: 'ziXun/ziXunDetail?infoId=' + event.currentTarget.dataset.infoId + "&infoTitle=" + event.currentTarget.dataset.infoTitle,
    })
  }
  //球鞋定制
  ,dingZhiClick(event){
    wx.previewImage({urls:event.currentTarget.dataset.imageList});
  }
  //隐藏模态框
  ,hideModal(event){
    this.setData({
      showModal: false
    })
  }
  //定制模态框换页
  ,dingZhiModalChangePage(event){

    var addPage = event.currentTarget.dataset.add;
    var current = this.data.dingZhiModalSwiperCurrentTab;
    var max = this.data.dingZhiModalSwiperMax;

    var page = parseInt(current) + parseInt(addPage)

    if (addPage > 0 && current >= max-1
    ||addPage<0&&current<=0){
      return;
    }
    this.setData({
      dingZhiModalSwiperCurrentTab: page
    })
  }
  //首页轮播图获取
  ,homeSliderCallback(json){
    this.setData({
      homeSlide:json
    });
  }
  //首页商城加载更多
  ,shangChengLoadMore(event) {
    console.log(this.data.shoeList);
    console.log(this.data.shoeList.length);

    var goodsId = this.data.shoeList[this.data.shoeList.length - 1].goodsId;
    console.log(goodsId);
    var par = {
      "tokenSession": this.data.tokenSession,
      "lastId": "",
      "searchValue": this.data.filterContent
    }
    util.getAjax("home/mall", par, this.shangChengLoadMoreCallback);
  }
  //首页商城加载更多
  ,shangChengLoadMoreCallback(json)
  {
    console.log(json);
    var _shoeList = this.data.shoeList;
    if (json.data == null || json.data.length==0){
      wx.showToast({
        title: '已经到底了',
      })
      return;
    }

    _shoeList=_shoeList.concat(json.data);
    console.log(_shoeList);
    this.setData({
      shoeList: _shoeList
    });
  }
  //商城 定制 资讯 tab 切换事件
  ,OnTabChangeEvent(event){
    var current = event.detail.current;
    this.setData({
      currentTab: current
    });
    if (current == 1 && (this.data.dingZhiList == null || this.data.dingZhiList.length == 0 )) {
      util.getAjax("home/cases", "", this.dingZhiRefreshCallback);
    } else if (current == 2 && (this.data.ziXunList == null || this.data.ziXunList.length==0)){
      util.getAjax("home/info", "", this.ziXunRefreshCallback);
    }
  }
  ,//筛选按钮点击
  OnFilterClick(event)
  {
    var para = "";
    if (this.data.filterContent!=null)
    {
      para = "?filterContent="+JSON.stringify(this.data.filterContent);
    }
    wx.navigateTo({
      url: 'filter/filterPage' + para,
    });
  }
  ,
  onPullDownRefresh: function () {
    if (this.data.currentTab==0){
      var that = this;
      // 获取首页商城数据
      wx.getStorage({
        key: 'token',
        success: function (res) {
          that.setData({
            tokenSession: res.data
          });
          if (that.data.currentTab == 0) {
            var token = res.data;
            var sendFirstPage = {
              "tokenSession": token
            }
            util.getAjax("home/", sendFirstPage, that.shopCallBack);
            var sendFirstPageShoe = {
              "tokenSession": that.data.tokenSession,
              "lastId": "",
              "searchValue": ""
            }
            util.getAjax("home/mall", sendFirstPageShoe, that.firstPageShoeCallBack);
          }

        }
      });
    } else if (this.data.currentTab == 1){
      util.getAjax("home/cases", "", this.dingZhiRefreshCallback);

    } else if (this.data.currentTab == 2){
      util.getAjax("home/info", "", this.ziXunRefreshCallback);
    }
    // wx.showNavigationBarLoading() //在标题栏中显示加载

    // //模拟加载
    // setTimeout(function () {
    //   // complete
    //   wx.hideNavigationBarLoading() //完成停止加载
    //   wx.stopPullDownRefresh() //停止下拉刷新
    // }, 1500);
  }
  //球鞋定制，弹出图片  我要定制
  ,onWoYaoDingZhiClick(event)
  {

  }
  //每周抢鞋点击
  ,onQiangXieClick(event)
  {
    var goodsId = event.currentTarget.dataset.goodsId;
    wx.navigateTo({
      url: 'qiangxie/qiangxie?goodsId='+goodsId+"&type=2",
    })
  }
  //球鞋发售点击
  ,onFaShouClick(event)
  {
    var goodsId = event.currentTarget.dataset.goodsId;
    wx.navigateTo({
      url: 'qiangxie/qiangxie?goodsId=' + goodsId + "&type=3",
    })
  }
})
