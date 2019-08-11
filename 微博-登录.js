/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common/api.js":
/*!***************************!*\
  !*** ./src/common/api.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
* @fileOverview API接口文件
* @description 本脚本在Auto.Js 4.0.1版本中，自动化控制Android微博版本号:9.6.3版测试通过！
* @author <a href=”tuple@youshui.ren”>Tuple</a>
* @version 0.1
*/

var Env = __webpack_require__(/*! ../env */ "./src/env.js")
var Sms = __webpack_require__(/*! ./sms */ "./src/common/sms.js")

var api={
  
  /**
   * 获取一个全局的配置文件
   */
  getConfig:function() {
    try {
        // toast('开始获取配置');
        let c = Env.curName;
        let r = http.get("https://kapi.i-tax.ren/api/aichat/config?f="+Env.CLIENT+"&n=" + encodeURIComponent(c) + "&t=" + new Date().getTime() + "&d=" + device.getIMEI() + "&v=" + Env.VERSION);
        let body = r.body.string();
        // toast('get config ok');
        if (!!body) {
            let conf = JSON.parse(body);
            if (conf) {
                if (!conf.disabled) {
                  Env.config = conf;
                }
                Env.token = !!Env.config.token ? Env.config.token : Env.token;
                Env.itemJihuo = !!Env.config.itemJihuo ? Env.config.itemJihuo : Env.itemJihuo;
                Env.itemLogin = !!Env.config.itemLogin ? Env.config.itemLogin : Env.itemLogin;
                Env.itemRegister = !!Env.config.itemRegister ? Env.config.itemRegister : Env.itemRegister;
                Env.exceptPhone = !!Env.config.exceptPhone ? Env.config.exceptPhone : Env.exceptPhone;          
                Env.canReply = Env.config.canReplyDisabled ? Env.canReply : Env.config.canReply;
                Env.config.debug ? console.show() : console.hide();
            }
        }
        return body;
    } catch (e) {
        // console.log(JSON.stringify(e));
    }
  },

  /**
  * 获取关键字
  */
 getKeyword:function () {
    // console.log('get reply msg');
    try {
        let r = http.get("https://kapi.i-tax.ren/api/aichat/keyword?f="+Env.CLIENT+"&n=" + encodeURIComponent(Env.curName) + "&t=" + new Date().getTime() + "&d=" + device.getIMEI() + "&v=" + Env.VERSION);
        let body = r.body.string();
        // console.log('reply msg:' + body);
        if (!!body) {
            // let conf = JSON.parse(body);
            // if (conf) {
            //     Env.curKeywords = conf;
            // }
            Env.curKeyword = body;
        }
        return body;
    } catch (e) {
        Env.curKeyword = null;
    }

  },

  /**
  * 获取评论内容
  * @param {*} msg 
  */
 getReplyMsg:function(msg) {
    // console.log('get reply msg');
    try {
        let c = !!msg ? msg : Env.curTitleContent.substr(0, 255);
        let r = http.get("https://kapi.i-tax.ren/api/aichat/reply?f="+Env.CLIENT+"&c=" + encodeURIComponent(c) + "&t=" + new Date().getTime() + "&d=" + device.getIMEI() + "&v=" + Env.VERSION);
        let body = r.body.string();
        // console.log('reply msg:' + body);
        Env.curComment = body;
        return body;
    } catch (e) {
        Env.curComment = null;
    }

  },

  getComment:function(){
      return this.postReplyMsg();
  },

  getLoginPhone:function(){
      return Sms.getPhone(Env.itemLogin);
  },


  getActivePhone:function(){
    return Sms.getPhone(Env.itemJihuo);
  },


  getLoginCode:function(){
    return Sms.getSMS(Env.curPhone,Env.itemLogin);
  },

  getHotTextItem:function(){
    let groupItems = ['推荐', '榜单', '社会', '搞笑', '情感', '时尚', '校园', '摄影', '艺术', '明星', '美女', 'NBA'];
    if (Env.config && Env.config.groupItems && Env.config.groupItems.length > 0) {
        groupItems = Env.config.groupItems;
        // toast('use Env.config group items');
    }

    Env.curGroupId = 0;
    let subGroup = random(0, groupItems.length - 1);
    if (Env.config && Env.config.subGroupId > -1) {
        subGroup = Env.config.subGroupId;
    }
    Env.curHotTextItem = groupItems[subGroup];
    // console.log('get hot text item api:',Env.curHotTextItem);
    return groupItems[subGroup];
    // return "国学";
  },

  getGivenWeiboTitle:function(){
    // return "35岁检察官带人上门打70岁空巢老人 相关部门否认寻衅滋事？ 官官相护";
    return "青凌巴山越岭";
  },

  /**
  * 获取评论内容
  * @param {*} msg 
  */
 postReplyMsg:function(msg) {
    let url = "https://kapi.i-tax.ren/api/aichat/reply";
    r = http.postJson(url, {
        n: Env.curName,
        c: !!msg ? msg : Env.curTitleContent,
        d: device.getIMEI(),
        t: new Date().getTime(),
        v: Env.VERSION,
        f: Env.CLIENT,
    });
    let body = r.body.string();
    // toast(body);
    Env.curComment = body;
    return body;
  },

  /**
  * 获取评论内容
  * @param {*} msg 
  */
 postUpdateStatus:function(status) {
    let url = "https://kapi.i-tax.ren/api/aichat/status";
    r = http.postJson(url, {
        n: Env.curName,
        s: status,
        d: device.getIMEI(),
        t: new Date().getTime(),
        v: Env.VERSION,
        f: Env.CLIENT,
    });
    let body = r.body.string();
    // toast(body);
    Env.curComment = body;
    return body;
  },

  getTuling:function(msg) {
    let url = "http://www.tuling123.com/openapi/api";
    r = http.postJson(url, {
        key: "65458a5df537443b89b31f1c03202a80",
        info: "你好啊",
        userid: "1",
    });
    let body = r.body.string();
    toast(body);
    Env.curComment = body;
    return body;
  },

  loginOk:function(phone, name, type,msg) {
    try {
      let c = name;
      let r = http.get("https://kapi.i-tax.ren/api/aichat/loginok?f="+Env.CLIENT+"&n=" + encodeURIComponent(c) +"&msg=" + encodeURIComponent(msg)
      + "&t=" + new Date().getTime() + "&d=" + device.getIMEI() + "&p=" + phone + "&tp=" + type);
      let body = r.body.string();
      // toast(body);
      // config = body;
      // console.log('login ok back:' + body);
      return body;
    } catch (e) {

    }
  },
  /**
   * 获取手机号的激活码
   */
  getCode:function(phone){
    try {
      phone = !!phone ? phone : Env.curPhone
      let c = name;
      let r = http.get("https://kapi.i-tax.ren/api/aichat/phone/code?f="+Env.CLIENT+"&n=" + encodeURIComponent(c) + "&t=" + new Date().getTime() + "&d=" + device.getIMEI() + "&p=" + phone );
      let body = r.body.string();
      return body;
    } catch (e) {

    }
  },

  getRegisterPhone: function () {
    return Sms.getPhone(Env.itemRegister);
  },

  getRegisterCode: function () {
    return Sms.getSMS(Env.curPhone, Env.itemRegister);
  },

  getRegisterSendCode: function () {
    return Sms.sendSMS(Env.curPhone, Env.itemRegister, '注册验证');
  },

  getRegisterName: function () {
    let names = [
      "Aaron", "Abbott", "Abel", "Abner", "Abraham", "Adair", "Adam", "Adolph", "Adonis", "Alan", "Albert", "Aldrich", "Alexander", "Alfred", "Alger", "Allen", "Alston", "Alva", "Alvin", "Alvis", "Amos", "Andre", "Andrew", "Andy", "Angelo", "Augus", "Ansel", "Antony", "Antonio", "Archer", "Archibald", "Aries", "Arlen", "Armand", "Armstrong", "Arno", "Arthur", "Arvin", "Asa", "Atwood", "Aubrey", "August", "Augustine", "Avery",
    ];
    let rs = names[random(0, names.length - 1)] + random(10000, 99999);
    rs = rs.toLowerCase();
    toast("username:" + rs);
    console.log("username:" + rs);
    return rs;
  },

  getRegisterPassword: function () {
    return "16181814";
  },

  getRegisterOk: function (){
    let msg = {name:Env.curName,phone:Env.curPhone,item:Env.itemRegister,client:Env.CLIENT};
    console.log('register ok:',msg)
    return this.loginOk(Env.curPhone,Env.curName,'register',JSON.stringify(msg));
  },

  finish: function (){
    let msg = {username:Env.curUsername,name:Env.curName,phone:Env.curPhone,item:Env.itemRegister,client:Env.CLIENT};
    console.log('register ok:',msg)
    return this.loginOk(Env.curPhone,Env.curName,'register',JSON.stringify(msg));
  },
  
}
module.exports=api


