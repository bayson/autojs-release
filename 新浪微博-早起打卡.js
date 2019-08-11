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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
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

/***/ "./src/work/新浪微博-早起打卡.js":
/*!*******************************!*\
  !*** ./src/work/新浪微博-早起打卡.js ***!
  \*******************************/
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

// const wb_wz = "iVBORw0KGgoAAAANSUhEUgAAACQAAAATCAIAAAB3HTjaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAARHSURBVHjavFXZS3JbFF8OmaeDfqXpSTODaDTTMm2mgQqKCIWgv6I/p9deg16yIujBhAYjtVBDU5uU6liaGI6Vw/Hch33xllnf2/097b2Gvea1GTRNAwAAHBwc8Pl8jUYDAFdXVz6fz2AwIJbP5wsGg8PDw3V1dfAJLy8vZrO5o6MDaZXRVSpVNBrlcDhKpZLP5wMAE7GdTqfH40kmk09PT5FIJJPJPD8/UxR1d3eXTqfD4XAgEOBwOPAV+Xw+Fou9vb1VpL+/vxME8fj4uL6+HgqFAIANAMFg0G63i0Si0dHR3d1dDMPEYjEA5HK5vb29ubm5VCpVU1OD4zj8jNXV1TKK1WotnY1G4/z8PDsQCJhMJi6XOz09zWQyKz6USqV4PB78ipmZmdI5nU5brdbOzk6ZTFYiisVidj6fxzBsYWEB1YnL5WIY9vmVYrGYTqfz+XzJ95GRkbIiAUBLS0s8HkdnBoMBABiGCQQCRMFxHMdxBk3THx8f2Wx2Y2Ojtra2qqoK5bcEtVp9cXGhUCiEQqHD4eBwOLOzs4VCgSTJ9/d3t9stk8mkUimfz9/f3/8p7tHR0b6+PjYAcLnco6OjXC6n0Wg4HE5XV9dnuUAgAAANDQ0KhcJms8lkMrFYfH5+brfbkQBJkiRJKpVKABgcHFQqldFodGdnR6fToYbc2dlBkmwA8Hq9Nzc3AFBfX//4+FjmFAo0Ho/H4/FcLvfnzx8A0Gq1Wq02FAoZjcbe3t6xsbGXlxePx2Oz2Ww2G1I8Ozs7Ozv7/BT76enp+PgYTRtN04eHhxXzkEgkotEoAJTKUBF/iczhcFAUJZPJSJJkMpkrKytl+g6HI5lMkiSJYRiDwSAI4hdjf4lMp9M1NjZmMhmSJNHuMJlMJXZzc/Pi4uL19fXl5WWxWBSJRL/PAGpUlN6hoSG1Wh0Oh7e3t/81RhAEQRAWi+WzzsDAgEAgOD09RVe5XM5gMJLJZHt7+09meDze5OQkilskEi0vL+M4vrm5mc1m9Xo9qjS7TIeiKNR7crn8/PycpmmbzaZQKAQCQSwWa2trq2jJYrG4XK6f/ECRjYyMlBvLZDIAIBQKkWHU1jweL5lMIi5ifZ9oJBMIBHp6elgsFqJfXFxQFIU2gEQiYX/vuurqahzHo9FoIpHAMGxiYsLpdFIUxWaz0Zx932pSqVQqld7e3vr9fo/HMzU11dTUBAB+vz+fz6vVaiT2Ra1QKDw8PKAtLBAIJBKJwWDwer3Pz88DAwNqtToSiZjN5mKxWDFdra2tBoOBxWJZrdaKMl8i83g8b29v4+PjAMBisfR6/e7u7sPDQ3d3d39/P0VR4XD46uqKIAiVSlXRnkgkWlpayuVya2tr2WwWefAfm6ZpmqbdbvfW1tbr66vVaqU/wev12u320jWbzZ6cnBQKBXRNpVIulysUCtHfcH9/HwwGw+FwSZimaUbpp/4f8M8A4PFz0jCY+D4AAAAASUVORK5CYII=";
const wbqianbao_logo = "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";
// const wbqianbao_wz = "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";
const weiboqianbao_hong = "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";
const zhaoqidaka = "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";


/**
 * 注意：如果一个页面有多个特征码匹配，以最后一个为准
 */
