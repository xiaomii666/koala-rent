/* PageAdmin基础函数方法 */
String.prototype.Trim = function () //去除首尾空格
{
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.LTrim = function () //去除左空格
{
    return this.replace(/(^\s*)/g, "");
}
String.prototype.Rtrim = function () //去除右空格
{
    return this.replace(/(\s*$)/g, "");
}
String.prototype.Length = function () //获取字符长度,中文站两个字符
{
    return this.replace(/[^\x00-\xff]/g, "**").length;
}

String.prototype.Left = function (len) //左边截取字段数
{
    var str = this;
    if (isNaN(len) || len == null) {
        len = str.length;
    }
    else {
        if (parseInt(len) < 0 || parseInt(len) > str.length) {
            len = str.length;
        }
    }
    return str.substr(0, len);
}

String.prototype.Right = function (len) //右边截取字段数
{
    var str = this;
    if (isNaN(len) || len == null) {
        len = str.length;
    }
    else {
        if (parseInt(len) < 0 || parseInt(len) > str.length) {
            len = str.length;
        }
    }
    return str.substring(str.length - len, str.length);
}

//下面方法不同String.prototype，因为参数值可能是undefined

function IsLStr(str) //是否由数字、字母和下划线组成 字母开头
{
    if (str == undefined) { return false; }
    if (str.Trim() == "") { return false; }
    var reg = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (reg.test(str))
        return true;
    else
        return false;
}

function IsStr(str) //是否由数字、字母和下划线组成
{
    if (str == undefined) { return false; }
    if (str.Trim() == "") { return false; }
    return (str.replace(/\w/g, "").length == 0);
}

function IsNumeric(str,symbol) //验证数值类型
{
    if (str == undefined) { return false; }
    if (str.Trim() == "") { return false; }
    if (symbol == undefined)
    {
        symbol = "";
    }
    switch (symbol) {
        case "+":        //正数
            return /(^\+?|^\d?)\d*\.?\d+$/.test(str);
        case "-":        //负数
            return /^-\d*\.?\d+$/.test(str);
        case "i":        //整数
            return /(^-?|^\+?|\d)\d+$/.test(str);
        case "+i":        //正整数
            return /(^\d+$)|(^\+?\d+$)/.test(str);
        case "-i":        //负整数
            return /^[-]\d+$/.test(str);
        case "f":        //浮点数
            return /(^-?|^\+?|^\d?)\d*\.\d+$/.test(str);
        case "+f":        //正浮点数
            return /(^\+?|^\d?)\d*\.\d+$/.test(str);
        case "-f":        //负浮点数
            return /^[-]\d*\.\d$/.test(str);
        default: //缺省,包括正负数，小数
            if (isNaN(str)){ return false; }
            else { return true; }
    }
}

function IsInt(str) //正整数
{
    if (str == undefined) { return false; }
    return /(^\d+$)|(^\+?\d+$)/.test(str);
}

function IsUserName(str) //是否是用户名由数字、字母和下划线汉字组成,不能为纯数字，不能包含@,便于后台的
{
    if (str == undefined) { return false; }
    if (str.Trim() == "") { return false; }
    if (str.indexOf("@") > 0) //包含邮箱规则返回false
    {
        return false;
    }
    if (IsNumeric(str)) { //全是数字则返回false
        return false;
    }
    var reg = /^[\u4e00-\u9fff\w]{2,15}$/;
    return reg.test(str);
}


function IsChinese(str) //是否为汉字
{
    if (str == undefined) { return false; }
    if (str.Trim() == "") { return false; }
    return /^[^\x00-\xff]*$/.test(str);
}

function IncludeChinese(str) //是否包含汉字
{
    if (str == undefined) { return false; }
    return (str.length != str.replace(/[^\x00-\xff]/g, "**").length);
}

function IsDate(str) //是否是日期
{
    if (str == undefined) { return false; }
    if (str.Trim() == "") { return false; }
    var reg1 = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    var reg2 = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
    if (!reg1.test(str) && !reg2.test(str)) {
        return false;
    }
    return true;
}

function IsDateTime(str) //是否是日期+时间格式
{
    if (str == undefined) { return false; }
    if (str.Trim() == "") { return false; }
    var reg1 = /^(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    var reg2 = /^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    if (!reg1.test(str) && !reg2.test(str)) {
        return false;
    }
    return true;
}

function IsMobile(mobile) //是否是手机号
{
    if (mobile == undefined) { return false; }
    var myreg = /^1[345678]\d{9}$/;
    if (!myreg.test(mobile)) { return false; }
    return true;
}

function IsEmail(str) //是否是邮箱号
{
    if (str == undefined) { return false; }
    var pattern = /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/;
    var flag = pattern.test(str.Trim());
    if (!flag) {
        return false;
    }
    else {
        return true;
    }
}

function IsIP(str) //是否是ip地址
{
    if (str == undefined) { return false; }
    var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
    if (reSpaceCheck.test(str)) {
        str.match(reSpaceCheck);
        if (RegExp.$1 <= 255 && RegExp.$1 >= 0
                 && RegExp.$2 <= 255 && RegExp.$2 >= 0
                 && RegExp.$3 <= 255 && RegExp.$3 >= 0
                 && RegExp.$4 <= 255 && RegExp.$4 >= 0) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

function IsImage(path) //是否是图片地址
{
    if (path == undefined) { return false; }
    var strFilter = ".jpeg|.gif|.jpg|.png|.bmp|"
    if (path.indexOf(".") > -1) {
        var p = path.lastIndexOf(".");
        var strPostfix = path.substring(p, path.length) + '|';
        strPostfix = strPostfix.toLowerCase();
        if (strFilter.indexOf(strPostfix) > -1) {
            return true;
        }
    }
    return false;
}

//判断是否是手机浏览器
function IsMobileBrowser() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
        }
    }
    return false;
}

function Unique(str) //字符串用半角逗号隔开，过滤重复和空字符
{
    if (str == undefined) { return ""; }
    var arr = str.split(",");
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem] && elem != "") {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

function UrlEncode(str) //对字符串进行encodeURIComponent编码，方便传入后台
{
    if (str == undefined) { return ""; }
    return encodeURIComponent(str);
}

function ReplaceAll(str, str1, str2) //替换所有对应的字符串，默认的replace只替换第一个
{
    if (str == undefined) { return ""; }
    while (str.indexOf(str1) >= 0) {
        str = str.replace(str1, str2);
    }
    return str;
}

function NumericFormat(str) //格式化字符串，只保留数字
{
    if (str == undefined) { return ""; }
    return str.replace(/\D/g, "");
}

function StrFormat(str) //格式化字符串，只保留数字、字母部分
{
    if (str == undefined) { return ""; }
    return str.replace(/[\W]/g, '');
}

function ChineseFormat(str) //格式化字符串，只保留汉字
{
    if (str == undefined) { return ""; }
    return (str.replace(/[^\u4E00-\u9FA5]/g, ''));
}

function InputNumeric() //只能输入数字,onkeyup调用
{
    this.value = NumericFormat(this.value);
}

function InputChinese() //只能输入中文，,onkeyup调用
{
    this.value = ChineseFormat(this.value);
}
function InputStr()  //只能输入 字母，数字和 下划线,onkeyup调用
{
    this.value = StrFormat(this.value);
}


//数组中是否包含对应值
Array.prototype.Contains = function (value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == value) {
            return true;
        }
    }
    return false
};


