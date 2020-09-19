// pages/commit/commit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txt:"",
    currentWordNumber:0,
    max:255,
    hid:0
  },
  input:function(e) {
    var len = parseInt(e.detail.value.length);
    if (len > this.data.max) return;
    this.setData({
      currentWordNumber: len,
      txt: e.detail.value
    })
    if(this.data.currentWordNumber == this.data.max){
      wx.showModal({
        title: '提示',
        content: '您输入的字数已达上限',
      })
    }
  },

  send:function(e) {
    console.log("sfasfsdfsd")
    var that = this
    wx.showLoading({
      title: '正在发送',
    })

    const db = wx.cloud.database().collection("message")

    var util = require('../../utils/util.js') 
    db.orderBy('timestamp', 'desc').limit(1).get({
      success(res) {
        console.log(res.data["0"].hid + 1)
        that.setData({
          hid: res.data["0"].hid + 1
        })
         console.log(res.data["0"].hid + 1)

        db.add({
          //注意一定要有globalData.userInfo_2
          data:{
            content: that.data.txt,
            phone:getApp().globalData.userInfo_2.data["0"].phone,
            nickname:getApp().globalData.userInfo_2.data["0"].nickname,
            timestamp: Date.parse(new Date()),
            hid: that.data.hid
          },
          success(res) {
            // console.log("ztmjlp" + that.data.hid)
            getApp().globalData.hid_max += 1;
            wx.hideLoading()
            wx.showModal({
              title: 'o(*￣▽￣*)ブ',
              content: '宁已经发送成功!',
              showCancel: false,
              success (res) {
                wx.navigateBack({
                  delta: 1,
                })            
              }
            }) 
          },
          fail(res) {
            wx.hideLoading()
            wx.showModal({
              title: 'ヽ（≧□≦）ノ',
              content: '发送失败!',
              showCancel: false,
              success (res) {}
            })         
          }
        })
      }
    })
   
    console.log(that.data.txt)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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