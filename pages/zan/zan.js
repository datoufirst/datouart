Page({
  data: {
    zanlist:''
  },

  
  onLoad: function (options) {
    //  获取点赞信息
    var that=this
    wx.request({
      url: 'https://www.datouart.com/home/user/user_zan_list',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      data:{
        openid: wx.getStorageSync('openid')
      },
      success:function(res){
        console.log(res.data)
        that.setData({
           zanlist:res.data
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('加载更多')
    setTimeout(() => {
      this.setData({
        isHideLoadMore: true,
        recommends: [
          {
            goodId: 7,
            name: 'OLAY玉兰油精油沐浴露玫瑰滋养二合一450ml',
            url: 'bill',
            imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161213/148162245074.jpg',
            newprice: "￥36.60",
            oldprice: "￥40.00",
          },
          {
            goodId: 10,
            name: '兰蔻玫瑰清滢保湿柔肤水嫩肤水化妆水400ml补水保湿温和不刺激',
            url: 'bill',
            imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148057937593.jpg',
            newprice: "￥30.00",
            oldprice: "￥80.00",
          }, {
            goodId: 11,
            name: 'Lancome/兰蔻清莹柔肤爽肤水/粉水400ml补水保湿玫瑰水化妆水',
            url: 'bill',
            imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148057953326.jpg',
            newprice: "￥30.00",
            oldprice: "￥80.00",
          },
          {
            goodId: 12,
            name: '美国CLINIQUE倩碧黄油无油/特效润肤露125ml',
            url: 'bill',
            imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/14805828016.jpg',
            newprice: "￥239.00",
            oldprice: "￥320.00",
          },
          {
            goodId: 13,
            name: '法国LANCOME兰蔻柔皙轻透隔离防晒乳霜50ML2017年3月到期',
            url: 'bill',
            imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148058014894.jpg',
            newprice: "￥130.00",
            oldprice: "￥180.00",
          },
        ],
      })
    }, 1000)
  },

})