/***/ }),

/***/ "./src/common/operate.js":
/*!*******************************!*\
  !*** ./src/common/operate.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileOverview 定义可以的操作
 * @description 本脚本在Auto.Js 4.0.1版本中，自动化控制Android微博版本号:9.6.3版测试通过！
 * @author <a href=”tuple@youshui.ren”>Tuple</a>
 * @version 0.1
 * 
 */

/** 
 * get 获取本地或者远程文本并写到全局变量，
 * set_text 设置控件的text属性，
 * click 点击这个按钮，
 * input OneByOne向控件输入文字，
 * swipe 滑动页面，
 * sleep 暂停，
 * refresh 下拉刷新页面，
 * back 点击Android的返回键，
 * text 获取控件的text属性值，
 * desc 获取控件的desc描述值，
 * tap 点击控件位置的屏幕，
 * enter 触发回车，
 * 函数可以扩展
 */

var Utils = __webpack_require__(/*! ./utils */ "./src/common/utils.js");
var Api = __webpack_require__(/*! ./api */ "./src/common/api.js");
var Env = __webpack_require__(/*! ../env */ "./src/env.js");

var operate = {
    /**
     * 获取当前页面,OK
     * @param {*} pages 
     */
    curPage: function (pages) {
        // var result = [];
        let result = { name: '', pageid: 0 };
        // pages.forEach((item, index, arr) => {
        //     if (this.doExists(item.mark)) {
        //         result = item;
        //     }
        // })
        // console.log(JSON.stringify(pages));
        for (let k in pages) {
            if (this.doExists(pages[k].mark)) {
                result = pages[k];
            }
        }
        return result;
    },

    /**
     * 获取下一个步骤
     * @param {*} pages 
     */
    nextStep: function (pageid, pages) {
        // var result = [];
        // console.log('nextStep:',pageid,JSON.stringify(pages));
        let result = { next: 0, pageid: 0, jobs: [] };
        for (let k in pages) {
            let item = pages[k];
            if (item.pageid === pageid) {
                result = item;
            }
        }
        return result.next;
    },

    /**
     * 判断是否为指定页面,OK
     * @param {*} mark 
     */
    isPage: function (mark) {
        return this.doExists(mark);
    },

    /**
     * 
     * 根据传入的属性，构建查找到对应节点的对象,OK
     * 
     * @param {*} item 
     */
    build: function (item) {
        // let funNames = ['id','text','desc','className','depth','textStartsWith','textEndsWith'];
        let target = null;
        if (Utils.isNull(item.name)) {
            for (let k in item) {
                let v = item[k];
                if (v != "" && v != null && v != undefined) {
                    if (!!target) {
                        target = eval('target.' + k + '(v)');
                    } else {
                        target = eval(k + '(v)');
                    }
                    // console.log('build target:'+JSON.stringify(target));
                }
            }
        }
        return target;
    },
    /**
     * 支持更复杂的或者表达式，目前不启用
     * @param {*} item 
     */
    parseItem: function (item) {
        let obj = JSON.parse(JSON.stringify(item));
        let t = 1;
        for (let k in item) {
            let v = item[k];
            if (v != "" && v != null && v != undefined) {
                obj[k] = v.split('||');
                // t *= Math.pow(2,obj[k].length-1);
                t *= obj[k].length;
            }
        }
        // console.log(t);
        // console.log(JSON.stringify(obj));
        let ls = Utils.fill(t, item);

        for (let k in obj) {
            let v = obj[k];
            // console.log(k);
            // console.log(JSON.stringify(v));
            if (Array.isArray(v)) {
                // let n = t / v.length;
                // let m = v.length;
                for (let m = 0; m < v.length; m += 1) {
                    // console.log("m:"+m);
                    for (let n = 0; n < t / v.length; n += 1) {
                        // console.log("n:"+n);
                        // console.log("v[m]:"+v[m]);
                        let i = m * (t / v.length) + n;
                        ls[i][k] = v[m];
                        // console.log("ls["+i+"]["+k+"]:"+ls[i][k]);
                    }

                }
            } else {
                for (let m = 0; m < t; m += 1) {
                    ls[m][k] = v;
                }
            }
            // console.log(JSON.stringify(ls));
        }
        return ls;
    },


    /**
     * 根据传入的属性，查找对应的节点并返回,OK
     * @param {*} mark 
     * @param {*} param 
     */
    findNode: function (mark, param) {
        let target = null;
        // 有多个同样的，或者只有一个但是需要向上一级获取子节点
        if (!!param && !Utils.isNull(param.indexOf)) {
            //需要向上一级获取子节点
            if (!Utils.isNull(param.parent) && param.parent > 0) {
                target = this.build(mark).findOne();
                let pLen = param.parent;
                while (pLen > 0) {
                    target = target.parent;
                    pLen--;
                }
                target = target.children();
            } else {
                target = this.build(mark).find();
            }
            //有多个同样的，根据param.indexOf过滤节点,选择一个
            // {name:"click", mark:{id:"tv_userinfo"}, param:{indexOf:{tag:"text",try:10,get:{name:"given_weibo_title",uri:"api"}}}},
            // {name:"click", mark:{id:"tv_userinfo"}, param:{indexOf:{tag:"text",try:10,default:"测试位置"}}},
            target = this.indexOfNode(target, param);
        } else {
            //只会有一个的情况
            target = this.build(mark).findOnce();
        }
        if (!target) {
            console.log('can not find ctrl', JSON.stringify(mark), JSON.stringify(param));
        }
        return target;

    },

    indexOfNode: function (target, param) {
        //没有找到尝试向上滚动一下找找
        let maxTry = 1;
        if (!Utils.isNull(param.indexOf.try) && param.indexOf.try > -1) {
            maxTry = param.indexOf.try;
        }
        let tryt = maxTry;
        while (tryt > 0 && target.length <= 0) {
            // console.log('find node try down',tryt,target.length);
            this.doSwipe({}, { count: 1 });
            target = this.build(mark).find();
            tryt--;
        }
        // 找到了处理一下
        if (target.length > 0) {
            if (typeof param.indexOf === 'number') {
                //取多个里的指定个
                if (param.indexOf == -1 || param.indexOf >= target.length) {
                    target = target[target.length - 1];
                } else {
                    target = target[param.indexOf];
                }
            } else if (typeof param.indexOf === 'object'
                && typeof param.indexOf.get === 'object'
            ) {
                if (!Utils.isNull(param.indexOf.tag)) {
                    let str = this.doGet(param.indexOf.get);
                    // console.log('find node str:',str);
                    target = eval('target.findOne(' + param.indexOf.tag + "(str))");
                } else if (!Utils.isNull(param.indexOf.default)) {
                    let str = param.indexOf.default;
                    target = eval('target.findOne(' + param.indexOf.tag + "(str))");
                } else {
                    target = target[0];
                }
            } else {
                target = target[0];
            }
        } else {
            target = null;
        }
        //移动一段距离
        while (maxTry - tryt > 0) {
            // console.log('find node try up',tryt);
            this.doSwipe({}, { count: 1, isUp: true });
            tryt++;
        }
        return target;
    },
    /**
     * 调用click执行点击操作,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doClick: function (mark, param) {
        console.log('do click');
        let target = this.findNode(mark, param);
        if (!!target) {
            if (target.clickable()) {
                return target.click();
            } else {
                if (!!param && param.clickChild) {
                    return this.clickChild(target);
                } else {
                    return this.clickParent(target);
                }
            }
        } else {
            console.log('not do click');
        }
        return false;
    },
    /**
     * 调用tap点击界面,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doTap: function (mark, param) {
        console.log('do tap');
        let target = this.findNode(mark, param);
        if (!!target) {
            Tap(target.bounds().centerX(), target.bounds().centerY());
            sleep(500);
            Tap(target.bounds().centerX() + 1, target.bounds().centerY()) + 1;
            Tap(target.bounds().centerX() - 1, target.bounds().centerY()) - 1;
            Tap(target.bounds().centerX() + 2, target.bounds().centerY()) + 2;
            Tap(target.bounds().centerX() - 2, target.bounds().centerY()) - 2;
            return true;
        } else {
            console.log('not do tap');
        }
        return false;
    },
    /**
     * 一个一个输入到控件,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doInput: function (mark, param) {
        console.log('do input');
        let target = this.findNode(mark, param);
        if (!!target) {
            Tap(target.bounds().centerX(), target.bounds().centerY());
            sleep(1000);
            // let tp = 'code';
            // let str = '';
            // if(!!param && !Utils.isNull(param.type)){
            //     tp = param.type;
            // }
            // if( tp == 'reply'){
            //     str = Api.postReplyMsg();
            // }else{
            //     str = Api.getCode();
            // }
            let name = "login_code";
            if (!!param && !Utils.isNull(param.get)) {
                name = param.get;
            }
            // let str = Api.postReplyMsg();
            let str = this.doGet(name);
            if (!!str) {
                let strArray = str.split("")
                if (strArray.length > 0) {
                    setText(strArray[0]);
                }
                for (let i = 1; i < strArray.length; i++) {
                    let char = strArray[i];
                    input(char);
                    sleep(random(1000, 1500));
                }
                return true;
            }
        } else {
            console.log('not do input');
        }
        return false;
    },
    /**
     * 设置控件内容,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doSetText: function (mark, param) {
        console.log('do set text');
        let target = this.findNode(mark, param);
        if (!!target) {
            let name = { name: 'comment' };
            if (!!param && !Utils.isNull(param.get)) {
                name = param.get;
            }
            // let str = Api.postReplyMsg();
            let str = this.doGet(name);
            if (!!str) {
                return target.setText(str);
            }
        } else {
            console.log('not do set text');
        }
        return false;
    },
    /**
     * 获取控件text内容,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doText: function (mark, param) {
        console.log('do text');
        let target = this.findNode(mark, param);
        if (!!target) {
            let name = { name: "title_content" };
            if (!!param && !Utils.isNull(param.set)) {
                name = param.set;
            }
            let str = target.text();
            this.doSet(name, { default: str });
            console.log(str.substr(0, 100));
            return str;
        } else {
            console.log('not do text');
        }
        return null;
    },
    /**
     * 获取控件desc内容,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doDesc: function (mark, param) {
        console.log('do desc');
        let target = this.findNode(mark, param);
        if (!!target) {
            Env.curTitleContent = target.desc();
            console.log(Env.curTitleContent.substr(0, 100));
            return target.desc();
        } else {
            console.log('not do desc');
        }
        return null;
    },
    /**
     * 向下滚动,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doSwipe: function (mark, param) {
        //滚动
        console.log('do swipe');
        let rx = random(200, 400);
        let rm = -1;
        if (!!param && !Utils.isNull(param.count) && param.count > -1) {
            rm = parseInt(param.count);
        }
        if (rm == -1 || rm == undefined || rm == null || rm == "") {
            rm = random(1, 3);
        }
        let isUp = false;
        if (!!param && !Utils.isNull(param.isUp)) {
            isUp = param.isUp;
        }
        while (rm > 0) {
            console.log('swipe:' + rm, isUp);
            if (isUp) {
                Swipe(rx + random(0, 25), 180 + random(0, 100), rx + random(0, 29), 580 + random(0, 158), 200 + random(0, 200));
            } else {
                Swipe(rx + random(0, 29), 580 + random(0, 158), rx + random(0, 25), 180 + random(0, 100), 200 + random(0, 200));
            }
            sleep(random(500, 1000));
            rm -= 1;
        }
        return true;
    },

    /**
     * 刷新页面,Ok
     */
    doRefresh: function (mark, param) {
        console.log('do refresh');
        //下拉刷新
        Swipe(310, 250, 310, 600);
        // Swipe(310 + random(0, 5), 400 + random(0, 15), 310 + random(0, 25), 700 + random(0, 10));
        sleep(1000 + random(0, 2000));
        return true;
    },
    /**
     * 执行回退操作,Ok
     * @param {*} mark 
     * @param {*} param 
     */
    doBack: function (mark, param) {
        console.log('do back');
        back();
        return true;
    },
    /**
     * 执行sleep,OK
     * @param {*} mark 
     * @param {*} param 
     */
    doSleep: function (mark, param) {
        let rm = -1;
        if (!!param && !Utils.isNull(param.delay) && param.delay > -1) {
            rm = parseInt(param.delay);
        }
        if (rm == -1 || rm == undefined || rm == null || rm == "") {
            rm = random(1000, 2000);
        }
        console.log('do sleep', rm);
        sleep(rm);
        return true;
    },
    doEnter: function () {
        console.log('do enter');
        KeyCode("KEYCODE_ENTER");
    },
    /**
     * 等待控件出现
     * @param {*} mark 
     * @param {*} param 
     */
    doWait: function (mark, param) {
        console.log('do wait for');
        let target = this.build(mark);
        let msg = 'Wait For';
        if (!Utils.isNull(mark.text)) {
            msg += ':Text:' + mark.text;
        }
        if (!Utils.isNull(mark.desc)) {
            msg += ':Desc:' + mark.desc;
        }
        if (!Utils.isNull(mark.id)) {
            msg += ':Id:' + mark.id;
        }
        console.log(msg);
        toast(msg);
        return target.waitFor();
    },
    /**
     * 执行shell命令
     * @param {*} mark
     * @param {*} param
     */
    doShell: function (mark, param) {
        console.log('do shell');
        let rs = { code: -1 };
        // console.log(JSON.stringify(param));
        if (!!param && !Utils.isNull(param.cmd)) {
            let root = false;
            if (!Utils.isNull(param.root) && param.root === true) {
                root = true;
            }
            rs = shell(param.cmd, root);
            if (rs.code == 0) {
                console.log("run shell success", JSON.stringify(rs));
            } else {
                console.log("run shell failed", JSON.stringify(rs));
            }
        }
        return rs.code == 0;
    },
    /**
     * 点击指定图片
     * @param {*} mark 
     * @param {*} param 
     */
    doImage: function (mark, param) {
        console.log('do image');
        let img = null;
        try {
            if (!Utils.isNull(mark.path)) {
                console.log('image read from path');
                if (files.isFile(mark.path))
                    img = images.read(mark.path)
            }
            if (!Utils.isNull(mark.base64)) {
                console.log('image from base64');
                img = images.fromBase64(mark.base64);
            }
            if (!Utils.isNull(mark.url)) {
                console.log('image load from url');
                img = images.load(mark.url);
            }
            if (img != null) {
                let p = findImage(captureScreen(), img);
                if (p) {
                    let x = p.x + img.getWidth() / 2;
                    let y = p.y + img.getHeight() / 2;
                    console.log("find image: ", p, img.getWidth(), img.getHeight(), x, y);
                    if(!!param && !Utils.isNull(param.action) && Utils.titleCase(param.action) == 'Tap'){
                        Tap(x, y);
                        sleep(1000);
                    }
                    return true;
                } else {
                    console.log("not find image");
                    return false;
                }
            }
            console.log("not find image");
            return false;
        } catch (error) {
            console.log("do image in catch", error);
            return false;
        }

    },
    /**
     * 
     * 根据传入的属性，判断对应的节点是否存在,OK
     * 
     * @param {*} mark 
     */
    doExists: function (mark, param) {
        // console.log('do exists');
        if (!Utils.isNull(mark.name)) {
            return this.doFun(mark);
            // return eval('this.do'+Utils.titleCase(mark.name)+'(mark.mark, param)');
        } else {
            let target = this.build(mark);
            // console.log(this.build(mark).exists());
            return !!target ? target.exists() : false;
        }
    },
    /**
     * 点击父控件,OK
     * @param {*} target 
     */
    clickParent: function (target) {
        if (!!target) {
            let count = target.depth();
            // console.log('depth:'+count);
            while (count > 0 && target != null) {
                if (target.clickable()) {
                    target.click();
                    count = -1;
                    break;
                } else {
                    if (!!target.parent()) {
                        target = target.parent();
                        count -= 1;
                    } else {
                        count = -1;
                        break;
                    }
                }
            }
            if (count == -1) {
                return true;
            }
        } else {
            console.log('not click parent');
        }
        return false;
    },
    /**
     * 
     * 点击子控件
     * 
     * @param {*} target 
     */
    clickChild: function (target) {
        if (!!target) {
            if (target.clickable()) {
                return target.click();
            } else {
                target.children().forEach(child => {
                    if (child.clickable()) {
                        return child.click();
                    }
                });
            }
        } else {
            console.log('not click child');
        }
        return false;
    },
    /**
     * 设置全局变量
     * @param {*} mark 
     * @param {*} param 
     */
    doSet: function (mark, param) {
        console.log('do set');
        if (!!mark && !Utils.isNull(mark.name)) {
            let valName = "cur" + Utils.titleCase(mark.name);
            let value = '';
            if (!!param && !Utils.isNull(param.default)) {
                value = param.default;
            }
            return eval("Env." + valName + "=value;");
        }
        return null;
    },
    /**
     * 获取全局变量的内容或者调用指定API获取内容并设置全局变量
     * @param {*} mark 
     * @param {*} param 
     */
    doGet: function (mark, param) {
        console.log('do get');
        if (!!mark && !Utils.isNull(mark.name)) {

            let valName = "Env.cur" + Utils.titleCase(mark.name);
            if (!Utils.isNull(mark.uri)) {
                if (mark.uri == 'api') {
                    valName = Utils.titleCase(mark.uri) + "." + "get" + Utils.titleCase(mark.name) + "();";
                }
                let rs = eval(valName);
                let setName = { name: mark.name };
                if (!!param && !Utils.isNull(param.set)) {
                    setName = param.set;
                }
                this.doSet(setName, { default: rs });
                return rs;
            } else {
                return eval(valName);
            }
        }
        return null;
    },
    /**
       * 调用指定名称的函数,OK
       * @param {*} name 
       * @param {*} mark 
       * @param {*} params 
       */
    doFun: function ({ name, mark, param }) {
        let delay = 1000;
        if (!!param && param.delay > -1) {
            delay = param.delay;
        }
        sleep(delay);
        if (!!name) {
            let funName = "do" + Utils.titleCase(name);
            // let fn = new Function("","return typeof this."+funName+" === 'function' ? this." + funName + "(mark,param) : false;");
            // let fn = new Function("this." + funName + "(mark,param)");
            // return fn();
            return eval("this." + funName + "(mark,param);");
        } else {
            console.log('not do fun:' + name);
        }
    },
    delay: function () {
        let type = arguments[0] === false ? false : true;
        let delay = typeof (arguments[0]) === "number" ? arguments[0] : 1000;
        if (type) {
            sleep(delay);
            console.log('delay', delay);
        } else {
            console.log('not delay');
        }
    }
}

