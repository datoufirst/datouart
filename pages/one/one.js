var app = getApp()
Page({
  data: {
    block: false,
    none: true,
    title: "",
    titles: '',
    url: '',
    relevant: '',
    money: '',
    playid: ''
  },
  onLoad: function (options) {
    var that = this;
    console.log(options);
    that.setData({
      url: options.url,
      title: options.title,
      relevant: options.relevant,
      titles: options.titles,
      money: options.money,
      playid: options.id
    }),
    console.log(this.data.playid)
    //  请求是否付款成功
    console.log("亲亲个宝贝")
    console.log(wx.getStorageSync('openid'))
    wx.request({
      url: 'https://www.datouart.com/home/moneys/datou_money',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      data: { openid: wx.getStorageSync('openid'), deal_id: that.data.playid },
      success: function (res) {
        console.log(res)
        console.log(5555554444443333333)
        console.log(res.data.status);
        if (res.data.status == 0) {
          that.setData({
            block: false,
            none: true
          })
          console.log('1:还没有购买')
          if(that.data.playid==14){
            that.setData({
              block: true,
              none: false
            })
          }
        } else {
          that.setData({
            block: true,
            none: false
          })
          console.log('2:已经购买了')
        }
      }
    })
  },

  tobuy: function (e) {
    var that = this;
    var openid = wx.getStorageSync('openid')
    console.log('大个头')
    console.log(that.data.playid)
    console.log(openid)
    wx.request({
      url: 'https://www.datouart.com/home/index/pay_money',
      method: 'post',
      header: {
        'content-type': 'application/json'
      },
      data: { openid: openid, deal_id: that.data.playid},
      success(res) {
        console.log(res)
        var timeStamp = res.data.data.timeStamp
        var nonceStr = res.data.data.nonceStr
        var packages = res.data.data.package
        var paySign = res.data.data.paySign
        wx.requestPayment({
          'timeStamp': timeStamp,
          'nonceStr': nonceStr,
          'package': packages,
          'signType': 'MD5',
          'paySign': paySign,
          'success': function (res) {
            console.log(res)
            console.log("支付成功！")
            that.setData({
              block: true,
              none: false
            })
          },
          'fail': function (res) {
            console.log("支付失败~")
            console.log(res)
          }
        })
      }
    })
  }
})