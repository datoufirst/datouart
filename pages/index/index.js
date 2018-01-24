var app = getApp()
Page({
  data: {
    imgUrl: '',
    active1: '',
    bg:'',
    banner1:'',
    banner2:'',
    mode: 'aspectFill',
    tonghualist:[],
    tongqulist:[]
  },

  onLoad: function () {
    console.log(wx.getStorageSync('session_key'))
    var that=this
    
    // 首页轮播图
    wx.request({
      url: 'https://www.datouart.com/home/user/advertising',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
        console.log('轮播图广告')
        console.log(res.data)
        console.log(res.data[0].title)
        console.log(res.data[1].title)

        var arrimg = []
        for (var i = 0; i<res.data.length;i++) {
          arrimg.push(res.data[i]);
        }
        console.log(arrimg)
        console.log(arrimg[0].title)
        that.setData({
          arrimg: arrimg,
        })
      }
    })
    // 获取最新的用户作品
    wx.request({
      url: 'https://www.datouart.com/home/datouhome/list_add_tonghua?tongqu=童画',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        console.log('循环最新两个')
        var arr = []
        for (var i = res.data.length - 1; i >= res.data.length - 2; i--) {
          arr.push(res.data[i]);
        }
        console.log(arr)
        that.setData({
          tonghualist: arr
        })
      },
    }) 
    // 获取全部用户两张最新的童趣
    wx.request({
        url: 'https://www.datouart.com/home/datouhome/list_add_tonghua?tongqu=童趣',
        header: {
          'content-type': 'application/json'
        },
        method: 'get',
        success: function (res) {
          console.log('童趣童趣童趣')
          console.log(res.data)
          var arr = []
          for (var i = res.data.length - 1; i >= res.data.length - 2; i--) {
            arr.push(res.data[i]);
          }
          console.log(arr)
          that.setData({
            tongqulist: arr
          })
        },
        fail: function (res) {
        }
      })

    // 获取最新活动
    wx.request({
      url: 'https://www.datouart.com/home/datouhome/hds_activitys',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        console.log('活动获取成功')
        var active1img = res.data[0].imgId
        var active2img = res.data[1].imgId
        wx.setStorageSync('active1img', active1img)
        wx.setStorageSync('active2img', active2img)
        console.log(res.data)
        var arr = []
        for (var i = 0; i < res.data.length; i++) {
          if (res.data.status == 3) {

          }
        }
        that.setData({
          activelist: res.data,
        })
      },
      fail: function (res) {

      }
    })
  },
  globalData: {
    userInfo: null,
    host_url: "https://www.datouart.com",
    openid: null
  },
  detailone: function (event){
    console.log(event)
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detailone/detailone?id=' + id ,
    })
  },
  interestone: function (event){
    console.log(event)
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../interestone/interestone?id=' + id 
    })
  },
  join: function (event) {
    console.log("传参数传参数")
    console.log(event)
    var id = event.currentTarget.dataset.id
    let imgurl1 = event.currentTarget.dataset.topimg
    let imgurl2 = event.currentTarget.dataset.botimg
    let status = event.currentTarget.dataset.status
    if (status == 3) {
      wx.showModal({
        title: '该活动已经结束',
        content: '活动结束啦',
      })
    } else {
      wx.navigateTo({
        url: '../register/register?imgurl1=' + imgurl1 + "&imgurl2=" + imgurl2 + "&id=" + id
      })
    }
  },
  onShareAppMessage: function (res) {
    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    console.log(this.data.workid)
    return {
      title: '和大头儿子一起学画画吧',
      path: '/pages/index/index',
      success:function(res){
        console.log('转发成功')
      },
      fail: function (res) {
        console.log("转发失败")
      }
    }   
    },
  //页面点击跳转
  toast: function () {
    wx.navigateTo({
      url: '../toranking/toranking'
    })
  },
interest: function () {
    wx.navigateTo({
      url: '../interesting/interesting'
    })
  }
})