// pages/mine/mine.js
var app = getApp()

Page({ 

  data: {
    text:"第一板块  探险",
    navbar: ['第一板块  探险', '第二板块     寻宝', '第三板块     环游世界', '第四板块     星际穿越'],
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    array: [],
    list1:[],
    list2: [],
    smallpic:[],
    smallpic1: [],
    smallpic2: [],
  },
  
  onLoad: function () {
    var that = this
    // 获取视频
    var openid = wx.getStorageInfo('openid');
    wx.request({
      url: 'https://www.datouart.com/home/datouhome/video_list',
      method: 'post',
      openid: openid,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          list: res.data.slice(0, 4),
          list1: res.data.slice(4, 8),
          list2: res.data.slice(8, 12),
          videourl: res.data[24].url
        });
        console.log(that.data.list)
        console.log(that.data.list1)
        console.log(that.data.list2)
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

  //点击第一集呈现第几集
  two: function (evt) {
    console.log(evt)
    // var id=e.currentTarget.id;
    let url= evt.currentTarget.dataset.url
    let title = evt.currentTarget.dataset.title
    let relevant = evt.currentTarget.dataset.relevant
    let titles = evt.currentTarget.dataset.titles
    let id = evt.currentTarget.dataset.id
    wx.navigateTo({
      url: "../first/first?url=" + url + "&title=" + title + "&relevant=" + relevant + "&titles=" + titles + "&id=" + id 
    })
  },
}) 