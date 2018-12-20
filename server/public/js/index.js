var failHtml = '<div class="alert alert-danger">' +
    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
    '<strong> Có lỗi xảy ra:</strong> Tên đăng nhập hoặc mật khẩu không đúng' +
    '</div>';

var userIsOnline = '<div class="alert alert-danger">' +
    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
    '<strong> Có lỗi xảy ra:</strong> Tài khoản đang được đăng nhập' +
    '</div>';

$('#submit').on('click', function() {

    var usn = $('#username').val(),
        pw = $('#password').val();

    $.ajax({
        type: 'POST',
        url: '/login',
        data: { username: usn, password: pw },
        dataType: 'json',
        async: false,
        success: function(response) {
            if (response.data == 1) {
                alert('Đăng nhập thành công');
                setCookie("Bantausession", response.ID, 365);
                window.location = '/room';
            } else if (response.data == -1)
                $("#errors").html(userIsOnline);
            else
                $("#errors").html(failHtml);
        }
    });
});

$('#register').on('click', function() {
    window.location = '/register';
});

document.getElementById("username").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("submit").click();
    }
});

document.getElementById("password").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("submit").click();
    }
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}