module.exports = operate;




/***/ }),

/***/ "./src/common/sms.js":
/*!***************************!*\
  !*** ./src/common/sms.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
* @fileOverview 短信指定接收，目前采用51短信平台
* @description 本脚本在Auto.Js 4.0.1版本中，自动化控制Android微博版本号:9.6.3版测试通过！
* @author <a href=”tuple@youshui.ren”>Tuple</a>
* @version 0.1
*/


var Env = __webpack_require__(/*! ../env */ "./src/env.js");

var sms={
 
  _errorCode: {
    1001: '参数token不能为空',
    1002: '参数action不能为空',
    1003: '参数action错误',
    1004: 'token失效',
    1005: '用户名或密码错误',
    1006: '用户名不能为空',
    1007: '密码不能为空',
    1008: '账户余额不足',
    1009: '账户被禁用',
    1010: '参数错误',
    1011: '账户待审核',
    1012: '登录数达到上限',
    2001: '参数itemid不能为空',
    2002: '项目不存在',
    2003: '项目未启用',
    2004: '暂时没有可用的号码',
    2005: '获取号码数量已达到上限',
    2006: '参数mobile不能为空',
    2007: '号码已被释放',
    2008: '号码已离线',
    2009: '发送内容不能为空',
    2010: '号码正在使用中',
    3001: '尚未收到短信',
    3002: '等待发送',
    3003: '正在发送',
    3004: '发送失败',
    3005: '订单不存在',
    3006: '专属通道不存在',
    3007: '专属通道未启用',
    3008: '专属通道密码与项目不匹配',
    9001: '系统错误',
    9002: '系统异常',
    9003: '系统繁忙'
  },

  getPhone:function(itemid) {

      var baseUrl = 'http://api.fxhyd.cn/UserInterface.aspx?action=getmobile&token=' + Env.token + '&itemid=' + itemid + '&excludeno=' + Env.exceptPhone + '&timestamp=' + new Date().getTime() //
      var r = http.get(baseUrl);
      console.log("从平台获取手机号码code = " + r.statusCode);
      var result = r.body.string()
      console.log("从平台获取手机号码html = " + result);
      if (result.indexOf('success') != -1) {
        result = result.split('|');
        var phone = result[1]
        console.log('手机号码=', phone)
        return phone
      } else {
        console.log(this._errorCode[result])
        console.log('从平台获取手机号码异常,请检查网络或者token是否失效,脚本停止')
        return null;
      }
    },

    getSMS:function(phone, itemid) {
      var count = 50;
      var r = null;
      var result = null;
      var baseUrl = 'http://api.fxhyd.cn/UserInterface.aspx?action=getsms&token=' + Env.token + '&itemid=' + itemid + '&mobile=' + phone + '&release=1&timestamp=' + new Date().getTime();
      while (count > 0) {
        r = http.get(baseUrl);
        console.log("从平台获取手机验证码code = " + r.statusCode);
        result = r.body.string();
        console.log("从平台获取手机验证码html = " + result);
        toast(result);
        if (result != 3001) {
          break;
        }
        count -= 1;
        sleep(3000);
      }
      if (!!result && result.indexOf('success') != -1) {
        result = result.split('|');
        var code = result[1].match(/\d{6}/g).join("");
        console.log('验证码=', code)
        return code
      } else {

        console.log(this._errorCode[result])
        console.log('从平台获取手机验证码异常,请检查网络或者token是否失效')
        return null
      }
    },

    sendSMS:function(phone, itemid, msg) {

      var baseUrl = 'http://api.fxhyd.cn/UserInterface.aspx?action=sendsms&token=' + Env.token + '&itemid=' + itemid + '&mobile=' + phone + '&sms=' + msg + '&timestamp=' + new Date().getTime();
      var r = http.get(baseUrl);
      console.log("从手机号码发送code = " + r.statusCode);
      var result = r.body.string();
      toast(result);
      console.log("从平台发送手机号码html = " + result);
      if (result.indexOf('success') != -1) {
        return result
      } else {
        console.log(this._errorCode[result])
        console.log('从平台发送短信异常,请检查网络或者Env.是否失效,脚本停止')
        return null
      }
    },

    addPhoneBack:function(phone, itemid) {
      var baseUrl = 'http://api.fxhyd.cn/UserInterface.aspx?action=addignore&token=' + Env.token + '&itemid=' + itemid + '&mobile=' + phone + '&timestamp=' + new Date().getTime() //
      var r = http.get(baseUrl);
      console.log("拉黑手机号码code = " + r.statusCode);
      var result = r.body.string()
      console.log("拉黑手机号码html = " + result);
      if (result.indexOf('success') != -1) {
        console.log('手机号码拉黑成功=', phone)
      } else {
        console.log(this._errorCode[result])
        console.log('拉黑手机号码异常,请检查网络或者token是否失效,脚本停止')
        return null;
      }
    }
}
module.exports=sms


