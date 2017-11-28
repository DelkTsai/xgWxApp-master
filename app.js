//app.js

App({
  //全局变量
  golbalId: {
    appid: 'wx87494935a8db37ba',
    // appid:'wx9e177b3915393ff0',
    secret: '57ba118ad2cea5a8a06e39a0cb744a2d',
    openid: "",
    access_token: "",
    unionid:"",
    code:""
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //获取微信openID
    var that = this;
    var user = wx.getStorageSync('user') || {}

    wx.login({
      success: function (res) {
        that.golbalId.code = res.code;
        if (res.code) {
          // wx.getUserInfo({
          //   success: function (res) {
          //     var objz = {}
          //     objz.avatarUrl = res.userInfo.avatarUrl;
          //     objz.nickName = res.userInfo.nickName;
          //     wx.setStorageSync('userInfo', objz);//存储userInfo 
          //   }
          // });
          // var d = that.golbalId;
          // var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
          // wx.request({
          //   url: l,
          //   data: {},
          //   method: "get",
          //   success: function (res) {
          //     var obj = {};
          //     // console.log("12121212312313");
          //     console.log(res);
          //     obj.openid = res.data.openid;
          //     that.golbalId.openid = res.data.openid;
          //     obj.expires_in = Date.now() + res.data.expires_in;
          //     // wx.setStorageSync('user', obj);//存储openid 
          //     // console.log(obj)
          //     //把信息保存到本地缓存
          //     wx.setStorage({
          //       key: 'userAppMsg',
          //       data: obj
          //     })
          //     //获取access_token
          //     var code_token = that.golbalId.code
          //     // var lat = 'https://api.weixin.qq.com/cqi-bin/token?appid=wx87494935a8db37ba&secret=57ba118ad2cea5a8a06e39a0cb744a2d&grant_type=client_credential'
             
          //       }
          //     });


              // wx.request({
              //   url: 'http://192.168.3.16/shoedog/api/login/miniApps',
              //   // url: 'http://119.23.66.37/shoedog/api/login/miniApps',
              //   // url: 'https://www.sneakerdog.cn/api/login/miniApps',
              //   header: {
              //     "Content-Type": "application/x-www-form-urlencoded"
              //   },
              //   method: "post",
              //   data: {
              //     "openId": that.golbalId.openid,
              //     "unionid": res.data.unionid
              //   },
              //   success: function (json) {
              //     console.log(json)
              //     if (json.data.ret == true) {
              //       wx.setStorage({
              //         key: 'userId',
              //         data: json.data.data.userId
              //       })
              //       wx.setStorage({
              //         key: 'token',
              //         data: json.data.data.tokenSession,
              //       })
              //     }
              //     else {
              //       console.log(json.data.forUser);
              //     }
              //   },
              //   fail: function () {
              //     console.log("fail");
              //   }

              // });



             
          //   }
          // });
              // var urll = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx87494935a8db37ba&secret=57ba118ad2cea5a8a06e39a0cb744a2d&js_code=' + that.golbalId.code + '&grant_type=authorization_code'
              // // 获取unionid
              // wx.request({
              //   // url: 'https://api.weixin.qq.com/cgi-bin/user/info',
              //   url: urll,
              //   data: {
              //     // access_token: that.golbalId.access_token,
              //     // openid: that.golbalId.openid,
              //     // lang:'zh_CN'
              //   },
              //   method: "get",
              //   success: function (res) {
              //     console.log(res);

              //   }
              // })
        

          // wx.getUserInfo({
          //   success: function (res) {
          //     var objz = {}
          //     objz.avatarUrl = res.userInfo.avatarUrl;
          //     objz.nickName = res.userInfo.nickName;
          //     wx.setStorageSync('userInfo', objz);//存储userInfo 
          //   }
          // });
          // var d = that.golbalId;
          // var l = 'https://api.weixin.qq.com/sns/jscode2session?appid= ' + d.appid + ' & secret=' + d.secret + '& js_code=' + res.code + ' & grant_type=authorization_code';
          // wx.request({
          //   url: l,
          //   data: {},
          //   method: "get",
          //   success: function (res) {
          //     var obj = {};
          //     // console.log("12121212312313");
          //     console.log(res);
          //     obj.openid = res.data.openid;
          //     obj.expires_in = Date.now() + res.data.expires_in;
          //     // wx.setStorageSync('user', obj);//存储openid 
          //     // console.log(obj)
          //     //把信息保存到本地缓存
          //     wx.setStorage({
          //       key: 'userAppMsg',
          //       data: obj
          //     })
          //     //这里把openid请求给服务器
          //     wx.request({
          //       // url: 'http://192.168.3.16/shoedog/api/login/miniApps',
          //       // url: 'http://119.23.66.37/shoedog/api/login/miniApps',
          //       url: 'https://www.sneakerdog.cn/api/login/miniApps',
          //       header: {
          //         "Content-Type": "application/x-www-form-urlencoded"
          //       },
          //       method: "post",
          //       data: {
          //         "openId": res.data.openid
          //       },
          //       success: function (json) {
          //         console.log(json)
          //         if (json.data.ret == true) {
          //           wx.setStorage({
          //             key: 'userId',
          //             data: json.data.data.userId
          //           })
          //           wx.setStorage({
          //             key: 'token',
          //             data: json.data.data.tokenSession,
          //           })
          //         }
          //         else {
          //           console.log(json.data.forUser);
          //         }
          //       },
          //       fail: function () {
          //         console.log("fail");
          //       }

          //     })
          //   }
          // });
















        // 这段有用 
          var urll = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx87494935a8db37ba&secret=57ba118ad2cea5a8a06e39a0cb744a2d&js_code=' + that.golbalId.code + '&grant_type=authorization_code'
          // 获取unionid
          wx.request({
            url: urll,
            data: {
            },
            method: "get",
            success: function (res) {
              console.log(res);
              //这里把openid请求给服务器
              wx.request({
                //url: 'http://192.168.3.16/shoedog/api/login/miniApps',
                // url: 'http://119.23.66.37/shoedog/api/login/miniApps',
                 url: 'https://www.sneakerdog.cn/api/login/miniApps',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "post",
                data: {
                  "openId": res.data.openid,
                  "unionId": res.data.unionid
                },
                success: function (json) {
                  console.log(json)
                  if (json.data.ret == true) {
                    wx.setStorage({
                      key: 'userId',
                      data: json.data.data.userId
                    })
                    wx.setStorage({
                      key: 'token',
                      data: json.data.data.tokenSession,
                    })
                  }
                  else {
                    console.log(json.data.forUser);
                  }
                },
                fail: function () {
                  console.log("fail");
                }

              })
          
            }
          })
              
        }
        else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })

  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
