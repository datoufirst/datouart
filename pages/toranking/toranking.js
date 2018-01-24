
Page({
  data: {
    navbar: ['最新', '最热', '全部'],
    currentTab: 0,
    tonghualist:[],
    mode: 'aspectFill',
    newlist:'',
    hotlist:'',
    userimg: '', //用户头像
    username: '', //用户名称
    age: '',
    click_num: '',
    share: '',
    zan: 0,
    img: '',  //作品图
    name: '',
    time: '',
    message: '',
    evaluate: '', //评论
  },
  onLoad: function () {
    var that = this;
    var openid = wx.getStorageInfo('openid');
    // 获取全部用户作品
    wx.request({
      url: 'https://www.datouart.com/home/datouhome/list_tongqu?tongqu=童画',
      method:'get',
      header:{
        'content-type': 'application/json'
      },
      success:function(res){
        console.log("获取全部用户的童画请求成功")
         console.log(res.data)
         var i=res.data.length
         var arr = [];
         for (var a = res.data.length - 1; a >= res.data.length - 6; a--) {
           arr.push(res.data[a]);
         };
         that.setData({
           tonghualist:res.data
         })
         console.log(that.data.newlist)
      },
      fail:function(res){
        console.log("请求失败")
        console.log(res.data)
      }
    })

  //  获取最热的
    wx.request({
      url: 'https://www.datouart.com/home/datouhome/list_zan_tonghua',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      data: { tongqu:'童画'},
      success:function(res){
        console.log('最热的童画')
        console.log(res.data)
        that.setData({
          hotlist:res.data
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
        console.log('最新的童画')
        that.setData({
          newlist: res.data
        })
      }
    }) 
  },
  
  

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
 detailone:function (event) {
   console.log("宝宝1")
    console.log(event)
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detailone/detailone?id=' + id
    })
  },
})  