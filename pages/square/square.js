// pages/square/square.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firs: "#000000",
    secn: "gray",
    holenum: 10,
    scrollTop: 5,
    timer: null,
    list: []
  },
  refresh() { // 函数式触发开始下拉刷新。如可以绑定按钮点击事件来触发下拉刷新
    wx.startPullDownRefresh({
      success(errMsg) {
        console.log('开始下拉刷新', errMsg)
      },
      complete() {
        console.log('下拉刷新完毕')
      }
    })
  },
  scrollFn(e) {
    // 防抖，优化性能
    // 当滚动时，滚动条位置距离页面顶部小于设定值时，触发下拉刷新
    // 通过将设定值尽可能小，并且初始化scroll-view组件竖向滚动条位置为设定值。来实现下拉刷新功能，但没有官方的体验好
    clearTimeout(this.timer)
    if (e.detail.scrollTop < this.data.scrollTop) {
      this.timer = setTimeout(() => {
        this.refresh()
      }, 350)
    }
  },
  loadMore() { // 触底加载更多
    this.onLoad()
    console.log("loadMore")
  },
  to_mine: function (e) {
    wx: wx.redirectTo({
      url: '../mine/mine',
    })
  },
  to_square: function (e) {},
  to_commit: function (e) {
    wx: wx.navigateTo({
      url: '../commit/commit',
    })
  },
  toLowFun() {
    console.log("触底事件")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.holenum)
    wx.stopPullDownRefresh();
    var that = this
    const db = wx.cloud.database().collection("message")
    db.orderBy('timestamp', 'desc').limit(that.data.holenum).get({
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
      });
  },
  toTopFun() {
    console.log("触顶事件")
    this.onPullDownRefresh()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
    this.onLoad();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})