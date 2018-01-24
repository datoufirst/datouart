var app = getApp()
Page({
  data: {
    title: "",
    titles: '',
    url:'',
    relevant:'',
    videoList:'',
    id:'' ,
    money:''
  },
  onLoad: function (options) {
    var that = this;
    console.log(options);
    that.setData({
      url:options.url,
      title:options.title,
      relevant: options.relevant,
      titles: options.titles,
      id: options.id,
      money: options.money,
    }),
      //请求小视频
      wx.request({
      url: 'https://www.datouart.com/home/datouhome/small_video',
        method: 'post',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          let num = (that.data.id - 2) * 5
          console.log(num)     //此时为0
          that.setData({
            videoList: res.data.splice(num,5)   //num 代表从当前这个数字开始取值  5是向后取五条 
          });
          console.log(that.data.videoList)
        }
      })
  },
  //小视频点击的时候跳转页面
  one: function (evt) {
    //点击第几集呈现第几集
      // var id=e.currentTarget.id;
    let url = evt.currentTarget.dataset.url
    let title = evt.currentTarget.dataset.title
    let relevant = evt.currentTarget.dataset.relevant
    let titles = evt.currentTarget.dataset.titles
    let money = evt.currentTarget.dataset.money
    let id = evt.currentTarget.dataset.id
    let sj = evt.currentTarget.dataset.sj
      console.log(url)
    wx.navigateTo({
      url: "../smallvideo/smallvideo?url=" + url + "&title=" + title + "&relevant=" + relevant + "&titles=" + titles + "&money=" + money + "&id=" + id + "&sj=" + sj
    })
  },
})

