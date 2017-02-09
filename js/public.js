//html root的字体计算应该放在最前面，这样计算就不会有误差了/
//2016.3.23 wjq update 之所以要加个判断返回一个20.5，是因为当用户在谷歌等浏览器直接输入手机端网站网址时，如果用户设置模块自定义样式的高度比较小，由于这时候的clientWidth为1920px，及返回的_htmlFontSize为40，这时候就会使模块太小，展示不完全，因此先取一个较为准确的值去展示。Mobi.resetHtmlFontSize()顺便也加了
var _htmlFontSize = (function () {
    var clientWidth = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
    if (clientWidth > 640) clientWidth = 640;
    document.documentElement.style.fontSize = clientWidth * 1 / 16 + "px";
    return clientWidth * 1 / 16;
})();




//管理态下的预览页面提前作处理 之前这里的g_viewMode先去掉
if (!false && window.top !== window.self) {
    var g_className = document.getElementById("g_body").className;
    document.getElementById("g_body").className = g_className + " ";
}

//用于iframe显示手机模板的时候 给g_web加上width
var g_webWidth = 0;
if (g_webWidth == 0) {
    g_webWidth = window.localStorage ? localStorage.getItem("g_webWidth") : Cookie.read("g_webWidth");
    if (g_webWidth != null) {
        document.getElementById("g_web").style.width = g_webWidth + "px";
    }
} else {
    document.getElementById("g_web").style.width = g_webWidth + "px";
    if (window.localStorage) {
        localStorage.setItem("g_webWidth", g_webWidth);
    } else {
        Cookie.write("g_webWidth", g_webWidth);
    }
}




