var app = getApp()
Page({
  data: {
    navbar: ['老师格言', '相关作品'],
    
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    teacher1: '',
    production1:'',
    production2: '',
    production3: '',
    production4: '',
    bgtop: wx.getStorageSync('bgtop')
  },

  onLoad: function () {
    var that = this;
    var openid = wx.getStorageInfo('openid');

    //请求图片
    wx.request({
      url: 'https://www.datouart.com/home/datouhome/relevant',
      method: 'post',
      openid: openid,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          teacher1: res.data[81].imgId,
          production1: res.data[82].imgId,
          production2: res.data[83].imgId,
          production3: res.data[84].imgId,
          production4: res.data[85].imgId,
        });
      }
    })
  },

  //页面跳转
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  post: function () {
    wx.navigateTo({
      url: '../post/post'
    })
  },

})