//html5本地储存，localStorage保存的值都是string类型,expires过期秒数，设置了值则会通过添加cookie来控制过期时间。
function SetLocalStorage(name, value, expires) {
    if (expires == undefined) {
        expires =0;//默认不过期，
    }
    if (typeof (value) == "object") {
        value = JSON.stringify(value);
    }
    if (IsSupportLocalStorage()) {
        localStorage.setItem(name, value);
        if (expires > 0)
        {
           SetCookie("_localStorageKey_" + name, "1", expires);
        }
    }
    else {
        SetCookie(name, value, expires);
    }
}
//html5本地储存,hasSetexpires表示是否设置了过期时间
function GetLocalStorage(name, hasSetExpires) {
    if (!hasSetExpires)
    {
        hasSetExpires = false;
    }
    if (IsSupportLocalStorage()) {

        if (hasSetExpires)
        {
            var localStorageKey = GetCookie("_localStorageKey_" + name);
            if (localStorageKey == "") {
                RemoveLocalStorage(name);
                return "";
            }
        }
        var strValue = localStorage.getItem(name);
        if (strValue == null) {
            strValue = "";
        }
        return strValue;
    }
    else {
        return GetCookie(name);
    }
}

//删除本地储存
function RemoveLocalStorage(name) {
    if (IsSupportLocalStorage()) {
        localStorage.removeItem(name);
        DelCookie("_localStorageKey_" + name);
    }
    else {
        DelCookie(name);
    }
}

