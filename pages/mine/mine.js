// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firs:"#gray",
    seco:"#000000",
    regist_time:"",
    id:"",
    holenum:10,
    list:[]
  },


  to_mine:function(e) {

  },
  to_square:function(e) {
    wx.redirectTo({
      url: '../square/square',
    })
  },
  to_commit:function(e) {
    wx:wx.navigateTo({
      url: '../commit/commit',
    })
  },

  loadMore() { // 触底加载更多
    this.onLoad()
    console.log("loadMore")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log((new Date(2019,10,5) - parseInt(getApp().globalData.userInfo_2.data["0"].timestamp)) / (1000*3600*24))
    this.setData({
      id:getApp().globalData.userInfo_2.data["0"].nickname,
      regist_time:Math.floor((new Date() - parseInt(getApp().globalData.userInfo_2.data["0"].timestamp)) / (1000*3600*24))
    })
    console.log(this.data.holenum)
    wx.stopPullDownRefresh();
    var that = this
    const db = wx.cloud.database().collection("message")
    db.orderBy('timestamp', 'desc').limit(that.data.holenum).where({phone:getApp().globalData.userInfo_2.data["0"].phone}).get({
        success(res) {
          that.setData({
            list: res.data
          })
          that.data.holenum += 5;
          var cnt = -1;
          for (let i of that.data.list) {
            cnt += 1
            var fuc ='list['+cnt+'].timestamp';
            var qwq = new Date(parseInt(i.timestamp)).toLocaleString().replace('GMT+0800 (CST)',' '); 
            that.setData({
              [fuc] : qwq
            })
          }
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})