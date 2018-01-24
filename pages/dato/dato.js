var app = getApp()
Page({
  data: {
      a:false,
      b:true,
      navbar: ['ART课堂', '成长日记', '体验中心', '我的消息'],
      currentTab: 0,
      currentTab: 0,
      nickName:'', 
      avatarUrl:'',
      topbg:'',
      artbg:'',
      artone:'',
      arttwo:'',
      artthree:'',
      artfour:'',
      growbg2:'',
      growbg:'',
      tonghua1:'../../image/upload.jpg',
      tonghua2:'../../image/upload.jpg',
      tonghua1name:'* * *',
      tonghua2name:'* * *',
      tongqu1:'../../image/upload.jpg',
      tongqu2:'../../image/upload.jpg',
      tongqu1text: '* * *',
      tongqu2text: '* * *',
      biggreen_bg:'',
      list:'',
      active1img: wx.getStorageSync('active1img'),
      active2img: wx.getStorageSync('active2img'),
      allteacher:'',
      length:"",
      length2: ""
      
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  
  
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });

  // 获取用户名
      var nickName = wx.getStorageSync("nickName", nickName);
      var avatarUrl = wx.getStorageSync("avatarUrl", avatarUrl);
      console.log(nickName)
      console.log(avatarUrl)
      console.log(wx.getStorageSync('openid'))
      that.setData({
        nickName: nickName,
        avatarUrl: avatarUrl
      })
      console.log(5555555)

      
   //获取页面图片
      var that = this
      wx.request({
        url: 'https://www.datouart.com/home/datouhome/relevant',
        method: 'get',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res);
           console.log(44444444444444444)
           var bgtop = res.data[53].imgId
           wx.setStorageSync('bgtop', bgtop)
           console.log(wx.getStorageSync('bgtop',bgtop))
          that.setData({
             topbg: res.data[53].imgId, 
             artone:res.data[51].imgId,
             arttwo: res.data[73].imgId,
             artthree:res.data[52].imgId,
             artfour:res.data[72].imgId,

              teacher1: res.data[81].imgId
              })
            }
         })

        //  获取该用户的童画
        wx.request({
          url: 'https://www.datouart.com/home/User/user_tongqus',
          method: 'get',
          header: {
            'content-type': 'application/json'
          },
          data: { openid: wx.getStorageSync('openid'),type:'童画'},
          success:function(res){
            console.log('请求成功')
            console.log(11111111111111)
            console.log(res.data)
            console.log(res.data.length)
            that.setData({
              length:res.data.length
            })

            var tonghualist = []
            if(res.data.length>1){
              for (var i = 0; i < 2; i++) {
                tonghualist.push(res.data[i]);
              }
              console.log('哈哈哈哈哈哈哈哈')
              console.log(tonghualist)
              that.setData({
                tonghualist: tonghualist,
                
              })
            } else if (res.data.length == 1){
              tonghualist.push(res.data[0])
              that.setData({
                tonghualist: tonghualist,
              })
            }
            
          },
          fail:function(res){
            console.log('请求失败')
            console.log(res.data)
          }
          
        })
       

        //  获取该用户的童趣
        wx.request({
          url: 'https://www.datouart.com/home/User/user_tongqus',
          method: 'get',
          header: {
            'content-type': 'application/json'
          },
          data: { openid: wx.getStorageSync('openid'), type: '童趣' },
            success: function(res) {
              console.log('请求成功')
              console.log(11111111111111)
              console.log(res.data)
              console.log(res.data.length)
              that.setData({
                length2: res.data.length
              })

              var tonghqulist = []
              if (res.data.length > 1) {
                for (var i = 0; i < 2; i++) {
                  tonghqulist.push(res.data[i]);
                }
                console.log('哈哈哈哈哈哈哈哈')
                console.log(tonghqulist)
                that.setData({
                  tonghqulist: tonghqulist,

                })
              } else if (res.data.length == 1) {
                tonghqulist.push(res.data[0])
                that.setData({
                  tonghqulist: tonghqulist,
                })
              }

            },
         
          fail: function (res) {
            console.log('请求失败')
            console.log(res.data)
          }

        })

        //  判断用户是否授权
        console.log(1212123333333333)
        console.log(wx.getStorageSync('session_key'))
        var session_key = ''
        wx.getStorage({
          key: 'session_key',
          success: function (res) {
            console.log(11111111111111)
            console.log(res.data)
            session_key = res.data
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
                              wx.setStorage({
                                key: 'avatarUrl',
                                data: avatarUrl,
                              })
                              wx.setStorage({
                                key: 'nickName',
                                data: nickName,
                              })
                              wx.getStorage({
                                key: 'avatarUrl',
                                success: function(res) {
                                  console.log('头头像头像头像像')
                                  console.log(res.data)
                                  that.setData({ avatarUrl:res.data})
                                }  
                              })
                              wx.getStorage({
                                key: 'nickName',
                                success: function (res) {
                                  console.log('头头像头像头像像')
                                  console.log(res.data)
                                  that.setData({ nickName: res.data })
                                }
                              })
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

  
  

      // 获取全部的教师
       wx.request({
         url: 'https://www.datouart.com/home/datouhome/teacher_list',
         method: 'get',
         header: {
           'content-type': 'application/json'
         },
         success:function(res){
           console.log('全部的教师')
           console.log(res.data)
           that.setData({
             allteacher:res.data
           }) 

         }
       })

   
  
  },
  globalData: {
    userInfo: null,
    host_url: "https://www.datouart.com",
    openid: null
  },
  // 滑动切换tab 
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
        
      })
    }
  },
   

  // 第一板块
  mine: function () {
    wx.navigateTo({
      url: "../mine/mine"
    })
  },
  // 第二板块寻宝
  moduletwo: function () {
    wx.navigateTo({
      url: "../moduletwo/moduletwo"
    })
  },
  // 第三板块建设中
  modulethree: function () {
    wx.showModal({
      title: '环游世界',
      content: '第三板块开发建设中，敬请期待...',
    })
  },
  // 第四板块建设中
  modulefour: function () {
    wx.showModal({
      title: '星际穿越',
      content: '第四板块开发建设中，敬请期待...',
    })
  },
  zan: function () {
    wx.navigateTo({
      url: "../zan/zan"
    })
  },
  adviess: function () {
    wx.navigateTo({
      url: '../adviess/adviess',
    })
  },
  toset: function () {
    wx.navigateTo({
      url: "../set/set"
    })
  },
  childdraw: function () {
    wx.navigateTo({
      url: "../tofairy/tofairy"
    })
  },
  detailone: function (event) {
      console.log("传参数传参数")
      console.log(event)
      var id = event.currentTarget.dataset.id
      var userimg = event.currentTarget.dataset.userimg
      var username = event.currentTarget.dataset.username
      var workimg = event.currentTarget.dataset.workimg
      var zan = event.currentTarget.dataset.zan
      var message = event.currentTarget.dataset.message
      var workname = event.currentTarget.dataset.workname
      var watch = event.currentTarget.dataset.watch
      var age = event.currentTarget.dataset.age
      var time = event.currentTarget.dataset.time
      wx.navigateTo({
        url: '../detailone/detailone?userimg=' + userimg + "&username=" + username + "&id=" + id + "&workimg=" + workimg + "&zan=" + zan + "&message=" + message + "&workname=" + workname + "&watch=" + watch + "&age=" + age + "&time=" + time,
      })
   
    
  },
  interestone: function (event) {
   
      console.log("传参数传参数")
      console.log(event)
      var id = event.currentTarget.dataset.id
      var userimg = event.currentTarget.dataset.userimg
      var username = event.currentTarget.dataset.username
      var workimg = event.currentTarget.dataset.workimg
      var zan = event.currentTarget.dataset.zan
      var message = event.currentTarget.dataset.message
      var workname = event.currentTarget.dataset.workname
      var watch = event.currentTarget.dataset.watch
      var age = event.currentTarget.dataset.age
      var time = event.currentTarget.dataset.time
      wx.navigateTo({
        url: '../interestone/interestone?userimg=' + userimg + "&username=" + username + "&id=" + id + "&workimg=" + workimg + "&zan=" + zan + "&message=" + message + "&workname=" + workname + "&watch=" + watch + "&age=" + age + "&time=" + time,
      })
   
  },
  topost:function(){
    wx.navigateTo({
      url: '../postto/postto',
    })
  },
  fun: function () {
    wx.navigateTo({
      url: "../fun/fun"
    })
  },
  selection: function () {
    wx.navigateTo({
      url: "../selection/selection"
    })
  },
  myactive: function () {
    wx.navigateTo({
      url: "../myactive/myactive"
    })
  },
  school: function () {
    wx.navigateTo({
      url: "../school/school"
    })
  },
  notice: function () {
    wx.navigateTo({
      url: "../notice/notice"
    })
  },
  city: function () {
    wx.navigateTo({
      url: "../city/city"
    })
  },
  education:function(){
    wx.navigateTo({
      url: "../education/education"
    })
  },
  teacher:function(){
    wx.navigateTo({
      url: "../teacherself/teacherself"
    })
  },
  organization:function(){
    wx.navigateTo({
      url: "../organization/organization"
    })
  }
})  