/***/ }),

/***/ "./src/common/utils.js":
/*!*****************************!*\
  !*** ./src/common/utils.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
* @fileOverview 工具函数类
* @description 本脚本在Auto.Js 4.0.1版本中，自动化控制Android微博版本号:9.6.3版测试通过！
* @author <a href=”tuple@youshui.ren”>Tuple</a>
* @version 0.1
*/

var Utils = {
    /**
     * 首字母大写
     * @param {*} str 
     */
    titleCase: function (str) {
        var a = str.toLowerCase().split('_');
        var b = a.map(function (val) { return val.replace(val.charAt(0), val.charAt(0).toUpperCase()) })
        return b.join('');
    },
    fill: function (len, item) {
        var l = [];
        for (var i = 0; i < len; i += 1) {
            l.push(JSON.parse(JSON.stringify(item)));
        }
        return l;
    },
    get: function (arr, name, value) {
        return arr.find(function (obj) { if (eval("obj." + name + " == value")) { return obj; } });
    },
    isNull: function (str) {
        //为空判断函数
        return !str && str !== 0 && typeof str !== "boolean" ? true : false;
    }

}
module.exports = Utils;

/***/ }),

/***/ "./src/common/work.js":
/*!****************************!*\
  !*** ./src/common/work.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
* @fileOverview 入口文件
* @description 本脚本在Auto.Js 4.0.1版本中，自动化控制Android微博版本号:9.6.3版测试通过！
* 欢迎使用和提交bug反馈
* 设备要求：
* 1.需要root
* 2.安卓5.0以上
* 3.Auto.js软件版本4.0以上
*
* 使用方法：
* 1.将脚本与./dist/main.js放于同一目录下
* 2.直接启动脚本即可
* 3.暂时不支持解锁手机
*
* @author <a href=”tuple@youshui.ren”>Tuple</a>
* @version 0.1
*/

