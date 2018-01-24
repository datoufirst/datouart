var app = getApp()
Page({
  data: {
    one:'false',
    two:'true',
    nickName: '',
    avatarUrl: '',
    age: '0',
    backgroundUrl: '',
    picture1: '',
    headpic: '',
    list: [],
    topbg:''
  },
  onLoad: function () {
    var that = this;
    var openid = wx.getStorageInfo('openid');
    var nickName = wx.getStorageSync("nickName", nickName);
    var avatarUrl = wx.getStorageSync("avatarUrl", avatarUrl);
    var topbg = wx.getStorageSync('bgtop')
    that.setData({
      nickName: nickName,
      avatarUrl: avatarUrl,
      topbg: topbg
    })
    
    // 获取该用户全部的童画
    wx.request({
      url: 'https://www.datouart.com/home/User/user_tongqus',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      data: { openid: wx.getStorageSync('openid'), type: '童趣' },
      success: function (res) {
        console.log('请求成功')
        console.log(res.data.status)
        if (res.data.status == 1) {
          that.setData({
           one : true,
           two : false
          })

          // console.log(two)
        } else {
          console.log("这是你的全部作品")
          console.log(res)
          that.setData({
            one: false,
            two: true,
            list: res.data
          })
        }


      },
      fail: function (res) {
        console.log('请求失败')
        console.log(res.data)
      }

    })
  },

  //点击跳转
  detailone: function (event) {
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

})