function IsSupportLocalStorage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    }
    catch (e) {
        return false;
    }
}

function SetCookie(name, value, expires)//cookies设置,
{
    var argv = SetCookie.arguments;
    var argc = SetCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;//第三个参数为过期时间
    if (expires != null) {
        var LargeExpDate = new Date();
        //LargeExpDate.setTime(LargeExpDate.getTime() + (expires*1000*60*60*24));//expires为过期天数
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000)); //expires为过期秒数值
    }
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : (";expires=" + LargeExpDate.toGMTString() + ";path=/"));
}

function GetCookie(name)//cookies读取
{
    var search = name + "="
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        if (offset != -1) {
            offset += search.length
            end = document.cookie.indexOf(";", offset)
            if (end == -1) end = document.cookie.length
            return unescape(document.cookie.substring(offset, end))
        }
        else return ""
    }
    else {
        return "";
    }
}

function DelCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = GetCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//获取JqObj对象
function GetJqueryObj(objName) {
    if (objName.indexOf("#") == 0 || objName.indexOf(".") == 0 || objName.indexOf("=") > 0) {
        return $(objName);
    }
    else {
        return $("[name='" + objName + "']");
    }
}

//给对象设置值,支持表单和html标签
; (function ($) {
    $.fn.SetValue = function (theValue) {
        if (typeof (theValue) == "undefined") { return; }
        var $thisObj = this;
        if ($thisObj.length == 0) {
            console.error("SetValue对象不存在!");
            return;
        }
        var tagName = $thisObj[0].tagName.toLowerCase();
        if ($thisObj.is('input')) {
            var attr = $thisObj.eq(0).attr("type");
            if (attr == "checkbox" || attr == "radio") {
                $thisObj.SetChecked(theValue);
            }
            else {
                $thisObj.val(theValue)
            }
        }
        else if ($thisObj.is('select')) {
            $thisObj.SetSelected(theValue);
        }
        else if ($thisObj.is('textarea')) {
            $thisObj.val(theValue)
        }
        else {
            $thisObj.html(theValue)
        }
        return this;
    }
})(jQuery);


//获取对象的值，包含表单，或html标签
; (function ($) {
    $.fn.GetValue = function () {
        var rv = "";
        var $thisObj = this;
        if ($thisObj.length == 0) {
            console.error("GetValue对象不存在!");
            return;
        }
        var tagName = $thisObj[0].tagName.toLowerCase();
        if ($thisObj.is('input')) {
            var inputType = $thisObj.eq(0).attr("type");
            if (inputType == undefined) {
                inputType = "text";
            }
            inputType = inputType.toLowerCase();
            if (inputType == "checkbox" || inputType == "radio")
            {
                rv = $thisObj.GetChecked();
            }
            else {
                rv = $thisObj.val();
            }
        }
        else if ($thisObj.is('select')) {
            rv = $thisObj.GetSelected();
        }
        else if ($thisObj.is('textarea')) {
            rv = $thisObj.val();
        }
        else {
            rv = $thisObj.html();
        }
        return rv;
    };
})(jQuery);