var Job = {
  version: '9.6.3',
  CLIENT: '新浪微博-早起打卡',
  package: 'com.sina.weibo',
  activity: "com.sina.weibo.MainTabActivity",
  /**
   * @description 默认配置，自动加载
   */
  get default() {
    return {
      /**
       * @description steps定义当前任务需要完成工作的步骤
       */
      steps: [this.running],
      /**
       * @description 指定某一步骤的最大重复次数
       */
      maxTimes: [-1],
      /**
       * @description 定义可能遇到的页面默认处理方式; next:为强制跳转，pageid:为页面ID，jobs:为具体的执行操作
       */
      someone: [
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.UPDATED, jobs: this.pages.UPDATED.operates.next },
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.HOME_HOT, jobs: this.pages.HOME_HOT.operates.next },
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.HOME_FOLLOW, jobs: this.pages.HOME_FOLLOW.operates.next },
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.MINE, jobs: this.pages.MINE.operates.next },
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.SIGEN, jobs: this.pages.SIGEN.operates.next },
        { next: Env.STEP.RUNNING, pageid: Env.PageEnum.HOME_MESSAGE, jobs: this.pages.HOME_MESSAGE.operates.next, exit: true },
      ],
    }
  },
  /**
   * @description Running步骤，为登陆步骤：分为必须步骤(must)和可能步骤(someone)
   */
  get running() {
    return {
      step: Env.STEP.RUNNING,
      must: [
        { pageid: Env.PageEnum.HOME_HOT, jobs: this.pages.HOME_HOT.operates.next },
        { pageid: Env.PageEnum.MINE, jobs: this.pages.MINE.operates.next },
        { pageid: Env.PageEnum.SIGEN, jobs: this.pages.SIGEN.operates.next },
        { pageid: Env.PageEnum.HOME_MESSAGE, jobs: this.pages.HOME_MESSAGE.operates.next, exit: true },
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
    UPDATED: {
      desc: "关闭更新弹窗",
      name: "关闭更新弹窗",
      pageid: Env.PageEnum.UPDATED,
      mark: { id: "cancel_update" },
      next: [],
      operates: {
        next: [
          { name: "click", mark: { id: "cancel_update" } },
        ]
      },
    },


    MINE: {
      desc: "个人中心",
      name: "个人中心",
      pageid: Env.PageEnum.MINE,
      mark: { id: "titleText", text: "我" },
      next: [],
      operates: {
        next: [
          { name: "image", mark: { base64: wbqianbao_logo }, param:{action:"tap"} },
        ],
        finish: [{ name: "back" }],
      },
    },

    HOME_HOT: {
      desc: "首页热门",
      name: "首页热门",
      pageid: Env.PageEnum.HOME_HOT,
      mark: { id: "tv_groupName", text: "热门", desc: "", className: "" },
      next: [],
      operates: {
        next: [
          // { name: "click", mark: { id: "redpacket_container" } },
          { name: "click", mark: { desc: "我" } },
        ],
        finish: [{ name: "swipe" }],
      },
    },

    HOME_FOLLOW: {
      desc: "首页关注",
      name: "首页关注",
      pageid: Env.PageEnum.HOME_FOLLOW,
      mark: { id: "iv_groupStateIndicator", className: "android.widget.ImageView" },
      next: [],
      operates: {
        next: [
          { name: "click", mark: { desc: "我" } },
        ],
        finish: [{ name: "back" }],
      },
    },

    SIGEN: {
      desc: "微博钱包",
      name: "微博钱包",
      pageid: Env.PageEnum.SIGEN,
      mark: { name: "image", mark: { base64: weiboqianbao_hong }},
      next: [],
      operates: {
        next: [
          { name: "image", mark: { base64: zhaoqidaka }, param:{action:"tap"}  },
          { name: "sleep" },
          { name: "click", mark: { id: "sign_name" } },
          { name: "sleep" },
        ],
      },
    },

    HOME_MESSAGE: {
      desc: "打卡页面",
      name: "打卡页面",
      pageid: Env.PageEnum.HOME_MESSAGE,
      mark: { id: "listview_header_no_hider_ll_sign_in" },
      next: [],
      operates: {
        next: [
          { name: "click", mark: { id: "listview_header_no_hider_ll_sign_in" } },
          { name: "sleep" },
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
Work.main(__curJob, afterInit);

/***/ }),

/***/ 13:
/*!*************************************!*\
  !*** multi ./src/work/新浪微博-早起打卡.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/work/新浪微博-早起打卡.js */"./src/work/新浪微博-早起打卡.js");


/***/ })

/******/ });
//# sourceMappingURL=新浪微博-早起打卡.js.map