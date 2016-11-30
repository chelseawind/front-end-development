$().ready(function () {
    window.userInfo = storage.userInfo;
    window.userInfo = JSON.parse(window.userInfo);
    document.getElementById("oacodeModify").value = window.userInfo.OaCode;
    document.getElementById("userNameModify").value = window.userInfo.UserName;
    document.getElementById("mobilePhoneModify").value = window.userInfo.MobilePhone;
    document.getElementById("emailModify").value = window.userInfo.Email;
    document.getElementById("useridModify").value = window.userInfo.UserId;

    $("#userNameType").html(userInfo.UserName + ' ( ' + userInfo.UserType + ' )');
});

var rule = {
    UserName: {
        required: true
    },
    MobilePhone: {
        isMobile: true
    },
    Email: {
        email: true
    }
};

var message = {
    UserName: {
        required: "这是必填字段"
    },
    Email: {
        email: "请输入正确的E-Mail地址"
    }
}

var validator = $("#modifyInfo").validate({
    debug: true,
    rules: rule,
    //errorPlacement: error,
    messages: message,
    submitHandler: function () {
        modifyInfo();
    }
});

jQuery.validator.addMethod("isMobile", function (value, element) {
    var mob = /^1[34578]\d{9}/;
    return this.optional(element) || (mob.test(value));
}, "请正确填写您的手机号码");


function modifyInfo() {
    var usernameModify = document.getElementById("userNameModify").value;
    var mobileModify = document.getElementById("mobilePhoneModify").value;
    var emailModify = document.getElementById("emailModify").value;
    var data = {
        "UserId": userInfo.UserId, "FirstName": usernameModify, "LastName": usernameModify, "UserName": usernameModify,
        "Password": userInfo.Password, "UserType": userInfo.UserType, "UserState": userInfo.UserState,
        "OaCode": userInfo.OaCode, "MobilePhone": mobileModify, "Email": emailModify
    }
    var dataPatch = { "UserId": userInfo.UserId };
    $.extend(data, dataPatch);
    var url = add_urlPrefix + userInfo.UserId;
    $.ajax({
        url: url,
        type: "PUT",
        dataType: "json",
        timeout: 20000,
        data: JSON.stringify(data),
        contentType: "application/json",
        crossDomain: true,
        success: function (data) {
            $table.bootstrapTable("refresh");
            validator.resetForm();
            swal("修改成功，重新登录后生效!");
            $('#userPwdEdit').modal('hide');
            var page = $("#main_content");
            showResult(page);
        }
    });
}

var rule1 = {
    Password: {
        required: true,
        isPassword: true
    },
    Newpassword: {
        required: true,
        notEqualTo: "#oldpassword"
    },
    PasswordAgain: {
        required: true,
        equalTo: "#newpassword"
    }
}

var message1 = {
    Password: {
        required: "这是必填字段"
    },
    Newpassword: {
        required: "这是必填字段"
    },
    PasswordAgain: {
        required: "这是必填字段",
        equalTo: "两次输入不一致，请重新输入!"
    }
}

var validator = $("#modifyPwd").validate({
    debug: true,
    rules: rule1,
    messages: message1,
    submitHandler: function () {
        modifyPwd();
    }
});

jQuery.validator.addMethod("notEqualTo", function (value, element, param) {
    return value != $(param).val();
}, $.validator.format("不能和原密码相同!"));

jQuery.validator.addMethod("isPassword", function (value, element, param) {
    var boolean = (value != userInfo.Password);
    if (boolean == true)
        return this.optional(element);
    return true;
}, $.validator.format("您输入的密码有误，请重新输入!"));

function modifyPwd() {
    var newModify = document.getElementById("newpassword").value;
    var newAgainModify = document.getElementById("passwordagain").value;
    var data = { "Password": newModify, "Newpassword": newModify, "PasswordAgain": newAgainModify }
    var dataPatch = { "UserId": userInfo.UserId };
    $.extend(data, dataPatch);
    var url = add_urlPrefix + userInfo.UserId;
    $.ajax({
        url: url,
        type: "PUT",
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/json",
        crossDomain: true,
        success: function (data) {
            $table.bootstrapTable("refresh");
            validator.resetForm();
            document.getElementById("modifyPwd").reset();
            swal("密码修改成功");
            $('#userPwdEdit').modal('hide');
        }
    });
}