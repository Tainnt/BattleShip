var phong = []; // chua mang phong
phong[0] = 0;
phong[1] = 0;
phong[2] = 0;
var sophong = 3; //All phong = lenght(phong)
var controsophonghientai = 1; //
var socketroom = io.connect("http://doanncb.ddns.net:3000");
var room = document.getElementById("room");
var hieuungroom = document.getElementById("hieuungroom")
var roomtx = room.getContext("2d");
var hieuungroomtx = hieuungroom.getContext("2d")
var b = 40;
var toadocontro = [20, 60, 100];
var userla;
for (var i = 1; i <= sophong; i++) {
    roomtx.font = "30px Arial";
    roomtx.fillStyle = "#2c3e50";
    roomtx.fillText("Phòng " + i + "     Số người chơi: " + phong[i - 1] + "/2", 15, b);
    b += 40;
}
hieuungroomtx.rect(0, toadocontro[controsophonghientai - 1], 450, 30);
hieuungroomtx.stroke();

var x = getCookie("Bantausession");

socketroom.emit('YeuCauUser', {
    COKI: x,
});

socketroom.on("ResYeuCauUser", function(data) {
    var userla = data.USerLa;
    var element = document.getElementById('id_cua_toi');
    element.innerHTML = ' ' + userla;
});


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$('#logout').on('click', function() {
    window.location = '/logout';
});

socketroom.on("GamepadArr", function(data) {
    // console.log(data);
    var index = 0;
    for (index = 0; index < data.ss.length; index++) {
        if (data.ss[index] == getCookie("Bantausession"))
            break;
    }
    if (data.id[index] == null) {
        $("#listGamepad").empty();
        if (data.arr.length != 0) {
            for (let index = 0; index < data.arr.length; index++) {
                $("#listGamepad").append("<button class=\"btn\" id=\"gp" + (index + 1) + "\">Gamepad " + data.arr[index] + "</button>");
                $("#gp" + (index + 1)).on('click', function() {
                    alert('Bạn đã chọn Gamepad ' + data.arr[index]);
                    socketroom.emit('GamepadSelected', { i: index, COKI: getCookie("Bantausession") });
                    $("#listGamepad").hide();
                    $("#selectGamepad").hide();
                });
                if (data.id.includes(data.arr[index])) {
                    $("#gp" + (index + 1)).attr("disabled", true);
                }
            }
        } else
            $("#listGamepad").append("Chưa có tay cầm nào");
    } else {
        $("#listGamepad").hide();
        $("#selectGamepad").hide();
    }
});

socketroom.on("YEUCAUCHECKSERVER", function(data) {
    console.log("Check");
    socketroom.emit('REQYEUCAUCHECKSERVER', {
        COKI: x,
    });
});


socketroom.on("RESYEUCAUCHECKSERVER", function(data) {
    console.log(data);
    phong = data.emPHONG;
    controsophonghientai = data.emVITRICONTROPHONG;
    for (var i = 1; i <= sophong; i++) {
        roomtx.font = "30px Arial";
        roomtx.fillStyle = "#2c3e50";
        roomtx.fillText("Phòng " + i + "     Số người chơi: " + phong[i - 1] + "/2", 15, b);
        b += 40;
    }
    hieuungroomtx.clearRect(0, 0, hieuungroom.width, hieuungroom.height);
    hieuungroomtx.beginPath();
    hieuungroomtx.rect(0, toadocontro[controsophonghientai - 1], 450, 30);
    hieuungroomtx.stroke();
    b = 40;
    roomtx.clearRect(0, 0, room.width, room.height);
    roomtx.beginPath();
    for (var i = 1; i <= sophong; i++) {
        roomtx.font = "30px Arial";
        roomtx.fillStyle = "#2c3e50";
        roomtx.fillText("Phòng " + i + "     Số người chơi: " + phong[i - 1] + "/2", 15, b);
        b += 40;
    }

    if (data.emKEYVAOROOM === 'full') {
        alert("Phong day");
    } else if (data.emKEYVAOROOM === 'ok') {
        window.location = '/create';
    }

});

// Get the button that opens the modal

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//When the user clicks the button, open the modal 

//When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var modal = document.getElementById('roomModal');

$('#huongdanroom').on('click', function() {
    modal.style.display = "block";
});
//