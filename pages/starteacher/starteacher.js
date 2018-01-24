var app = getApp()
Page({
  data: {
    navbar: ['全部', '最新', '最热'],
    currentTab: 0,
    teacherpic1:'',
    teacherpic2: '',
    teacherpic3: '',
    teacherpic4: '',
    teacherself1:'',
    teacherself2: '',
    teacherself3: '',
    teacherself4: '',
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
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
          teacherpic1: res.data[82].imgId,
          teacherself1: res.data[81].imgId,

          teacherpic2: res.data[86].imgId,
          teacherself2: res.data[87].imgId,

          teacherpic3: res.data[91].imgId,
          teacherself3: res.data[92].imgId,

          teacherpic4: res.data[96].imgId,
          teacherself4: res.data[97].imgId,
        });
      }
    })
  },
}) 