import slide from './fun';
window.onload = function () {
    var phone = /^0?1[3-9]\d{9}$/;
    var name = /^[0-9a-zA-Z\u4e00-\u9fa5]{1,8}$/;
    var password = /^[\w\.\?\$!]{6,16}$/;
    setEvent("tel", "手机格式不正确", phone);
    setEvent("name", "昵称只支持汉字字母数字组合，1-8个字符", name);
    setEvent("password", "密码只支持字母数字下划线.?!$组合，6-16个字符", password)
    function setEvent(id, erro, reg) {
        //id元素id,erro错误信息，reg正则
        var ele = document.getElementById(id);
        //改变判断
        ele.onchange = function () {
            var flag = reg.test(this.value);
            if (!flag) {
                this.nextElementSibling.innerHTML = erro;
                this.value = "";
            }
        }
        //再次移入
        ele.onfocus = function () {
            this.nextElementSibling.innerHTML = "";
        }
    }
    // 密码再判断
    var pass = document.getElementById("password");
    var checkagain = document.getElementById("checkagain");
    checkagain.onchange = function () {
        if (this.value != pass.value) {
            this.nextElementSibling.innerHTML = "两次密码不一致";
            this.value = ""
        }
    }
    checkagain.onfocus = function () {
        this.nextElementSibling.innerHTML = "";
    }
    //判断是否注册成功，获取所有div
    var btn = document.querySelector("input[type='button']");
    btn.onclick = function () {
        //判断是否出错
        var flag = true
        var allDiv = document.querySelectorAll(".box0>div");
        for (var i = 0; i < allDiv.length; i++) {
            if (allDiv[i].innerHTML != "") {
                flag = false;
            }
        }
        //判断是否为空
        var f = true;
        var inp = document.querySelectorAll("input");
        for (var j = 0; j < inp.length; j++) {
            if (inp[j].value == "") {
                f = false;
            }
        }
        if (flag) {
            if (f) {
                document.querySelector(".box0").style.display = "none";
                document.querySelector(".box").style.visibility = "visible";
                console.log(document.querySelector(".box"))
            } else {
                alert("输入框不能为空")
            }
        } else {
            alert("请更改错误信息");
        }
    }
    // 引入滑块
    slide();
}
