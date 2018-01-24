// pages/school/school.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
  },
  
  kindergarten: function () {
    wx.navigateTo({
      url: "../kindergarten/kindergarten"
    })
  },
  /** 滑动切换tab */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 点击tab切换 */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})  
