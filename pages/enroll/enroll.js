// pages/enroll/enroll.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    name: "",
    password: "",
    passwordAck: "",
    timestamp:[]
  },

  nameInput: function(e) {
    this.data.name = e.detail.value
  },
  phoneInput: function(e) {
    this.data.phone = e.detail.value
  },
  passwordInput: function(e) {
    this.data.password = e.detail.value
  },
  passwordInputAck: function(e) {
    this.data.passwordAck = e.detail.value
  },
  register:function(e) {
    var that = this;
    var md5 = require('../../utils/md5.js');
    if(that.data.name == "") {
      wx.showModal({
        title: 'ヽ（≧□≦）ノ',
        content: '请输入宁的用户名！',
        showCancel: false,
        success (res) {}
      })
    } else if(that.data.phone == "") {
      wx.showModal({
        title: 'ヽ（≧□≦）ノ',
        content: '请输入宁的手机号！',
        showCancel: false,
        success (res) {}
      })
    } else if(that.data.password == "") {
      wx.showModal({
        title: 'ヽ（≧□≦）ノ',
        content: '请输入宁的密码！',
        showCancel: false,
        success (res) {}
      })
    } else if(that.data.passwordAck == "") {
      wx.showModal({
        title: 'ヽ（≧□≦）ノ',
        content: '请再次输入宁的密码！',
        showCancel: false,
        success (res) {}
      })      
    } else if(this.data.password != this.data.passwordAck){
      wx.showModal({
        title: 'ヽ（≧□≦）ノ',
        content: '宁的两次密码不一致！',
        showCancel: false,
        success (res) {}
      })   
    } else {
      const db = wx.cloud.database().collection("user")
      var phoneGet = null
      db.where({
        phone : that.data.phone,
      }).get({
        success(res) {
          phoneGet = res;
          console.log(phoneGet.data)
          if(phoneGet.data.length == 0) {
              that.data.timestamp = Date.parse(new Date())
              db.add({
                data:{
                  phone:that.data.phone,
                  nickname:that.data.name,
                  password:md5.md5(that.data.password),
                  timestamp:that.data.timestamp
                },
                success(res) {
                  wx.showModal({
                    title: 'o(*￣▽￣*)ブ',
                    content: '宁已经注册成功!',
                    showCancel: false,
                    success (res) {}
                  }) 
                },
                fail(res) {
                  wx.showModal({
                    title: 'ヽ（≧□≦）ノ',
                    content: '注册失败',
                    showCancel: false,
                    success (res) {}
                  }) 
                }
              })
          } else {
            wx.showModal({
              title: 'ヽ（≧□≦）ノ',
              content: '宁的手机号已经被注册！',
              showCancel: false,
              success (res) {}
            })   
          }
        },
        fail(res) {
          wx.showModal({
            title: 'ヽ（≧□≦）ノ',
            content: '注册失败!请检查网络',
            showCancel: false,
            success (res) {}
          }) 
        }
      }) 
    }
  },

  signin:function(e) {
    wx.navigateBack({
      delta: 1
    })
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