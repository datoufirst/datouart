// pages/name/name.js
var app = getApp()


Page({
  data: {
    username:'',
    text: wx.getStorageSync("nickName")
  },

  // 监听用户输入的名称
  inputvalue:function(e){
      this.data.username = e.detail.value;

      console.log(this.data.username)
  },
  // 用户保存后的名称
  save:function(){
    if (this.data.username.length==0){
      wx.showToast({
        title: '请填入宝宝名称',
        iconType: 'cancel',
      })
      return false;
    }else{
      //  wx.request({
      //    url: 'https://www.datouart.com/home/user/update_name',
      //    data: ,
      //    header: {},
      //    method: GET,
      //    dataType: json,
      //    success: function(res) {},
      //    fail: function(res) {},
      //    complete: function(res) {},
       //})
   





      wx.showToast({
        title: '保存成功',
        iconType: 'success',
      })
      console.log(this.data.username)
    }

    
  },

 
})