var Env = __webpack_require__(/*! ../env */ "./src/env.js");
var Api = __webpack_require__(/*! ./api */ "./src/common/api.js");
var Utils = __webpack_require__(/*! ./utils */ "./src/common/utils.js");
var Operate = __webpack_require__(/*! ./operate */ "./src/common/operate.js");


var work = {

  _curPage: 0,
  _curConf: null,
  _pageList: [],
  _curStep: 0,
  _curJob: {},
  _needExit:false,
  
  init: function (job) {
    auto();

    var _curRa = new RootAutomator();
    events.on('exit', function () {
      _curRa.exit();
    });
    //获取截屏的权限
    requestScreenCapture();

    let package = job.package;

    if (currentPackage() != package) {
      launch(package);
      waitForPackage(package);
      sleep(5000);
    }
    let activity = job.activity;
    if(!Utils.isNull){
      toast('Wait For Activity:',activity);
      console.log('Wait For Activity:',activity);
      waitForActivity(activity);
    }
    //远程获取配置
    Api.getConfig();
    toast('获取配置成功');
    console.log('获取配置成功');
    sleep(1000);

  },

  /**
   * 主函数
   */
  main: function (jib, afterInit) {

    this._curJob = jib;
    //初始化
    this.init(this._curJob);

    //执行回调
    if (typeof afterInit === 'function') {
      afterInit(this._curJob);
    }

    Env.CLIENT = this._curJob.CLIENT;

    // let items = {
    //   login: JSON.parse(JSON.stringify(this._curJob.login)),
    //   nickname: JSON.parse(JSON.stringify(this._curJob.nickname)),
    //   write: JSON.parse(JSON.stringify(this._curJob.write)),
    //   logout: JSON.parse(JSON.stringify(this._curJob.logout)),
    //   running: JSON.parse(JSON.stringify(this._curJob.running)),
    // };
    //初始化
    while (!this._needExit) {
      //判断下一步的位置
      this.nextStep();
      for( let item of this._curJob.default.steps){
          if(item.step == this._curStep){
            this.run(JSON.parse(JSON.stringify(item)));
          }
      }

      sleep(3000);
    }
    //结束
    Api.finish();

  },

  /**
   * 判断下一步执行什么
   */
  nextStep: function () {
    let conf = Operate.curPage(this._curJob.pages);
    if (this._curPage != conf.pageid) {
      if (!!conf.operates && !!conf.operates.finish && conf.operates.finish.length > 0) {
        // this._pageList.splice(0,0,conf);
        this._pageList.push(conf);
      }
      this._curPage = conf.pageid;
      this._curConf = conf;
    }
    let someone = this._curJob.default.someone;
    for (let item of this._curJob.default.steps) {
      if (item.step === this._curStep && someone.length > 0) {
        someone = item.step.someone;
        break;
      }
    }
    this._curStep = Operate.nextStep(this._curPage, someone);
    toast('find:' + conf.name, this._curStep);
    console.log('find:' + conf.name, this._curStep);

  },

  /**
   * 执行指定任务
   * @param {*} items 
   */
  run: function (items) {
    this.doPage(items, this._curConf);
    sleep(2000);
  },
  /**
   * 处理页面的操作
   * @param {*} items 
   * @param {*} conf 
   */
  doPage: function (items, conf) {
    let _job = null;
    console.log('items.length start', items.must.length, this._curStep);
    if (!!conf && !!conf.pageid && items.must.length > 0) {
      for (let m in items.must) {
        if (conf.pageid === items.must[m].pageid) {
          // toast(conf.name);
          // console.log(JSON.stringify(items[m].jobs));
          _job = items.must[m];
          // console.log(m,items[m].pageid);
          items.must.splice(m, 1);
          break;
        }
      }
      // console.log('in do page job 1:', JSON.stringify(_job));
      if (_job == null) {
        for (let m in this._curJob.default.someone) {
          if (conf.pageid === this._curJob.default.someone[m].pageid) {
            // toast(conf.name);
            // console.log(JSON.stringify(this._curJob.default[m].jobs));
            _job = this._curJob.default.someone[m];
            // console.log(m,this._curJob.default[m].pageid);
            break;
          }
        }
      }
      // console.log('in do page job:', JSON.stringify(_job));
      if (_job != null) {
        if (!!_job.next) {
          this._curStep = _job.next;
        }
        // console.log('in do page this._curjob.jobs:', JSON.stringify(_job.jobs));
        if (!!_job && !!_job.jobs) {
          for (let im of _job.jobs) {
            // console.log('in do page conf.mark:', JSON.stringify(conf.mark));
            if (conf.pageid !== Env.PageEnum.UNKNOW && Operate.isPage(conf.mark)) {
              // console.log('loop job:', JSON.stringify(im));
              Operate.doFun(im);
            } else {
              // console.log('not in right page:', conf.name);
              break;
            }
          }

        }
        if (!Utils.isNull(_job.exit) && _job.exit === true) {
          this._needExit = true;
        }
      }
    }
    console.log('items.must.length end', items.must.length, this._curStep);

  },

  /**
   * 通过返回操作，回到首页
   */
  reset: function () {
    while (true) {
      let conf = Operate.curPage(this._curJob.pages);
      if (Env.PageEnum.HOME != conf.pageid) {
        toast('找到：' + conf.name);
        console.log('找到：' + conf.name);
        break;
      } else {
        this.doBack();
      }
      sleep(2000);

    }
  },
  /**
   * 返回操作
   */
  doBack: function () {
    let im = { name: "back" };
    Operate.doFun(im);
  },

  /**
   * 处理页面的finish操作
   * @param {*} pageList 
   */
  finishPage: function (pageList) {
    result = false;
    for (let k = pageList.length - 1; k >= 0; k--) {
      let item = pageList[k];
      //执行finish
      if (!!item.operates && !!item.operates.finish) {
        if (Operate.isPage(item.mark)) {
          for (let im of item.operates.finish) {
            Operate.doFun(im);
          }
          pageList.splice(k, 1);
          console.log('delete finish page:', item.name);
        } else {
          console.log('finish, but not in right page:', item.name);
        }
      }
      sleep(2000);
    };
    if (pageList.length <= 0) {
      result = false;
    }
    console.log('finishPage:', JSON.stringify(pageList), result);
    return result;
  },
}
module.exports = work;


/***/ }),

/***/ "./src/env.js":
/*!********************!*\
  !*** ./src/env.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
* @fileOverview 全局变量
* @description 本脚本在Auto.Js 4.0.1版本中，自动化控制Android微博版本号:9.6.3版测试通过！
* @author <a href=”tuple@youshui.ren”>Tuple</a>
* @version 0.1
*/


