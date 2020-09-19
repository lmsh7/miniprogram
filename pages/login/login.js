
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    password:"",
  },
  nameInput:function(e) {
    this.data.phone = e.detail.value;
  },
  passwordInput:function(e) {
    this.data.password = e.detail.value;
  },

  login:function(e) {
    var md5 = require('../../utils/md5.js');

    var that = this;
    if(that.data.phone == "") {
      wx.showModal({
        title: 'ヽ（≧□≦）ノ',
        content: '请输入宁的手机号！',
        showCancel: false,
        success (res) {}
      })
    } else if(that.data.password == ""){
      wx.showModal({
        title: 'ヽ（≧□≦）ノ',
        content: '请输入宁的密码！',
        showCancel: false,
        success (res) {}
      })
    } else{
      const db = wx.cloud.database().collection("user")
      var phoneGet = null
      db.where({
        phone: that.data.phone,
      }).get({
        success(res) {
          phoneGet = res
          if(phoneGet.data.length == 0) {
            wx.showModal({
              title: 'ヽ（≧□≦）ノ',
              content: '宁的手机号未注册！',
              showCancel: false,
              success (res) {}
            })   
          } else {
            if(phoneGet.data["0"].password == md5.md5(that.data.password)) {
        
              getApp().globalData.userInfo_2 = phoneGet
              wx.redirectTo({
                url: '/pages/square/square',
              })          
            } else {
              console.log(md5.md5("123"));
              wx.showModal({
              
                title: 'ヽ（≧□≦）ノ',
                content: '宁的密码不正确！',
                showCancel: false,
                success (res) {}
              })  
            }
          }
        },
        fail(res) {
          wx.showModal({
            title: 'ヽ（≧□≦）ノ',
            content: '登陆失败!请检查网络',
            showCancel: false,
            success (res) {}
          })  
        }
      })
      console.log("qwq")
    }
  },

  register:function(e) {
    wx.navigateTo({
      url: '/pages/enroll/enroll',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(getApp().globalData.userInfo.city)
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