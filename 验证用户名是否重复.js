//验证OaCode是否重复
function isExistOaCode() {
    var isExist = false;
    var oaCode = document.getElementById("OaCode").value;
    $.ajax({
        url: BaseUrl + "/v1/users/code?code=" + oaCode,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        crossDomain: true,
        success: function (data) {
            if (data) {
                isExist = true;
                var error = $('<label id="oacode-error" class="error" for="OaCode" style="display: inline-block;">OA号已存在,请重新输入</label>');
                error.appendTo($("#OaCode").parent());
                $("#oacode-error").text("OA号已存在,请重新输入");
            }
            else {
                isExist = false;
                var id = $("#operateFrm input[name='UserId']").val();
                if (id != "") {//编辑
                    send_content(id);
                } else {//新增
                    var relativelyUrl = "v1/users/";
                    addModel(relativelyUrl);
                }
            }
        }
    });
    return isExist;
}