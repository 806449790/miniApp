//index.js
//获取应用实例
const app = getApp();
var order = ['red', 'yellow', 'blue', 'green', 'red'];

var extraLine = [];
var addNum = 0;
var initData = 'this is first line';
Page({
  data: {
    iconSize: [20, 30, 40, 50, 60, 70],
    text:"小海豚介绍:"+"\n"+
    "【新的功能特性】"+"\n"+
	" 1. 游戏适配：【全民小游戏】专属游戏优化"+"\n"+
	" 2. 游戏适配：【洛奇小游戏】专属游戏优化"+"\n"+
	" 3. 游戏适配：【太极小游戏】专属游戏优化太极小游戏"+"\n"+
	"【小引擎】"+"\n"+
	" 1. 引擎发布：1月正式开始公测，实现游戏启动3到5秒"+"\n"+
	" 2. 引擎优化：优化安卓启动逻辑，安装大量游戏也不影响启动速度"+"\n"+
  " 3. 引擎优化：引擎架构优化，不再依赖VT优化性能，VT关闭时也能流畅运行" + "\n"+
  " 4. 引擎发布：1月正式开始公测，实现游戏启动3到5秒"+"\n" +
  " 5. 引擎优化：优化安卓启动逻辑，安装大量游戏也不影响启动速度" + "\n" +
  " 6. 引擎优化：引擎架构优化，不再依赖VT优化性能，VT关闭时也能流畅运行" + "\n",
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ], iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    motto: 'Hello MeiMei.',
    motto1: 'Hello MeiMei1.',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //事件处理函数
  goToCal: function () {
    wx.navigateTo({
      url: '../cal/cal'
    })
  },

  testShowModal:function(){
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  toTetris :function(){
    wx.navigateTo({
      url: '../tetr/tetr'
    })

  },
  onLoad: function () {
   // debugger
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }, 
  add: function (e) {
    addNum++;
    extraLine.push('add ' + addNum+' line')
    this.setData({
      text: initData + '\n' + extraLine.join('\n')
    })
  },
  remove: function (e) {
    addNum--;
    if (extraLine.length > 0) {
      extraLine.pop()
      this.setData({
        text: initData + '\n' + extraLine.join('\n')
      })
    }
  },
  getUserInfo: function(e) {
    //debugger

    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