var Env = {

  VERSION: "3.0",
  CLIENT: 'weibo',

  STATUS_NEED_ACTIVE: 1,
  STATUS_NEED_LOGIN: 2,

  log: '',
  curAct: '',
  curTitleContent: '',//详情页的标题
  curComment: '键(shui)盘(jun)侠你们清楚自己在干嘛吗？',
  curName: '',
  deviceIMEI: '',
  nickname: '', //登陆的账号
  curGroupId: 0, //
  curTitle: '', //列表页的标题
  canReply: false,
  mainActName: 'com.sina.weibo.MainTabActivity',
  isLogined: true,
  needExit: false,
  maxReplyCount: 2,
  curReplyCount: 0, //一次可以回复的最大次数
  lastReplyTime: 0,
  curMinReplyIntv: 1800, //30分钟才能回复第二条
  curLoop: false,
  isComment: 1, //0评论，1转发
  curKeyword: null,
  curKeywords: ['十年沧桑谁解'],
  // login
  itemLogin: '11698',
  itemJihuo: '1507',
  token: '01612967355ef542176c2740c0855e2a5921725c4701',
  exceptPhone: '170.171.180.198.165.166',
  curPhone: '', //当前使用的手机号
  curLoginCode: '',
  curHotTextItem: '',
  curUsername: '',
  curPassword: '',
  curRegisterCode: '',
  itemRegister: '47028', //网易邮箱
  // console.show(),
  config: {
    debug: false,
    disabled: false,
    canReply: false,
    canReplyDisabled: false,
    exit: false,
    model: 0, //0为趁热点，1为通过搜索指定关键字回复
    groupId: 0,
    topOfGroup: 10,
    groupDelay: 2000,
    subGroupId: -1,
    groupItems: ['推荐', '榜单', '社会', '搞笑', '情感', '时尚', '校园', '摄影', '艺术', '明星', '美女', 'NBA'],
    keywords: ['十年沧桑谁解'],
    addFollowRate: 30,
    showDetialRate: 5,
    maxReplyCount: 2,
    minReplyIntv: 1800,
    loop: false, //循环
    isComment: 1,
    itemLogin: '11698',
    itemJihuo: '1507',
    itemRegister: '47028',
    exceptPhone: '170.171.180.198.165.166',
    token: '01612967355ef542176c2740c0855e2a5921725c4701',
  },


  PageEnum: {
    UNKNOW:0,
    LOGIN: 1,
    INPUT_CODE: 2,
    ACCOUNT_CONFIRM: 3,
    SELECT_CLASS: 4,
    RECOMMEND: 5,
    SIGEN: 6,
    USER_CENTER: 7,
    DETAIL: 8,
    HOME_HOT: 9,
    MINE: 10,
    SETTING: 11,
    ACCOUNTS: 12,
    HOME_FOLLOW: 13,
    HOME_SEARCH: 14,
    SEARCH: 15,
    SEARCH_HOT: 16,
    SEARCH_TALK: 17,
    SEARCH_TOP: 18,
    SEARCH_SUPTALK: 19,
    HOME_MESSAGE: 20,
    USER_WEIBO: 21,
    EDIT_SHARE: 22,
    ADD_FOLLOW_WITH_SHARE: 23,
    ACCOUNT_ERROR: 24,
    WELCOME_CAMEBACK: 25,
    WRITE_WEIBO: 26,
    WELCOME_WEIBO: 27,
    ACCOUNT_ERROR_2: 28,
    ACCOUNT_ERROR_3: 29,
    ACCOUNT_ERROR_4: 30,
    HOME: 31,
    ACCOUNT_ERROR_5: 32,
    ACCOUNT_ERROR_6: 33,
    REGISTER: 35,
    ACCOUNT_SEND_CONFIRM: 36,
    REGISTER_OK: 37,
    UPDATED:38,
    INPUT_PHONE: 39,
    INPUT_PASSWORD: 40,
    FIND_PASSWORD:41,
    RED_PAGE:42,
    RED_FRIEND_PAGE:43,
    RED_BUY_PAGE:44,
  
  },

  /**
 * @description 定义各步骤的标志
 */
  STEP: {
    NOCHANGE: 0,
    LOGIN: 1,
    WRITE: 3,
    LOGOUT: 9,
    NICKNAME: 2,
    ISSTEP: 5,
    NEEDLOGOUT: 6,
    LOGINED: 7,
    RUNNING: 8,
    BEFORE:9,
  },

}
module.exports = Env;


/***/ }),

/***/ "./src/work/微博-登录.js":
/*!***************************!*\
  !*** ./src/work/微博-登录.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
* @fileOverview 入口文件
* @description 本脚本在Auto.Js 4.0.1版本中，自动化控制Android微博版本号:9.6.3版测试通过！
* 欢迎使用和提交bug反馈
* 设备要求：
* 1.需要root
* 2.安卓5.0以上
* 3.Auto.js软件版本4.0以上
*
* 使用方法：
* 1.将脚本与./dist/main.js放于同一目录下
* 2.直接启动脚本即可
* 3.暂时不支持解锁手机
*
* @author <a href=”tuple@youshui.ren”>Tuple</a>
* @version 0.1
*/

var Work = __webpack_require__(/*! ../common/work */ "./src/common/work.js");
var Env = __webpack_require__(/*! ../env */ "./src/env.js");

/**
 * 注意：如果一个页面有多个特征码匹配，以最后一个为准
 */
