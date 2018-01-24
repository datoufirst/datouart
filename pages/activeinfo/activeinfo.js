// pages/activeinfo/activeinfo.js
Page({

  data: {
     text:"马上报名"
  },
 success:function(){
   this.setData({
     text: '已报名'
   })
 },

 save: function (e) {
   console.log('开始保存')
   wx.setStorageSync('key2', 'http://www.datouart.com/upload/20171207/a7de8d04e8d63e15a26d57afbc8c43f6.png')
   console.log('同步保存成功')
   wx.setStorage({
     key: 'key1',
     data: 'http://www.datouart.com/upload/20171207/a7de8d04e8d63e15a26d57afbc8c43f6.png',
     success: function (res) {
       console.log('异步保存成功')
     },
     
   })
 },
 getsave:function(){
   try {
     var res = wx.getStorageInfoSync()
     console.log(res.keys)
     console.log(res.currentSize)
     console.log(res.limitSize)
   } catch (e) {
     // Do something when catch error
   }
 }
 
})