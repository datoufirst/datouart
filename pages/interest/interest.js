var app = getApp()
Page({
 
  data: {
    mode: 'aspectFill',
    backgroundUrl: '',
    picture1: '',
    headpic: '',
    selfie1: '',
    selfie2: '',
    selfie3: '',
    selfie4: ''
  },
  onLoad: function () {
    var that = this;
    var openid = wx.getStorageInfo('openid');

    //请求图片
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
          pic: res.data,
          backgroundUrl: res.data[37].imgId,//第一张图片的id
          picture1: res.data[18].imgId,
          headpic: res.data[0].imgId,
          selfie1: res.data[20].imgId,
          selfie2: res.data[19].imgId,
          selfie3: res.data[18].imgId,
          selfie4: res.data[17].imgId,
          
        });
      }
    })
  },


  detailone: function () {
    wx.navigateTo({
      url: '../interestone/interestone'
    })
  },

  setting: function () {
    wx.navigateTo({
      url: '../setting/setting'
    })
  },
}) 