var Job = {
    version: '9.6.3',
    CLIENT:'weibo',
    package:'com.sina.weibo',
    activity: "com.sina.weibo.MainTabActivity",
  
    /**
     * @description 默认配置，自动加载
     */
    get default() {
        return {
            /**
             * @description steps定义当前任务需要完成工作的步骤
             */
            steps: [this.login, this.nickname, this.write, this.logout],
            /**
             * @description 指定某一步骤的最大重复次数
             */
            maxTimes:[-1,-1,3,-1],
            /**
             * @description 定义可能遇到的页面默认处理方式; next:为强制跳转，pageid:为页面ID，jobs:为具体的执行操作
             */
            someone: [
                { next: Env.STEP.LOGIN, pageid: Env.PageEnum.LOGIN, jobs: this.pages.LOGIN.operates.login },
                { next: Env.STEP.LOGIN, pageid: Env.PageEnum.INPUT_CODE, jobs: this.pages.INPUT_CODE.operates.code },
                { next: Env.STEP.WRITE, pageid: Env.PageEnum.DETAIL, jobs: this.pages.DETAIL.operates.follow },
                { next: Env.STEP.WRITE, pageid: Env.PageEnum.HOME_HOT, jobs: this.pages.HOME_HOT.operates.write },
                { next: Env.STEP.WRITE, pageid: Env.PageEnum.HOME_FOLLOW, jobs: this.pages.HOME_FOLLOW.operates.write },
                { next: Env.STEP.WRITE, pageid: Env.PageEnum.MINE, jobs: this.pages.MINE.operates.nickname },
                { next: Env.STEP.WRITE, pageid: Env.PageEnum.MINE, jobs: this.pages.MINE.operates.home },
                { next: Env.STEP.WRITE, pageid: Env.PageEnum.WRITE_WEIBO, jobs: this.pages.WRITE_WEIBO.operates.write },
                { next: Env.STEP.WRITE, pageid: Env.PageEnum.EDIT_SHARE, jobs: this.pages.EDIT_SHARE.operates.comment },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.MINE, jobs: this.pages.MINE.operates.setting },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.SETTING, jobs: this.pages.SETTING.operates.accounts },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNTS, jobs: this.pages.ACCOUNTS.operates.add },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_2, jobs: this.pages.ACCOUNT_ERROR_2.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_3, jobs: this.pages.ACCOUNT_ERROR_3.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_4, jobs: this.pages.ACCOUNT_ERROR_4.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_5, jobs: this.pages.ACCOUNT_ERROR_5.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_CONFIRM, jobs: this.pages.ACCOUNT_CONFIRM.operates.finish },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR, jobs: this.pages.ACCOUNT_ERROR.operates.cancel },
            ],
        }
    },
    /**
     * @description Login步骤，为登陆步骤：分为必须步骤(must)和可能步骤(someone)
     */
    get login() {
        return {
            step: Env.STEP.LOGIN,
            must: [
                { pageid: Env.PageEnum.LOGIN, jobs: this.pages.LOGIN.operates.login },
                { pageid: Env.PageEnum.INPUT_CODE, jobs: this.pages.INPUT_CODE.operates.code },
            ],
            someone: [
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.HOME_HOT, jobs: this.pages.HOME_HOT.operates.mine },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.HOME_FOLLOW, jobs: this.pages.HOME_FOLLOW.operates.mine },
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.ACCOUNT_CONFIRM, jobs: this.pages.ACCOUNT_CONFIRM.operates.finish },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR, jobs: this.pages.ACCOUNT_ERROR.operates.cancel },
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.WELCOME_CAMEBACK, jobs: this.pages.WELCOME_CAMEBACK.operates.next },
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.SELECT_CLASS, jobs: this.pages.SELECT_CLASS.operates.next },
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.RECOMMEND, jobs: this.pages.RECOMMEND.operates.next },
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.SIGEN, jobs: this.pages.SIGEN.operates.finish },
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.USER_CENTER, jobs: this.pages.USER_CENTER.operates.finish },
                { next: Env.STEP.NOCHANGE, pageid: Env.PageEnum.WELCOME_WEIBO, jobs: this.pages.WELCOME_WEIBO.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_2, jobs: this.pages.ACCOUNT_ERROR_2.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_3, jobs: this.pages.ACCOUNT_ERROR_3.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_4, jobs: this.pages.ACCOUNT_ERROR_4.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_5, jobs: this.pages.ACCOUNT_ERROR_5.operates.next },
                { next: Env.STEP.LOGOUT, pageid: Env.PageEnum.ACCOUNT_ERROR_6, jobs: this.pages.ACCOUNT_ERROR_6.operates.next },
            ],
        }

    },
    /**
     * 写微博
     */
    get write() {
        return {
            step: Env.STEP.WRITE,
            must: [
                { isLogined: true, pageid: Env.PageEnum.HOME_FOLLOW, jobs: this.pages.HOME_FOLLOW.operates.write },
                { isLogined: true, pageid: Env.PageEnum.WRITE_WEIBO, jobs: this.pages.WRITE_WEIBO.operates.write },
                { isLogined: true, pageid: Env.PageEnum.EDIT_SHARE, jobs: this.pages.EDIT_SHARE.operates.comment },
            ],
            someone: [],
        }
    },
    /**
     * 退出登录
     */
    get logout() {
        return {
            step: Env.STEP.LOGOUT,
            must: [
                { pageid: Env.PageEnum.HOME_FOLLOW, jobs: this.pages.HOME_FOLLOW.operates.mine },
                { pageid: Env.PageEnum.MINE, jobs: this.pages.MINE.operates.setting },
                { pageid: Env.PageEnum.SETTING, jobs: this.pages.SETTING.operates.accounts },
                { pageid: Env.PageEnum.ACCOUNTS, jobs: this.pages.ACCOUNTS.operates.add },
            ],
            someone: [],
        }
    },
    /**
     * 获取登录昵称
     */
    get nickname() {
        return {
            step: Env.STEP.NICKNAME,
            must: [
                { pageid: Env.PageEnum.HOME_FOLLOW, jobs: this.pages.HOME_FOLLOW.operates.mine },
                { pageid: Env.PageEnum.MINE, jobs: this.pages.MINE.operates.nickname },
            ],
            someone: [],
        }
    },
    /**
     * ... 还可以定义更多的步骤
     */
    /**
     * 定义页面的识别标志及具体的各操作
     */
    pages: {
        LOGIN: {
            desc: "登陆页输入手机号",
            name: "登录",
            /** 
             * mark: 页面的标志控件，当页面找到匹配mark属性的控件时，我们认为它就位于这个页面 
             * mark可能的属性：id,text,desc,className,textStartsWith,textEndsWith,
             * descStartsWith,descEndsWith 具体可以参考<a href="https://hyb1996.github.io/AutoJs-Docs/#/widgetsBasedAutomation?id=uiselector">Autojs控件uiselector的函数</a>
             */
            mark: { id: "", text: "登录注册更精彩", desc: "", className: "android.widget.TextView" },
            pageid: Env.PageEnum.LOGIN,
            next: [],
            /**
             * 定义这个页面可以的操作：name是操作名称目前支持
             * get 获取本地或者远程文本并写到全局变量，调用operate.js中的do函数处理,
             * set_text 设置控件的text属性，调用operate.js中的do函数处理,
             * click 点击这个按钮，调用operate.js中的do函数处理,
             * input OneByOne向控件输入文字，调用operate.js中的do函数处理,
             * swipe 滑动页面，调用operate.js中的do函数处理,
             * sleep 暂停，调用operate.js中的do函数处理,
             * refresh 下拉刷新页面，调用operate.js中的do函数处理,
             * back 点击Android的返回键，调用operate.js中的do函数处理,
             * text 获取控件的text属性值，调用operate.js中的do函数处理,
             * desc 获取控件的desc描述值，调用operate.js中的do函数处理,
             * tap 点击控件位置的屏幕，调用operate.js中的do函数处理,
             * enter 触发回车，调用operate.js中的do函数处理,
             */
            operates: {
                login: [
                    { name: "get", mark: { name: "login_phone", uri: "api" }, param: { set: { name: "phone" } } },
                    { name: "set_text", mark: { id: "et_phone" }, param: { get: { name: "phone" } } },
                    { name: "click", mark: { id: "bnLogin", text: "获取验证码" } },
                ],
            },
        },
        INPUT_CODE: {
            desc: "验证码输入页",
            name: "请输入验证码", pageid: Env.PageEnum.INPUT_CODE, mark: { id: "tv_verification_title", text: "请输入验证码", desc: "", className: "" },
            next: [],
            operates: {
                code: [
                    { name: "input", mark: { id: "verification_code" }, param: { get: { name: "login_code", uri: "api" } } },
                ],
                finish: [{ name: "back" }],
            },
        },
        ACCOUNT_CONFIRM: {
            desc: "帐号确认",
            name: "帐号确认", pageid: Env.PageEnum.ACCOUNT_CONFIRM, mark: { id: "", text: "帐号确认", desc: "", className: "android.widget.TextView" },
            next: [],
            operates: {
                finish: [{ name: "back" }],
            },
        },
        DETAIL: {
            desc: "微博正文",
            name: "微博正文", pageid: Env.PageEnum.DETAIL,
            mark: { id: "detail_activity_header_title_text", text: "微博正文", desc: "", className: "" },
            next: [],
            operates: {
                follow: [
                    //点击微博详情的关注按钮
                    { name: "click", mark: { id: "tv_op_button", text: "关注" } },
                ],
                liked: [
                    //点击微博详情的赞按钮，两种可能
                    { name: "click", mark: { id: "liked", desc: "赞" } },
                    { name: "click", mark: { id: "tvButton", text: "赞" } },
                ],
                forward: [
                    //点击微博详情的转发按钮
                    { name: "click", mark: { id: "forward", desc: "转发" } },
                    { name: "click", mark: { id: "tvButton", text: "转发" } },
                ],
                finish: [{ name: "back" }],
            },
        },
        MINE: {
            desc: "我",
            name: "我", pageid: Env.PageEnum.MINE, mark: { id: "titleText", text: "我", desc: "", className: "" },
            next: [],
            operates: {
                nickname: [
                    //取用户昵称,保存到环境变量name
                    { name: "text", mark: { id: "tvNick" }, param: { set: "name" } },
                    //
                ],
                home: [
                    // 首页
                    { name: "click", mark: { desc: "首页" } },
                ],
                setting: [
                    // 点设置
                    { name: "click", mark: { id: "rltitleSave" } },
                ],
                finish: [{ name: "back" }],
            },
        },
        SETTING: {
            desc: "设置",
            name: "设置", pageid: Env.PageEnum.SETTING, mark: { id: "titleText", text: "设置", desc: "", className: "" },
            next: [],
            operates: {
                accounts: [
                    { name: "click", mark: { id: "accountLayout" } }
                ],
                finish: [{ name: "back" }],
            },
        },
        ACCOUNTS: {
            desc: "帐号管理",
            name: "帐号管理", pageid: Env.PageEnum.ACCOUNTS, mark: { id: "titleText", text: "帐号管理", desc: "", className: "" },
            next: [],
            operates: {
                add: [
                    { name: "click", mark: { id: "tvAccountName", text: "添加帐号" } }
                ],
                finish: [{ name: "back" }],
            },
        },
        HOME_FOLLOW: {
            desc: "首页关注",
            name: "首页关注", pageid: Env.PageEnum.HOME_FOLLOW, mark: { id: "iv_groupStateIndicator", className: "android.widget.ImageView" },
            next: [],
            operates: {
                mine: [
                    { name: "click", mark: { desc: "我" } },
                ],
                write: [
                    { name: "click", mark: { id: "rltitleSave" } },
                ],
                search: [
                    { name: "tap", mark: { id: "tv_search_keyword" } },
                ],
                find: [
                    //写完后找到刚才的文章
                    { name: "click", mark: { id: "tv_userinfo" }, param: { indexOf: { tag: "text", try: 10, get: { name: "given_weibo_title", uri: "api" } } } }
                ],
                finish: [{ name: "swipe" }],
            },
        },
        HOME_HOT: {
            desc: "首页热门",
            name: "首页热门", pageid: Env.PageEnum.HOME_HOT, mark: { id: "tv_groupName", text: "热门", desc: "", className: "" },
            next: [],
            operates: {
                mine: [
                    { name: "click", mark: { desc: "我" } },
                ],
                write: [
                    { name: "click", mark: { id: "rltitleSave" } },
                ],
                search: [
                    { name: "tap", mark: { id: "tv_search_keyword" } },
                ],
                select_item: [
                    //选择热门栏目
                    { name: "click", mark: { id: "button_more_columns" } },
                    { name: "click", mark: { id: "text_item" }, param: { indexOf: { tag: "text", get: { name: "hot_text_item", uri: "api" } } } },
                ],
                detail: [//点击列表，跳到微博详情页面
                    { name: "click", mark: { id: "contentTextView" }, param: { indexOf: -1 } }
                ],
                finish: [{ name: "swipe" }],
            },
        },
        SEARCH: {
            desc: "搜索页",
            name: "搜索页", pageid: Env.PageEnum.SEARCH, mark: { id: "btn_search_or_back", text: "", desc: "", className: "" },
            next: [],
            operates: {
                keyword: [
                    { name: "get", mark: { name: "keyword", uri: "api" }, param: { set: { name: "keyword" } } },
                    { name: "set_text", mark: { id: "tv_search_keyword" }, param: { get: { name: "keyword" } } },
                    { name: "enter" },
                ],
                finish: [{ name: "swipe" }],
            },
        },
        EDIT_SHARE: {
            desc: "转发微博",
            name: "转发微博", pageid: Env.PageEnum.EDIT_SHARE, mark: { id: "titleText", textEndsWith: "发微博" },
            next: [],
            operates: {
                comment: [
                    { name: "click", mark: { id: "checkbox" } },
                    { name: "set_text", mark: { id: "edit_view" }, param: { get: { name: "comment", uri: "api" } } },
                    { name: "click", mark: { id: "rltitleSave" } },
                ]
            },
        },
        HOME_SEARCH: {
            desc: "首页搜索",
            name: "首页搜索", pageid: Env.PageEnum.HOME_SEARCH, mark: { id: "textView_title", text: "微博热搜", desc: "", className: "android.widget.TextView" },
            next: [],
            operates: {
                search: [
                    { name: "tap", mark: { id: "tv_search_keyword" } },
                ],
                finish: [{ name: "swipe" }],
            },
        },
        ADD_FOLLOW_WITH_SHARE: {
            desc: "加关注才能转发",
            name: "加关注才能转发", pageid: Env.PageEnum.ADD_FOLLOW_WITH_SHARE, mark: { className: "android.widget.TextView", text: "由于对方的设置，你需要先关注他，才能评论。" },
            next: [],
            operates: {
                follow: [{ name: "click", mark: { className: "android.widget.TextView", text: "加关注" } }],
            },
        },
        ACCOUNT_ERROR: {
            desc: "帐号异常",
            name: "帐号异常", pageid: Env.PageEnum.ACCOUNT_ERROR, mark: { className: "android.widget.TextView", text: "帐号异常" },
            next: [],
            operates: {
                cancel: [
                    { name: "click", mark: { className: "android.widget.TextView", text: "取消" } },
                ]
            },
        },
        WELCOME_CAMEBACK: {
            desc: "好久不见，欢迎回来",
            name: "好久不见，欢迎回来", pageid: Env.PageEnum.WELCOME_CAMEBACK, mark: { id: "tv_top_title", text: "好久不见，欢迎回来" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { id: "next" } },
                    { name: "sleep" },
                    { name: "click", mark: { id: "next" } },
                ]
            },
        },
        WRITE_WEIBO: {
            desc: "首页上写微博",
            name: "首页上写微博", pageid: Env.PageEnum.WRITE_WEIBO, mark: { className: "android.widget.TextView", text: "写微博" },
            next: [],
            operates: {
                write: [
                    { name: "click", mark: { className: "android.widget.TextView", text: "写微博" } },
                ],
            },
        },
        SELECT_CLASS: {
            desc: "选择你感兴趣的分类",
            name: "选择你感兴趣的分类", pageid: Env.PageEnum.SELECT_CLASS, mark: { id: "tv_top_title", text: "选择你感兴趣的分类", desc: "", className: "" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { id: "next" } },
                ]
            },
        },
        RECOMMEND: {
            desc: "为你推荐以下博主",
            name: "为你推荐以下博主", pageid: Env.PageEnum.RECOMMEND, mark: { id: "", text: "为你推荐以下博主", desc: "", className: "" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { id: "next" } },
                ]
            },
        },
        SIGEN: {
            desc: "马上签到",
            name: "马上签到", pageid: Env.PageEnum.SIGEN, mark: { id: "iv_content", text: "", desc: "", className: "" },
            next: [],
            operates: {
                finish: [{ name: "back" }],
            },
        },
        USER_CENTER: {
            desc: "用户任务中心",
            name: "用户任务中心", pageid: Env.PageEnum.USER_CENTER, mark: { id: "titleText", text: "用户任务中心", desc: "", className: "" },
            next: [],
            operates: {
                finish: [{ name: "back" }],
            },
        },
        USER_WEIBO: {
            desc: "用户微博",
            name: "微博", pageid: Env.PageEnum.USER_WEIBO, mark: { id: "titleText", text: "微博", desc: "", className: "" },
            next: [],
            operates: {
                finish: [{ name: "back" }],
            },
        },
        HOME_MESSAGE: {
            desc: "消息",
            name: "消息", pageid: Env.PageEnum.HOME_MESSAGE, mark: { id: "tab_text_view", text: "消息", desc: "", className: "android.widget.TextView" },
            next: [],
            operates: {
                finish: [{ name: "back" }],
            },
        },
        WELCOME_WEIBO: {
            desc: "欢迎继续使用微博",
            name: "欢迎继续使用微博", pageid: Env.PageEnum.WELCOME_WEIBO, mark: { className: "android.widget.TextView", text: "欢迎继续使用微博" },
            next: [],
            operates: {
                next: [{ name: "click", mark: { id: "bt_next", text: "查看推荐" } }],
                find: [
                    { name: "click", mark: { id: "tv_userinfo" }, param: { indexOf: { tag: "text", try: 10, get: { name: "given_weibo_title", uri: "api" } } } }
                ],
                finish: [{ name: "swipe" }],
            },
        },
        ACCOUNT_ERROR_2: {
            desc: "帐号异常",
            name: "帐号异常", pageid: Env.PageEnum.ACCOUNT_ERROR_2, mark: { className: "android.widget.TextView", text: "解除异常" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { className: "android.widget.TextView", text: "取消" } },
                ],
                finish: [{ name: "back" }],
            },
        },
        ACCOUNT_ERROR_3: {
            desc: "帐号异常",
            name: "帐号异常", pageid: Env.PageEnum.ACCOUNT_ERROR_3, mark: { className: "android.widget.TextView", text: "知道了" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { className: "android.widget.TextView", text: "知道了" } },
                ],
                finish: [{ name: "back" }],
            },
        },
        ACCOUNT_ERROR_4: {
            desc: "帐号异常",
            name: "帐号异常", pageid: Env.PageEnum.ACCOUNT_ERROR_4, mark: { id: "tvContent", className: "android.widget.TextView", text: "有内容发送失败，已存入草稿箱" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { desc: "我" } },
                ],
                finish: [{ name: "back" }],
            },
        },
        ACCOUNT_ERROR_5: {
            desc: "帐号异常，请先验证身份",
            name: "帐号异常，请先验证身份", pageid: Env.PageEnum.ACCOUNT_ERROR_5, mark: { id: "titleText", className: "android.widget.TextView", text: "请先验证身份" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { id: "titleLeft" } },
                    { name: "click", mark: { id: "tv_title_bar_back" } },
                ],
                finish: [{ name: "back" }],
            },
        },
        ACCOUNT_ERROR_6: {
            desc: "清除数据",
            name: "清除数据", pageid: Env.PageEnum.ACCOUNT_ERROR_6, mark: { id: "btn_restart", text: "清除数据" },
            next: [],
            operates: {
                next: [
                    { name: "click", mark: { id: "btn_restart" } },
                ],
                skip: [
                    { name: "click", mark: { id: "btn_skip" } },
                ],
                finish: [{ name: "back" }],
            },
        },
    },
};

/**
 * 初始化后执行
 */
function afterInit() {
  sleep(1000);
}

var __curJob = JSON.parse(JSON.stringify(Job));
//运行
Work.main(Job, afterInit);





/***/ }),

/***/ 8:
/*!*********************************!*\
  !*** multi ./src/work/微博-登录.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/work/微博-登录.js */"./src/work/微博-登录.js");


/***/ })

/******/ });
//# sourceMappingURL=微博-登录.js.map