//检测radion或checkbox是否有选中的值
; (function ($) {
    $.fn.IsChecked = function () {
        var $thisObj = this;
        if ($thisObj.length == 0) {
            console.error("IsChecked对象不存在!");
            return;
        }
        var k = 0;
        for (k = 0; k < $thisObj.length ; k++) {
            if ($thisObj.eq(k).is(":checked")) {
                return true;
            }
        }
        return false;
    };
})(jQuery);



////反选checkbox
; (function ($) {
    $.fn.SelectInvert = function () {
        var $thisObj = this;
        if ($thisObj.length == 0) {
            console.error("SelectInvert对象不存在!");
            return;
        }
        $thisObj.each(function () {
            var $this = $(this);
            if (typeof ($this.attr("disabled")) == "undefined") {
                if ($this.is(":checked")) {
                    $this.prop("checked", false);
                }
                else {
                    $this.prop("checked", true);
                }
            }
        });
    };
})(jQuery);


//获取checkbox或radio选种的值，多个值用半角逗号隔开
; (function ($) {
    $.fn.GetChecked = function () {
        var $thisObj = this;
        if ($thisObj.length == 0) {
            console.error("GetChecked对象不存在!");
            return;
        }
        var selected = "";
        $thisObj.each(function (index) {
            var $this = $(this);
            if ($this.attr("disabled")) {
                return true;
            }
            else if ($this.is(":checked")) {
                selected += "," + $this.val();
            }
        });
        return selected.replace(",", "");
    };
})(jQuery);

////根据值设置checkbox或radio表单
; (function ($) {
    $.fn.SetChecked = function (setValue) {
        if (typeof (setValue) == "undefined") { return; }
        var $thisObj = this;
        if ($thisObj.length == 0) {
            console.error("SetChecked对象不存在!");
            return;
        }
        setValue = setValue.toString();
        var arrSetValue = setValue.split(',');
        $thisObj.each(function () {
            var $this = $(this);
            if (arrSetValue.Contains($this.val()) || setValue == "{*}") {
                $this.prop("checked", true);
            }
            else { $this.prop("checked", false) }
        });
        return this;
    };
})(jQuery);


//获取select表单选中的值,多个值用半角逗号隔开。
; (function ($) {
    $.fn.GetSelected = function () {
        var $thisObj = this;
        if ($thisObj.length == 0) {
            console.error("GetSelected对象不存在!");
            return;
        }
        var $options = $thisObj.children("option:selected");
        var selected = "";
        $options.each(function (index) {
            var $this = $(this);
            if ($this.attr("disabled")) {
                return true;
            }
            else if ($this.is(":selected")) {
                selected += "," + $this.val();
            }
        });
        return selected.replace(",", "");
    };
})(jQuery);

////根据值设置select表单选中状态
; (function ($) {
    $.fn.SetSelected = function (setValue) {
        if (typeof (setValue) == "undefined") { return; }
        var $thisObj = this;
        if ($thisObj.length == 0) {
            console.error("SetSelected对象不存在!");
            return;
        }
        setValue = setValue.toString();
        if ($thisObj.attr("multiple")) //多选
        {
            var $options = $thisObj.children("option");
            var arrSetValue = setValue.split(',');
            $options.each(function () {
                var $this = $(this);
                if (arrSetValue.Contains($this.val()) || setValue == "{*}") {
                    $this.prop("selected", true);
                }
                else { $this.prop("selected", false) }
            });
        }
        else //单选
        {
            $thisObj.val(setValue);
            if ($thisObj.get(0).selectedIndex == -1) {
                $thisObj.get(0).selectedIndex = 0;
            }
            return;
        }
    };
})(jQuery);

//清除select表单中选中的option
; (function ($) {
    $.fn.RemoveSelected = function () {
        var $thisObj = this;
        if ($thisObj.length == 0) {
            console.error("RemoveSelected对象不存在!");
            return;
        }
        var $options = $thisObj.children("option:selected");
        $options.remove();
    };
})(jQuery);


