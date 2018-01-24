var app = getApp()
Page({ 
  data: {
    a: false,
    b: true,
    navbar: ['亲子活动', '儿童畅游'],
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    activeinfo:''
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  onLoad: function () {
    var that=this
    // 获取全部的活动
    var active = ''
    wx.request({
      url: 'https://www.datouart.com/home/datouhome/hds_activitys',
      method: 'post',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log(res)
        active = res.data
        console.log(active)
        console.log('--11111111111--')
        that.setData({
          activeinfo: active,
        })
      }
    })
    //  判断用户是否授权
    console.log(1212123333333333)
    console.log(wx.getStorageSync('session_key'))
    var session_key=''
    wx.getStorage({
      key: 'session_key',
      success: function(res) {
        console.log(11111111111111)
        console.log(res.data)
        session_key=res.data
      },
    })
    if (wx.getStorageSync('session_key') || session_key) {
      console.log('用户授权了')
    } else {
      console.log('用户首页拒绝授权')
      wx.showModal({
        title: '需要授权',
        content: '点击确定 授权之后才可以体验该页面',
        success: function () {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting["scope.userInfo"]) {
                wx.login({
                  success: function (res_login) {
                    var code = res_login.code
                    console.log(res_login.code)
                    if (res_login.code) {
                      wx.getUserInfo({
                        withCredentials: true,
                        success: function (res) {
                          console.log(5555555555555555)
                          console.log(res.userInfo)
                          var nickName = res.userInfo.nickName
                          var avatarUrl = res.userInfo.avatarUrl
                          var city = res.userInfo.city
                          var gender = res.userInfo.gender
                          wx.setStorageSync("avatarUrl", avatarUrl)
                          wx.setStorageSync("nickName", nickName)
                          wx.setStorageSync("gender", gender)

                          wx.request({
                            url: that.globalData.host_url + "/home/datouhome/get_user_openid",
                            data: { username: nickName, js_code: code, picture: avatarUrl, city: city, sex: gender },
                            method: 'GET',
                            header: {
                              'content-type': 'application/json'
                            },
                            success: function (res) {
                              console.log(res.data)
                              // 缓存openid
                              var openid = res.data.openid
                              that.globalData.openid = openid
                              wx.setStorageSync("openid", openid)
                              console.log('这是用户的唯一标识')
                              console.log(wx.getStorageSync('openid'))

                              // 缓存session_key
                              var session_key = res.data.session_key
                              wx.setStorageSync("session_key", session_key)
                              console.log("这是用户的session_key：")
                              console.log(wx.getStorageSync('session_key'))
                              that.setData({
                                a: false,
                                b: true
                              })
                            }
                          })
                        }
                      })
                    }
                  },
                });
              }
            }, fail: function (res) {
              that.setData({
                a: true,
                b: false
              })
            }
          })
        },
        fail: function () {
          that.setData({
            a: true,
            b: false
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    host_url: "https://www.datouart.com",
    openid: null
  },
  
  // 点击报名
  join: function (event) {
    console.log("传参数传参数")
    console.log(event)
    var id = event.currentTarget.dataset.id
    let imgurl1 = event.currentTarget.dataset.topimg
    let imgurl2 = event.currentTarget.dataset.botimg
    let status = event.currentTarget.dataset.status
    var that = this
    if (status == 3) {
      wx.showModal({
        title: '该活动已经结束',
        content: '活动结束啦',
      })
    } else {
      wx.navigateTo({
        url: '../register/register?imgurl1=' + imgurl1 + "&imgurl2=" + imgurl2 + "&id=" + id
      })
    }
  },

  // 点击切换
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
})  