var _jsErrCahche = [];
window.onerror = function (sMsg, sUrl, sLine) {
    if (typeof Mobi == 'undefined') {
        if ((window.DocumentTouch && document instanceof window.DocumentTouch) || 'ontouchstart' in document.documentElement) {
            alert('您的网页未加载完成，请尝试按“刷新”重新加载。');
        } else {
            alert('您的网页未加载完成，请尝试按“CTRL+功能键F5”重新加载。');
        }
    }
    if (sLine < 1 || typeof sMsg != 'string' || sMsg.length < 1) {
        return;
    }

    var log = "Error:" + sMsg + ";Line:" + sLine + ";Url:" + sUrl + ";UserAgent:" + navigator.userAgent;
    var alertLog = "Error:" + sMsg + "\n" + "Line:" + sLine + "\n" + "Url:" + sUrl + "\n";
    var encodeUrl = function (url) {
        return typeof url === "undefined" ? "" : encodeURIComponent(url);
    };

    var ajax = true;
    var obj = {
        'm': sMsg,
        'u': sUrl,
        'l': sLine
    };
    for (var i = 0; i < _jsErrCahche.length; i++) {
        if (_jsErrCahche[i].m == obj.m && _jsErrCahche[i].u == obj.u && _jsErrCahche[i].l == obj.l) {
            ajax = false;
            break;
        }
    }

    if (ajax) {
        _jsErrCahche.push(obj);
        _faiAjax.ajax({
            type: "post",
            url: "ajax/logJsErr.jsp?cmd=jsErr",
            data: 'msg=' + encodeUrl(log)
        });
    }
    if (false) {
        console.log(alertLog);
    }
};
if (typeof Fai == 'undefined') {
    Fai = {};
    //解决页面被嵌套在iframe的场景
    Fai.top = window;
}
//横幅数据
Fai.top._mobiSiteTitle = {
    "fontType": 0,
    "align": 2,
    "font": {
        "size": 12,
        "family": "",
        "colorType": 0,
        "color": "#000"
    },
    "bgType": "0",
    "bgFont": {
        "color": "#000",
        "alpha": 100
    },
    "bgImgFileId": "",
    "bgImgStyle": "1",
    "name": "Darling Home"
}; //网站标题数据
Fai.top._onlineServiceJson = {
    "phone": {
        "open": true,
        "type": 1,
        "fName": "电话咨询",
        "phoneInfo": [{
            "name": "电话",
            "number": "18911615202"
                }],
        "typeStr": "phone",
        "baseSetting": {
            "colIconType": 0,
            "content": "\\e62c",
            "classname": "faisco-icons-call1"
        }
    },
    "sms": {
        "open": true,
        "name": "信息咨询",
        "number": "18911615202",
        "type": 2,
        "typeStr": "sms",
        "baseSetting": {
            "colIconType": 0,
            "content": "\\e6a0",
            "classname": "faisco-icons-mail1"
        }
    },
    "map": {
        "open": true,
        "name": "在线地图",
        "city": "南阳市",
        "mark": "",
        "d_address": "宛城区",
        "type": 3,
        "typeStr": "map",
        "baseSetting": {
            "colIconType": 0,
            "content": "\\e67c",
            "classname": "faisco-icons-gps1"
        }
    },
    "msg": {
        "open": true,
        "name": "在线留言",
        "type": 4,
        "typeStr": "msg",
        "baseSetting": {
            "colIconType": 0,
            "content": "\\e6b2",
            "classname": "faisco-icons-message1"
        }
    },
    "qq": {
        "open": true,
        "type": 5,
        "fName": "QQ客服",
        "qqInfo": [{
            "name": "客服",
            "number": "1446751251"
                }],
        "typeStr": "qq",
        "baseSetting": {
            "colIconType": 2,
            "colIconCusType": 0,
            "iconType": 0,
            "content": "",
            "color": "",
            "classname": "faisco-icons-qq1"
        }
    },
    "open": true,
    "order": [1, 3, 4, 5, 2],
    "serviceId": {
        "serviceId": 6
    }
}; //在线客服
Fai.top._openOnlineService = true;
Fai.top._manageMode = false;
Fai.top.sessionMemberId = 0;
Fai.top.memberName = "";
Fai.top._colInfo = {
    "aid": 12561139,
    "wid": 0,
    "id": 3,
    "type": 3,
    "flag": 0,
    "moduleList": [303, 310],
    "moduleHidden": [],
    "createTime": 1484123825000,
    "updateTime": 1476155601000,
    "authMemberLevelId": 0,
    "extId": 0,
    "name": "首页",
    "defaultName": "首页",
    "url": "./index.html",
    "valid": true,
    "baseSetting": {
        "c": 0,
        "i": 0,
        "iconType": 0,
        "id": 0,
        "content": "",
        "classname": "",
        "color": "",
        "colIconType": 0,
        "colIconCusType": 0,
        "iconFileId": "",
        "jumpCtrl": {
            "ide": "",
            "columnType": 0
        }
    },
    "columnStyle": {
        "s": 2
    },
    "title": {
        "fontType": 0,
        "align": 0,
        "font": {
            "size": 12,
            "family": "",
            "colorType": 0,
            "color": "#000"
        },
        "bgType": "0",
        "bgFont": {
            "color": "#000",
            "alpha": 100
        },
        "bgImgFileId": "",
        "bgImgStyle": "1"
    },
    "logo": {
        "i": "",
        "h": true,
        "a": 1,
        "style": 0,
        "marginType": 0,
        "margin": {
            "top": 0,
            "bottom": 0,
            "left": 0,
            "right": 0
        }
    },
    "banner": {
        "showType": 0,
        "h": false,
        "bn": 1,
        "b": [{
            "i": "1",
            "t": 0
                }],
        "st": 6,
        "et": 1,
        "c": []
    },
    "independent": false,
    "allowed": true,
    "selectable": true,
    "forbid": false
};
jm(document).ready(function () {

    //判断该栏目是否被删除
    if (jm.isEmptyObject(Fai.top._colInfo)) {
        alert("该栏目已经删除，点击确定后，将返回到首页");
        document.location.href = "./index.html"
    }
    //手机视图初始化函数
    Mobi.initMobiPage({
        "id": 1011,
        "style": ["./css/1011_1.min.css", "./css/1011_2.min.css", "./css/1011_3.min.css", "./css/1011_4.min.css", "./css/1011_5.min.css"],
        "type": 1,
        "moduleStyle": 0,
        "designType": 1,
        "presetIndex": 0,
        "cube": 0,
        "layout": 2,
        "imagePage": 347,
        "backgroundImage": 0,
        "colors": [],
        "colorsName": []
    });
    //前端性能数据上报
    Mobi.report();
    Mobi.showQqBg();
    Mobi.showPhonesBg();
    Mobi.setShowSiteTitleBgFlag('0');
    Mobi.changeSiteTitleBg('null', 'null', 'null', 'null', 'null');
    Mobi.logoSizeCompressByMargin();
    Mobi.titlePositionRefreshByLogo();
    Mobi.initModulePhotoDetailSwipe('module310', [{
        "id": "ABUIABACGAAgteHcwwUo6LLNhAYw_wE4jwI",
        "openLink": false,
        "ide": "",
        "desc": "",
        "name": "",
        "mobiDetail": 0
            }, {
        "id": "ABUIABACGAAgt_HcwwUop4CvtgYwyAE4yAE",
        "openLink": false,
        "ide": "",
        "desc": "",
        "name": "",
        "mobiDetail": 0
            }, {
        "id": "ABUIABACGAAgvOHcwwUo3IzKwwUw2wM44AM",
        "openLink": false,
        "ide": "",
        "desc": "",
        "name": "",
        "mobiDetail": 0
            }]);
    Mobi.initPhotoImageSwipe('photoModuleImageSwipe310');
    Mobi.manageFaiscoAd(2);
});

//访客态下，统计微信浏览器的使用情况

if (Mobi.isWechat()) {
    Mobi.logDog(200055, 1);
} else {
    Mobi.logDog(200055, 0);
}