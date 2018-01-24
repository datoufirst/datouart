var app = getApp();
var tempFilePath=''
var imgname=''
Page({
  data: {
    a: false,
    b: true,
    selectPerson: true,
    firstPerson: '童画',
    selectchild: true,
    firstchild: '半年以下',
    selectArea: false,
    img: '../../image/publish.jpg',
    logo:'',
    image:[],
    file:true,
    workname:'',
    workinfo:'',
    load:true
   
  },
 
 onLoad:function(){
   var that=this
    //  判断用户是否授权
    console.log(1212123333333333)
    console.log(wx.getStorageSync('session_key'))
    var session_key = ''
    wx.getStorage({
      key: 'session_key',
      success: function (res) {
        console.log(11111111111111)
        console.log(res.data)
        session_key = res.data
      },
    })
    if (wx.getStorageSync('session_key') || session_key) {
      console.log('用户授权了')
    } else {
      console.log('用户首页拒绝授权')
      wx.showModal({
        title: '需要授权',
        content: '点击确定 授权之后才可以体验该页面',
        success: function () {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting["scope.userInfo"]) {
                wx.login({
                  success: function (res_login) {
                    var code = res_login.code
                    console.log(res_login.code)
                    if (res_login.code) {
                      wx.getUserInfo({
                        withCredentials: true,
                        success: function (res) {
                          console.log(5555555555555555)
                          console.log(res.userInfo)
                          var nickName = res.userInfo.nickName
                          var avatarUrl = res.userInfo.avatarUrl
                          var city = res.userInfo.city
                          var gender = res.userInfo.gender
                          wx.setStorageSync("avatarUrl", avatarUrl)
                          wx.setStorageSync("nickName", nickName)
                          wx.setStorageSync("gender", gender)

                          wx.request({
                            url: that.globalData.host_url + "/home/datouhome/get_user_openid",
                            data: { username: nickName, js_code: code, picture: avatarUrl, city: city, sex: gender },
                            method: 'GET',
                            header: {
                              'content-type': 'application/json'
                            },
                            success: function (res) {
                              console.log(res.data)
                              // 缓存openid
                              var openid = res.data.openid
                              that.globalData.openid = openid
                              wx.setStorageSync("openid", openid)
                              console.log('这是用户的唯一标识')
                              console.log(wx.getStorageSync('openid'))

                              // 缓存session_key
                              var session_key = res.data.session_key
                              wx.setStorageSync("session_key", session_key)
                              console.log("这是用户的session_key：")
                              console.log(wx.getStorageSync('session_key'))
                              that.setData({
                                a: false,
                                b: true
                              })
                            }
                          })
                        }
                      })
                    }
                  },
                });
              }
            }, fail: function (res) {
              that.setData({
                a: true,
                b: false
              })
            }
          })
        },
        fail: function () {
          that.setData({
            a: true,
            b: false
          })
        }
      })
    }

  
 },
 globalData: {
   userInfo: null,
   host_url: "https://www.datouart.com",
   openid: null
 },
  //点击选择类型
  clickPerson: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectArea: true,
        selectPerson: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson: true,
      })
    }
    console.log(this.data.selectPerson)
  },

  //点击切换
  mySelect: function (e) {
    this.setData({
      firstPerson: e.target.dataset.me,
      selectPerson: true,
      selectArea: false,
    })
  },

  //点击选择类型
  clickchild: function () {
    var selectchild = this.data.selectchild;
    if (selectchild == true) {
      this.setData({
        selectArea: true,
        selectchild: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectchild: true,
      })
    }
  },
  //点击切换
  ourSelect: function (e) {
    this.setData({
      firstchild: e.target.dataset.me,
      selectchild: true,
      selectArea: false,
    })
  },
   
  // 先上传图片
  upShopLogo: function () {
    var that = this, 
   
      image = this.data.image;
      
        wx.chooseImage({
            count: 1, 
            sizeType: ['original', 'compressed'], 
            sourceType: ['album', 'camera'], 
            success: function (res) {
            console.log(111111111)
            console.log(res.tempFilePaths)
            // 图片呈现
            tempFilePath = res.tempFilePaths;
            that.setData({
              img: tempFilePath
            })
          
          //  图片上传
            console.log('图片上传')
            console.log(that.data.file)
          if(that.data.file){
            wx.uploadFile({
              url: 'https://www.datouart.com/home/datouhome/add_img',
              filePath: res.tempFilePaths[0],
              name: 'image',
              success: function (info) {
              console.log(info)
              wx.setStorageSync('status', info.data)
              wx.showLoading({
                title: '正在上传',
                duration:3000
              })
              if(info.data==-1){
                console.log('图片太大')
                that.setData({
                  image: '../../image/publish.jpg',
                  file:true
                })
              }else{
                console.log(info.data);
                console.log('上传成功')
                imgname = info.data
                that.setData({
                  file: true
                })
              }
                
              },
              fail: function (info) {
                console.log(info)
                console.log("上传出错")
              }
            })
          }
            
          },
          // 返回的路径
          complete: function (res) {
            image.push(res.tempFilePaths);
            that.setData({
              image: image,
            })
            console.log(res.tempFilePaths[0])
            console.log(6666666666)
          } 
        })
  },

  Workname:function(e){
    this.setData({
      workname: e.detail.value
    })
    console.log(this.data.workname)

  },

  Workinfo: function (e) {
    this.setData({
      workinfo: e.detail.value
    })
    console.log(this.data.workinfo)

  },

  // 提交表单
  formSubmit: function () {
    console.log(wx.getStorageSync('status'))
   
    if (wx.getStorageSync('status')==-1){
       wx.showLoading({
         title: '图片太大',
         duration: 3000
       })
       that.setData({
         file:true
       })
    }else{

    var that = this;
    var nickName = wx.getStorageSync("nickName")
    var openid = wx.getStorageSync('openid')
      console.log('openid')
      if(this.data.workname==0){
         wx.showModal({
           title: '内容不完整哦',
           content: '给作品起一个名字吧',
         })
      } else if (this.data.workinfo == 0){
        wx.showModal({
          title: '内容不完整哦',
          content: '给作品一个简介吧',
        })
      }else{
        console.log('作品的名称')
        console.log(this.data.workname)
        wx.request({
          url: 'https://www.datouart.com/home/datouhome/adds_tonghua',
          method: "get",
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            username: nickName, name: this.data.workname, age: this.data.firstchild, type: this.data.firstPerson, openid: wx.getStorageSync('openid'), message: this.data.workinfo, img: imgname, userimg: wx.getStorageSync("avatarUrl")
          },
          success: function (res) {
            console.log(res.data)
            if(res.data.status == 1){
              wx.showToast({
                title: '发布成功，等待审核',
                duration:2000
              })
              setTimeout(function () {
                wx.switchTab({
                  url: '../index/index',
                })
              }, 2000)
              that.setData({
                img: '../../image/publish.jpg',
                file:true,
                workinfo:'',
                workname:''
              })
              
            } else if (res.data.status == 0){
              wx.showModal({
                title: '还没有添加上传的图片呢',
                content: '给作品一个简介吧',
              })

            }
          },
          fail: function (res) {
            console.log('系统繁忙，请稍后再试')
          }
        })
      }

    }
   

    
  },


  
})

