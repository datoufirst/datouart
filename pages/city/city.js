// pages/city/city.js
Page({

 
  data: {
    text: "杭州市",
    address: [],
  },
  onLoad: function () {
    this.getAddress()
  },
  city1: function () {
    this.setData({
      text: '杭州市'
    })
  },
  city2: function () {
    this.setData({
      text: '上海市'
    })
  },
  city3: function () {
    this.setData({
      text: '北京市'
    })
  },
  city4: function () {
    this.setData({
      text: '重庆市'
    })
  },
  city5: function () {
    this.setData({
      text: '广州市'
    })
  },
  getAddress: function () {

    var that = this;
    var address = []


    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(longitude)
        console.log(latitude)
        wx.setStorageSync('longitude', res.longitude);
        wx.setStorageSync('latitude', res.latitude);

      }
    })
    var longitude = wx.getStorageSync('longitude');
    var latitude = wx.getStorageSync('latitude');

    wx.request({
      url: 'http://www.datouart.com/home/datouhome/get_user_city?' + 'longitude=' + longitude + '&latitude=' + latitude,
      method: 'get',
      header: {
        'content-type': 'application/json'
      }, 
      success(res) {
        console.log(res)
        console.log(res.data.data)
        address = res.data.data
        console.log(address)
        that.setData({
          address: address
        })
        //console.log(address)
      }
    })

    // that.getShopInfo();
  }
})