//表单的序列化
(function ($) {

    //系列化一组json对象数组，itemObjName为每行数据的标识，可以为class，也可以为id
    $.fn.SerializeJsonList = function (itemObjName) {
        var $thisObj = this;
        var $itemObj = $thisObj.find(itemObjName);
        if ($itemObj.length==0)
        {
            return [];
        }
        var jsonArray = new Array();
        $itemObj.each(function (index) {
            //alert($(this).html())
            jsonArray[index] = $(this).SerializeJson();
        });
        return jsonArray;
    };

    //表单系列化成json对象
    $.fn.SerializeJson = function () {
        var $thisObj = this;
        var serializeObj = {};
        var array;
        if ($thisObj.is("form") || $thisObj.is("input") || $thisObj.is("textarea") || $thisObj.is("select")) {
            array = $thisObj.serializeArray(); //serializeArray()序列化成一个键值对数组，只对form表单有效
        }
        else {
            array = $thisObj.find("input,select,textarea").serializeArray(); //serializeArray()序列化成一个键值对数组，只对form表单有效
        }
        $(array).each(function () {
            if (serializeObj[this.name]) //如果存在相同key
            {
                serializeObj[this.name] = serializeObj[this.name] + "," + this.value;//同名name的值用半角逗号隔开

            }
            else {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    };

    //序列化普通表单为url编码并用&连接的字符串格式
    $.fn.Serialize = function () {
        var $thisObj = this;
        if ($thisObj.is("form") || $thisObj.is("input") || $thisObj.is("textarea") || $thisObj.is("select")) {
            return $thisObj.serialize();//serialize() 只对form标签有效
        }
        else {
            return $thisObj.find("input,select,textarea").serialize();
        }
    };

    //参数可以带多个逗号风格的obj对象参数
    $.fn.Serializes = function (additionals) {
        var elseParams = "";
        if (typeof (additionals) != "undefined") {
            var arrAdditionals = additionals.split(",");
            for (var i = 0; i < arrAdditionals.length; i++) {
                var $obj = GetJqueryObj(arrAdditionals[i]);
                if ($obj.length !=0) {
                    elseParams += "&" + $obj.Serialize();
                }
            }
        }
        return this.Serialize() + elseParams;
    }

})(jQuery);

//组合对象,支持多个可变参数
function ExtendObject() {
    var newObject = {};
    for (i = 0; i < arguments.length; i++) {
        newObject = $.extend(newObject, ObjectParse(arguments[i]));
    }
    return newObject;
}

//转对象,支持字符串和对象参数
function ObjectParse(obj) {
    var thetype = typeof (obj);
    if (thetype == "undefined") {
        obj = {};
    }
    else if (thetype == "string") {
        try {
            var str = obj.Trim();
            if (str.indexOf("{") == 0 || str.indexOf("[") == 0) {
                obj = eval("(" + str + ")");
            }
            else {
                obj = eval("(({" + str + "}))");
            }
        } catch (err) {
            alert(obj + "的ObjectParse转换失败，请检测格式!");
            throw new Error("ObjectParse Error!");
            //alert("错误信息: " + err.message );
            //obj = {};
        } finally {
        }
    }
    else if (thetype == "object") {
        return obj;
    }
    else {
        obj = {};
    }
    return obj;
}

function JsonParse(data) //转json，支持普通字符串，也支持js对象
{
    var theType = typeof (data);
    if (data == undefined) {
        return undefined;
    }
    if (theType == "object") {
        var str = JSON.stringify(data); //先转字符串
        data = $.parseJSON(str); //再转成对象
    }
    else if (theType == "string") {
        try {
            var str = data.Trim();
            if (str == "") {
                return undefined;
            }
            if (str == "{}") {
                return undefined;
            }
            if (str.indexOf("{") == 0 || str.indexOf("[") == 0) //json对象
            {
                data = $.parseJSON(str);
            }
            else {
                data = $.parseJSON("{" + str + "}");
            }
        } catch (err) {
            alert(data + "的JsonParse转换失败，请检测格式!");
            //alert("错误信息: " + err.message );
            data = undefined;
        } finally {
        }
    }
    return data;
}

//对象转字符串，普通js对象会转成json格式字符串
function JsonToString(obj) {
    if (typeof (obj) == "object") {
        obj = JSON.stringify(obj)
    }
    return obj;
}

function JsonFormat(s) {
    var newstr = "";
    for (var i = 0; i < s.length; i++) {
        c = s.charAt(i);
        switch (c) {
            case '\"':
                newstr += "\\\"";
                break;
            case '\\':
                newstr += "\\\\";
                break;
            case '/':
                newstr += "\\/";
                break;
            case '\b':
                newstr += "\\b";
                break;
            case '\f':
                newstr += "\\f";
                break;
            case '\n':
                newstr += "\\n";
                break;
            case '\r':
                newstr += "\\r";
                break;
            case '\t':
                newstr += "\\t";
                break;
            default:
                newstr += c;
        }
    }
    return newstr;
}

function MultipleSelectToInput(jqObj, tojqObj) //把多选select的值转到input表单中
{
    if (jqObj.length == 0) { alert("对象不存在!"); return; }
    if (tojqObj.length == 0) { alert("目标对象不存在!"); return; }
    var vals = "";
    var options = jqObj.children("option");
    for (k = 0; k < options.length ; k++) {
        var val = options.eq(k).val();
        if (vals != "") {
            vals += ",";
        }
        if (val != "") {
            vals += val;
        }
    }
    tojqObj.val(vals);
}


//获取时间差，根据类型
function GetDateDiff(startTime, endTime, diffType) {
    startTime = startTime.replace(/-/g, "/");  //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
    endTime = endTime.replace(/-/g, "/");
    diffType = diffType.toLowerCase();  //将计算间隔类性字符转换为小写 
    var sTime = new Date(startTime); //开始时间 
    var eTime = new Date(endTime); //结束时间 
    var divNum = 1;  //作为除数的数字 
    switch (diffType) {
        case "second":
            divNum = 1000;
            break;
        case "minute":
            divNum = 1000 * 60;
            break;
        case "hour":
            divNum = 1000 * 3600;
            break;
        case "day":
            divNum = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
}


//获取时间差,结果为，3天，5小时，40分钟，50秒
function GetTimeDiff(ST, ET) {
    var rv;
    var ST = new Date(ST.replace(/-/g, '/'));			//开始时间转换为时间对象
    var ET = new Date(ET.replace(/-/g, '/'));			//结束时间转换为时间对象
    var DT = (ET - ST) / 1000;					//得到时间差，转换为秒

    var RD = Math.floor(DT / (60 * 60 * 24));			//得到天数
    var RH = Math.floor((DT % (60 * 60 * 24)) / (60 * 60));		//得到小时
    var RM = Math.floor(((DT % (60 * 60 * 24)) % (60 * 60)) / 60); 	//得到分钟
    var RS = (((DT % (60 * 60 * 24)) % (60 * 60)) % 60);		//得到秒
    RD = RD ? (RD + '天') : '';
    RH = RH ? (RH + '小时') : '';
    RM = RM ? (RM + '分钟') : '';
    RS = RS ? (RS + '秒') : '';
    rv = RD + RH + RM + RS;
    if (rv == "") {
        rv = "0秒";
    }
    return rv;
}

function DateToStr(datetime) {
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;//js从0开始取
    var date = datetime.getDate();
    var hour = datetime.getHours();
    var minutes = datetime.getMinutes();
    var second = datetime.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if (date < 10) {
        date = "0" + date;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (second < 10) {
        second = "0" + second;
    }
    var time = year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + second; //2009-06-12 17:18:05
    return time;
}

//数字转中文
function MoneyToChinese(money) {
    var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
    var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
    var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
    var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
    var cnInteger = "整"; //整数金额时后面跟的字符
    var cnIntLast = "元"; //整型完以后的单位
    var maxNum = 999999999999999.9999; //最大处理的数字

    var IntegerNum; //金额整数部分
    var DecimalNum; //金额小数部分
    var ChineseStr = ""; //输出的中文金额字符串
    var parts; //分离金额后用的数组，预定义

    if (money == "") {
        return "";
    }
    money = parseFloat(money);
    //alert(money);
    if (money >= maxNum) {
        $.alert('超出最大处理数字');
        return "";
    }
    if (money == 0) {
        ChineseStr = cnNums[0] + cnIntLast + cnInteger;
        //document.getElementById("show").value=ChineseStr;
        return ChineseStr;
    }
    money = money.toString(); //转换为字符串
    if (money.indexOf(".") == -1) {
        IntegerNum = money;
        DecimalNum = '';
    } else {
        parts = money.split(".");
        IntegerNum = parts[0];
        DecimalNum = parts[1].substr(0, 4);
    }
    if (parseInt(IntegerNum, 10) > 0) {//获取整型部分转换
        zeroCount = 0;
        IntLen = IntegerNum.length;
        for (i = 0; i < IntLen; i++) {
            n = IntegerNum.substr(i, 1);
            p = IntLen - i - 1;
            q = p / 4;
            m = p % 4;
            if (n == "0") {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    ChineseStr += cnNums[0];
                }
                zeroCount = 0; //归零
                ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
                ChineseStr += cnIntUnits[q];
            }
        }
        ChineseStr += cnIntLast;
        //整型部分处理完毕
    }
    if (DecimalNum != '') {//小数部分
        decLen = DecimalNum.length;
        for (i = 0; i < decLen; i++) {
            n = DecimalNum.substr(i, 1);
            if (n != '0') {
                ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (ChineseStr == '') {
        ChineseStr += cnNums[0] + cnIntLast + cnInteger;
    }
    else if (DecimalNum == '') {
        ChineseStr += cnInteger;
    }
    return ChineseStr;

}

/*获取url参数*/
function Request(param, url) //获取url中参数
{
    if (param == undefined) {
        return "";
    }

    if (url == null) { url = location.href; }
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    var returnValue = "";
    for (var i = 0; i < paraString.length; i++) {
        var item = paraString[i].split("=");
        if (item.length == 2 && param.toLowerCase() == item[0].toLowerCase()) {
            if (returnValue != "") {
                returnValue += ",";
            }
            returnValue += item[1];
        }
    }
    if (typeof (returnValue) == "undefined") {
        return "";
    }
    else {
        return decodeURI(returnValue);
    }
}
function Ajax(thisOptions, callBack) {
    var rv = "";    //同步返回值,异步获取不到
    var defaultOptions = {
        url: "",
        data: "",
        type: "get",
        async: true,
        cache: false,
        ifModified: true,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        beforeSend: function (xhr) {
            //Loading();
            //console.log('beforeSend')
        },
        success: function (data, textStatus, jqXHR) {
            rv = data;           //回调
            if (typeof (callBack) == "function") {
                callBack.call(this, data, thisOptions);//方法回调 
            }
        },
        error: function (xhr, textStatus) {
            alert("ajax出现错误,status:" + xhr.status + "，textStatus：" + textStatus);
        },
        complete: function(xhr,textStatus) {
            if (textStatus == "error") {
                var newWin = open("/Incs/_blank.html", "_blank");
                newWin.document.write(xhr.responseText);
            }
        }
    };
    defaultOptions = ExtendObject({}, defaultOptions, thisOptions);
    if (defaultOptions.url.Trim() == "") {

        alert("Ajax的url参数不能为空");
        return;
    }
    $.ajax(defaultOptions);
    return rv;
}

function CallAjax(type, async, url, dataparam, callBack) {
    alert("CallAjax已经停用，请更换为Ajax方法！");
}