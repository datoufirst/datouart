
var app = getApp()

Page({

  data: {
    text: "第二板块     寻宝",
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    listing:[],
    listing1: [],
    listing2: [],
    smallpicture:[],
    smallpicture1: [],
    smallpicture2: [],
    videourl:''
  },

  onLoad: function () {
    var that = this
    // 获取视频
    var openid = wx.getStorageInfo('openid');
    wx.request({
      url: 'https://www.datouart.com/home/datouhome/video_list',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          listing: res.data.slice(12, 16),
          listing1: res.data.slice(16, 20),
          listing2: res.data.slice(20, 24),
          videourl: res.data[12].url
        });
        console.log(that.data.listing)
        console.log(that.data.listing1)
        console.log(that.data.listing2)
      }
    })

    // 获取视频封面
    var openid = wx.getStorageInfo('openid');
    wx.request({
      url: 'https://www.datouart.com/home/datouhome/small_img',
      method: 'post',
      openid: openid,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          smallpicture: res.data.slice(13, 16),
          smallpicture1: res.data.slice(17, 20),
          smallpicture2: res.data.slice(21, 24),
        });
        console.log(that.data.smallpic)

      }
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
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
  //点击第几集呈现第几集
  two: function (evt) {
    // var id=e.currentTarget.id;
    let url = evt.currentTarget.dataset.url
    let title = evt.currentTarget.dataset.title
    let relevant = evt.currentTarget.dataset.relevant
    let titles = evt.currentTarget.dataset.titles
    let money = evt.currentTarget.dataset.money
    let id = evt.currentTarget.dataset.id
    let sj = evt.currentTarget.dataset.sj
    console.log(titles)

   
    wx.navigateTo({
      url: "../one/one?url=" + url + "&title=" + title + "&relevant=" + relevant + "&titles=" + titles + "&money=" + money + "&id=" + id + "&sj=" + sj
    })
  },


  //点击tab切换 
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
})