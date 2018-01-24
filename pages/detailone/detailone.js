var app = getApp()
Page({
  data: {
    flag: true,
    a: false,
    b: true,
    mode: 'aspectFill',
    workid: '', //作品id
    nickName: '',
    code: '',
    avatarUrl: '',
    tongqulist: '',
    city: '',
    gender: '',
    userimg: '', //用户头像
    username: '', //用户名称
    age: '',
    click_num: '',
    share: '',
    zan: 0,
    img: '',  //作品图
    name: '',
    time: '',
    message: '',
    evaluate: '', //评论
  },
  onLoad: function (options) {

    console.log('stat-options:/n', options)
    console.log(options)
    var that = this
    var detail = options.id
    wx.setStorageSync('detail', detail)
    that.setData({
      workid: options.id,   //作品id
    })
    //获取详情
    var workid = that.data.workid
    wx.request({
      url: 'https://www.datouart.com/home/datouhome/add_dian',
      method: 'get',
      data: { id: workid },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          // workid: res.data[0].workid,从前边带过来的workid，后面不要再次赋值
          username: res.data[0].username,
          userimg: res.data[0].update_time,

          age: res.data[0].age,
          click_num: res.data[0].click_num + 1,
          share: res.data[0].share, //分享量
          zan: res.data[0].zan,
          img: res.data[0].img,
          name: res.data[0].name,
          time: res.data[0].create_time,
          message: res.data[0].message,
          evaluate: res.data[0].evaluate,//评论
        });
      }
    })
    //用户进来授权 
    var session_key = wx.getStorageSync('session_key')
    if (session_key) {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
            city: res.userInfo.city,
            gender: res.userInfo.gender
          })
        },
        fail: function () {
          // fail
          console.log("获取失败！")
        },
        complete: function () {
          // complete
          console.log("获取用户信息完成！")
        }
      })
    } else {
      // app.cc()
      // app.getuser()
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.getUserInfo({
              withCredentials: true,
              success: function (res_user) {
                console.log(44444444444444444)
                console.log(res_user.userInfo)
                var nickName = res_user.userInfo.nickName
                var avatarUrl = res_user.userInfo.avatarUrl
                var city = res_user.userInfo.city
                var gender = res_user.userInfo.gender

                wx.request({
                  //后台接口地址
                  url: that.globalData.host_url + "/home/datouhome/get_user_openid",
                  data: { username: nickName, js_code: res.code, picture: avatarUrl, city: city, sex: gender },
                  method: 'get',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    that.setData({
                      nickName: res.data.nickName,
                      avatarUrl: res.data.avatarUrl,
                    })
                    // 缓存openid
                    var openid = res.data.openid
                    that.globalData.openid = openid
                    wx.setStorageSync("openid", openid)

                    wx.setStorage({
                      key: 'openid',
                      data: openid,
                    })
                    // 缓存session_key
                    var session_key = res.data.session_key
                    wx.setStorageSync("session_key", session_key)
                    console.log("这是用户的session_key：")
                    console.log(wx.getStorageSync('session_key'))
                    wx.setStorage({
                      key: 'session_key',
                      data: session_key,
                    })
                  }
                })
              }, fail: function () {
                wx.showModal({
                  title: '警告通知',
                  content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                  success: function (res) {

                    that.setData({
                      a: true,
                      b: false
                    })

                    if (res.confirm) {
                      wx.openSetting({
                        success: (res) => {
                          if (res.authSetting["scope.userInfo"]) {//如果用户重新同意了授权登录
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
                              }
                            });
                          }
                        }, fail: function (res) {

                        }
                      })

                    }
                  }
                })
              }, complete: function (res) {
              }
            })
          }
        }
      })
    }
    // 获取全部用户作品--前四个
    wx.request({
      url: 'https://www.datouart.com/home/datouhome/list_tongqu?tongqu=童画',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("获取全部用户的童画请求成功")
        console.log(res.data)
        var arr = [];
        for (var i = 0; i < 4; i++) {
          arr.push(res.data[i]);
        };
        that.setData({
          tonghualist: arr,
        })
        console.log(that.data.tonghualist)
      },
      fail: function (res) {
        console.log("请求失败")
        console.log(res.data)
      }
    })
    //  获取评论
    wx.request({
      url: 'https://www.datouart.com/home/user/user_list_pl',
      method: 'get',
      data: { deal_id: this.data.workid },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('全部的评论')
        console.log(res.data)
        that.setData({
          evaluatelist: res.data
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    host_url: "https://www.datouart.com",
    openid: null
  },
  //作品点赞 这个workid  就是这个作品的编号  编号是不变的 重新赋值没有意义 但是重新赋值也没有错  估计是写法不对
  zan: function () {
    var that = this
    var nickName = wx.getStorageSync('nickName')
    var avatarUrl = wx.getStorageSync('avatarUrl')
    wx.request({
      url: 'https://www.datouart.com/home/user/xin_add_zan',
      method: 'get',
      data: { id: this.data.workid, openid: wx.getStorageSync('openid'), username: nickName, picture: avatarUrl },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.status == 1) {
          that.setData({
            zan: that.data.zan + 1
          })
          wx.showToast({
            title: '点赞成功',
            duration: 1500,
          })

        } else if (res.data.status == 2) {
          zan: that.data.zan
          wx.showToast({
            title: '您已经点过赞了',
            duration: 1500,
          })
        } else {
          wx.showModal({
            title: '请授权',
            content: '点击授权才可以体验该页面',
          })
        }
      }
    });
  },
  // 页面分享给朋友
  onShareAppMessage: function (res) {
    var that = this
    var userimg = this.data.userimg
    var username = this.data.username
    var age = this.data.age
    var click_num = this.data.click_num
    var share = true
    var zan = this.data.zan
    var img = this.data.img
    var name = this.data.name
    var time = this.data.time
    var message = this.data.message
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      title: '给我的童画点个赞吧',
      // path: '/pages/detailone/detailone?userimg=' + userimg + "&username=" + username + "&age=" + age + "&click_num=" + click_num + "&zan=" + zan + "&img=" + img + "&name=" + name + "&time=" + time + "&message=" + message,
      path: '/pages/detailone/detailone?id=' + that.data.workid,
      success: function (res) {
        console.log(res)
        share: true
      },
      fail: function (res) {
        console.log("转发失败")
        share: true
      }
    }
  },
  mytext: function (e) {
    this.setData({
      evaluate: e.detail.value
    })
    console.log(this.data.evaluate)
  },
  // 用户评论
  Evaluate: function () {
    var that = this
    console.log(this.data.evaluate)
    if (this.data.evaluate.length == 0) {
      wx.showLoading({
        title: '评论内容为空',
        duration: 1500
      })
    } else {

      console.log(this.data.evaluate)
      var nickName = wx.getStorageSync('nickName')
      var avatarUrl = wx.getStorageSync('avatarUrl')
      wx.request({
        url: 'https://www.datouart.com/home/user/xin_user_comment',
        method: 'get',
        data: { openid: wx.getStorageSync('openid'), id: this.data.workid, evaluate: this.data.evaluate, username: nickName, picture: avatarUrl },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          wx.showToast({
            title: '评论成功',
            duration: 1500
          })
          that.setData({
            evaluate:' '
          })
        }
      })

    }
  }
}) 