// pages/cal/cal.js

var extraLine = [];
var addNum = 0;
var initData = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calTxt: "0",
    id1: "Clean",
    id2: "Del",
    id3: "+/-",
    id4: "+",
    id5: "1",
    id6: "2",
    id7: "3",
    id8: "-",
    id9: "4",
    id10: "5",
    id11: "6",
    id12: "*",
    id13: "7",
    id14: "8",
    id15: "9",
    id16: "/",
    id17: "His",
    id18: "0",
    id19: ".",
    id20: "=",
    isOver: 0,
    calArr: []

  },
  getval: function (e) {
    //debugger
    //DOTO 20180117 23.49 明晚需要进行重构才行
    var val = e.target.id;
    var calTxt = this.data.calTxt;
    console.log("你点击的值:" + val);
    if (this.data.calArr.length > 0) {
      var ca = this.data.calArr;
      var end = ca[ca.length - 1];
      if (end == this.data.id4 || end == this.data.id8 || end == this.data.id12 || end == this.data.id16) {
        if (val == this.data.id4 || val == this.data.id8 || val == this.data.id12 || val == this.data.id16) {
          return;
        }
      }
    }
    if (val == this.data.id17) {//历史
      debugger
      wx.navigateTo({
        url: '../logs/logs'
      })
    } else if (val == this.data.id20) {//=
      var dd = this.data.calArr;
      var arr = [];
      var tempStr = "";
      for (var i = 0, dl = dd.length; i < dl; i++) {
        var d = dd[i];
        var d0 = (i == 0 && d == this.data.id8);
        if (d0 || !(d == this.data.id4 || d == this.data.id8 || d == this.data.id12 || d == this.data.id16)) {
          tempStr += d;
          if (i == dl - 1) {
            arr.push(tempStr);
            tempStr = "";
          }
        } else {
          tempStr && arr.push(tempStr);
          arr.push(d);
          tempStr = "";
        }
      }
      console.log(val + "----" + JSON.stringify(arr) + "----开始计算结果");
      var res = 0;
      var rule = "";
      for (var j = 0, al = arr.length; j < al; j++) {
        var ar = arr[j];
        if (j == 0) {
          res = parseFloat(arr[j]); continue
        }
        if (ar == this.data.id4 || ar == this.data.id8 || ar == this.data.id12 || ar == this.data.id16) {
          rule = ar; continue
        }
        //------------------------------------------
        if (rule == this.data.id4) {//+
          res += parseFloat(ar);
        }
        if (rule == this.data.id8) {//-
          res -= parseFloat(ar);
        }
        if (rule == this.data.id12) {//*
          res *= parseFloat(ar);
        }
        if (rule == this.data.id16) {// /
          res = res / parseFloat(ar);
        }
      }
      this.setData({
        calTxt: res
      })
      this.data.calArr = [];
      this.data.isOver = 1;
    } else if (val == this.data.id1) {//清空
      this.data.calArr = [];
      this.setData({
        calTxt: 0
      })
    } else if (val == this.data.id2) {//退格
      var calT = (typeof calTxt == "string") ? calTxt.substring(0, calTxt.length - 1) : calTxt;
      this.data.calArr.pop();
      this.setData({
        calTxt: calT
      })
    } else if (val == this.data.id3) {//+/-
      var t = /-/g.exec(calTxt);
      if (t) {
        if (calTxt.substring(0, 1) === '-') {  //-10
          this.data.calArr.shift("-");
          calTxt = calTxt.substring(1, calTxt.length);
        } else if (calTxt.substring(calTxt.length - 1, calTxt.length) === '-') {//10-
          calTxt = calTxt.substring(0, calTxt.length - 1);
        } else if (/--/g.exec(calTxt)) {     //88-(-48)，这样是有问题
          calTxt = calTxt.replace("--", "-");
        } else {                              //88-9--------->88--9
          var num = calTxt.lastIndexOf("-");
          var str1 = calTxt.substring(0, num);
          var str2 = "-" + calTxt.substring(num, calTxt.length);
          calTxt = str1.concat(str2);;
        }
      } else {
        this.data.calArr.unshift("-");
        calTxt = '-' + calTxt;
      }
      this.setData({
        calTxt: calTxt
      })
    } else {
      if (this.data.isOver == 1) {//算完结果之后继续点击时,需要重新开始
        if (val == this.data.id19) {
          return "";
        }
        if (val == this.data.id4 || val == this.data.id8 || val == this.data.id12 || val == this.data.id16) {
          //DOTO 应该还可以继续计算结果

          return;
        }
        this.data.calArr.push(val);
        this.setData({
          isOver: 0,
          calTxt: val
        });
      } else if (calTxt == 0 && val !== this.data.id19) {
        if (!(val == this.data.id4 || val == this.data.id8 || val == this.data.id12 ||
          val == this.data.id16 || val == this.data.id20)) {
          this.setData({
            calTxt: val
          })
          this.data.calArr.push(val);
        }
      } else {
        this.setData({
          calTxt: this.data.calTxt + val
        })
        this.data.calArr.push(val);
      }
    }
    val !== this.data.id17 && console.log("屏幕显示----" + JSON.stringify(this.data.calArr));
  },
  add: function (e) {
    addNum++;
    extraLine.push('add ' + addNum + ' line')
    this.setData({
      calTxt: initData + '\n' + extraLine.join('\n')
    })
  },
  remove: function (e) {
    if (addNum < 2) { return; }
    addNum--;
    if (extraLine.length > 0) {
      extraLine.pop()
      this.setData({
        calTxt: initData + '\n' + extraLine.join('\n')
      })
    }
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