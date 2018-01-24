var app = getApp();
 
Page({
  data: {
    showModalStatus: false,
    phone:'',
    name:'',
    age:'',
    address:'',
    activity_id:'',
    
  },
  onLoad: function (options) {
    var that = this
    console.log(options)
    console.log("叫啥活动 很多事都")
    wx.setStorageSync('detail', options.id)
    that.setData({
      activity_id: options.id,
      img1: options.imgurl1,
      img2: options.imgurl2
    })  
  },

  // 监听手机号
  listenerPhoneInput: function (e) {
    this.data.phone = e.detail.value;

  },
  // 监听宝宝姓名
  listenerNameInput: function (e) {
    this.data.name = e.detail.value;

  },
  // 监听宝宝年龄
  listenerAgeInput: function (e) {
    this.data.age = e.detail.value;
 
  },
  // 监听输入地区
  listenerAddresInput: function (e) {
    this.data.address = e.detail.value;

  },
  // 校验
  phonenumber: function (e) {
    var that = this
    // 正确的手机号码
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var off=false
    // 手机号码不为空
    if (this.data.phone.length == 0 || this.data.phone == null) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'cancel',
        duration: 1500
      })
      return false;
    }
    // 宝宝名称不为空
      else if(this.data.name.length == 0 || this.data.name == null){
      wx.showLoading({
          title: '请填入宝宝名称',
          duration: 1500
        })
        return false;
      }
    // 宝宝年龄不为空
    else if(this.data.age.length == 0 || this.data.age == null){
      wx.showLoading({
          title: '请填入宝宝年龄',
          icon: 'cancel',
          duration: 1500
        })
        return false;
      }
      // 所在地区不为空
    else if( this.data.address.length == 0|| this.data.address == null){
      wx.showLoading({
          title: '请填入所在地区',
          icon: 'cancel',
          duration: 1500
        })
        return false;
      }
      // 手机号长度是否为11位
     else if (this.data.phone.length < 11) {
      wx.showLoading({
        title: '手机号长度有误！',
        icon: 'cancel',
        duration: 1500
      })
      return false;
    } 
    // 是否为正确的是手机号
    else if (!myreg.test(this.data.phone)) {
      wx.showLoading({
        title: '手机号有误！',
        icon: 'cancel',
        duration: 1500
      })
      return false;
    } 
    else{
    console.log("报名成功")
    var that = this
    var openid = wx.getStorageSync('openid')
    console.log(openid)
    var mobile = that.data.phone
    var name=that.data.name
    var age=that.data.age
    var city=that.data.address
    var activity_id = that.data.activity_id
    console.log(that.data.phone)
    console.log(name)
    console.log(age)
    console.log(city)

    wx.request({
      url: 'https://www.datouart.com/home/datouhome/qingzi_dong',
      method: "get",
      header: {
        'Content-Type': 'application/json'
      },
      data: { openid: openid, mobile: mobile, name: name, age: age, city: city, activity_id: activity_id},
      success(res) {
        if (res.data.status == 1) {
          console.log(res.data)
          wx.showModal({
            icon: 'cancel',
            content: '报名成功',
          })
          that.setData({
            name: '',
            phone: '',
            age: '',
            address: ''

          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index',
            })
          }, 2000)
          
        } else if (res.data.status == 2){
          console.log(res.data)
          console.log("状态出错")
          wx.showModal({
            icon: 'cancel',
            content: '你已经报过名啦！',
          })
        } else if (res.data.status == 0){
          console.log("缺少参数")
          console.log(res.data.status)
           wx.showModal({
             icon: 'cancel',
             content: '请授权',
           })
        } else if (res.data.status == -1){
          console.log(res.data.status)
          wx.showModal({
            icon: 'cancel',
            content: '网络错误，稍后重试',
          })
        }
      },
      fail: function (res){
            wx.showModal({
              content: '该活动已下架',
            })
      }
    })

  }

  } ,


 
  
})  