Page({
  data: {
    text: "浙江",
    address:[],
   
  },
  onLoad:function(){
    this.getAddress()
  },
  // 获取位置信息 
  // 获取当前地址
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
  },
  // getweizhi: function () {
  //   var that = this;
  //   wx.getLocation({
  //     type: 'wgs84',
  //     success: function (res) {
  //       var latitude = res.latitude
  //       var longitude = res.longitude
  //       that.setData({
  //         latitude: latitude,
  //         longitude: longitude
  //       })
  //       console.log(latitude)
  //       console.log(longitude)
  //       wx.setStorageSync("latitude", latitude)
  //       wx.setStorageSync("longitude", longitude)
  //       var latitude = that.data.latitude
  //       // var longitude = this.data.longitude
  //       var city = ""
  //       var day = ""
  //       var pic = ""
  //       var cityid = ""
  //       wx.request({
  //         url:'http://www.datouart.com/home/datouhome/get_user_city?latitude=30.2087&longitude=120.1498'  + latitude + '&longitude=' + longitude,
  //         data: {},
  //         method: 'GET',
  //         header: {
  //           'content-type': 'application/json'
  //         },
  //         success: function (res) {
  //           city = res.data.data
  //           cityid = res.data.city
  //           that.setData({
  //           city: city,
  //           cityid: cityid
  //           })
  //           console.log(cityid)
  //           console.log(city)
  //           var cityid = wx.setStorageSync("cityid", cityid)
  //         },
  //       })
  //     }
  //   })
  // },

  city1: function () {
    this.setData({
      text: '安徽'
    })
  },
  city2: function () {
    this.setData({
      text: '澳门'
    })
  },
  city3: function () {
    this.setData({
      text: '北京'
    })
  },
  city4: function () {
    this.setData({
      text: '重庆'
    })
  },
  city5: function () {
    this.setData({
      text: '福建'
    })
  },
  city6: function () {
    this.setData({
      text: '广东'
    })
  },
  city7: function () {
    this.setData({
      text: '甘肃'
    })
  },
  city8: function () {
    this.setData({
      text: '广西'
    })
  },
  city9: function () {
    this.setData({
      text: '贵州'
    })
  },
  city10: function () {
    this.setData({
      text: '河北'
    })
  },
  city11: function () {
    this.setData({
      text: '湖北'
    })
  },
  city12: function () {
    this.setData({
      text: '黑龙江'
    })
  },
  city13: function () {
    this.setData({
      text: '海南'
    })
  },
  city14: function () {
    this.setData({
      text: '河南'
    })
  },
  city15: function () {
    this.setData({
      text: '湖南'
    })
  },
  city16: function () {
    this.setData({
      text: '吉林'
    })
  },
  city17: function () {
    this.setData({
      text: '江苏'
    })
  },
  city18: function () {
    this.setData({
      text: '江西'
    })
  },
   city19: function () {
    this.setData({
      text: '辽宁'
    })
  },
   city20: function () {
    this.setData({
      text: '内蒙古'
    })
  },
  city21: function () {
    this.setData({
      text: '宁夏'
    })
  },
  city22: function () {
    this.setData({
      text: '青海'
    })
  },
  city23: function () {
    this.setData({
      text: '四川'
    })
  },
  city24: function () {
    this.setData({
      text: '山东'
    })
  },
  city25: function () {
    this.setData({
      text: '上海'
    })
  },
  city26: function () {
    this.setData({
      text: '陕西'
    })
  },
  city27: function () {
    this.setData({
      text: '山西'
    })
  },
  city28: function () {
    this.setData({
      text: '天津'
    })
  },
  city29: function () {
    this.setData({
      text: '台湾'
    })
  },
  city30: function () {
    this.setData({
      text: '西藏'
    })
  },
  city31: function () {
    this.setData({
      text: '香港'
    })
  },
  city32: function () {
    this.setData({
      text: '新疆'
    })
  },
  city33: function () {
    this.setData({
      text: '云南'
    })
  },
})