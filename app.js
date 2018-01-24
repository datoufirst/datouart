
App({
 
  onLaunch: function (ops) {
    console.log('onLaunch:\n', ops)
      if (ops.scene == 1044) {
        console.log(ops.shareTicket)
      }
   

    var that=this
   
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)



    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;     //获取所需的js_code
        var code = wx.setStorageSync("code", code);
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        var width = res.windowWidth;
        var height = res.windowHeight;
        wx.setStorageSync("width", width);
        wx.setStorageSync("height", height);
      },
     })
     
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        console.log(userInfo)
        console.log(666666666)
    
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  // that.globalData.userInfo = res.userInfo
                  // var nickName = that.globalData.userInfo.nickName
                  // var avatarUrl = that.globalData.userInfo.avatarUrl
                  // var city = that.globalData.userInfo.city
                  // var gender = that.globalData.userInfo.gender
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                  wx.setStorageSync("avatarUrl", avatarUrl)
                  wx.setStorageSync("nickName", nickName)
                //  var nickName = wx.getStorageSync('nickName')
                  var code = wx.getStorageSync("code");
                  wx.request({
                    url: that.globalData.host_url + "/home/datouhome/get_user_openid",
                    method: "get",
                    data: { username: nickName, js_code: code, picture: avatarUrl, city: city, sex: gender },    
                    header: {
                      "content-type": "application/json"
                    },
                    success: function (res) {
                      console.log(res.data);
                      // 缓存openid
                      var openid = res.data.openid
                      that.globalData.openid = openid
                      wx.setStorageSync("openid", openid)
                      console.log("这是用户唯一标识：")
                      console.log(wx.getStorageSync('openid'))
                      wx.setStorage({
                        key: 'openid',
                        data: openid,
                      })
                      // 缓存session_key
                      var session_key = res.data.session_key
                      wx.setStorageSync("session_key", session_key)
                      console.log("session_key的值:")
                      console.log(wx.getStorageSync('session_key'))
                      wx.setStorage({
                        key: 'session_key',
                        data: session_key,
                      })
                    }
                  })
                }
              })
            }
          }
        })
      },
    })
        // this.getuser()
    
  },
    
    // getuser(){
    //   var that=this
        
    //   },
    globalData: {
      userInfo: null,
      host_url: "https://www.datouart.com",
      openid: null
    }
})