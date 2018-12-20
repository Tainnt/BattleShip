//toa do cac vi tri cua player 2
var toadoxplayer1 = [10, 70, 130, 190, 250, 310, 370, 430, 490, 550];
var toadoyplayer1 = [10, 70, 130, 190, 250, 310, 370, 430, 490, 550];

var toadoxplayer2 = [660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200];
var toadoyplayer2 = [10, 70, 130, 190, 250, 310, 370, 430, 490, 550];

var shotorno = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
var shotorno2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
var P1SHIP = [];
var P2SHIP = [];

//lay thong tin
var c = document.getElementById("player1");
var hieuung = document.getElementById("hieuungshot");
var player2 = document.getElementById("player2");

var ctx = c.getContext("2d");
var hieuungctx = hieuung.getContext("2d");
var player2ctx = player2.getContext("2d");

var muctieu = document.getElementById("muctieu");
var muctieuctx = muctieu.getContext("2d");

//khai bao hinh anh su dung
var imgco = document.getElementById("co");
var imgkhong = document.getElementById("khongco");
var tenlua = document.getElementById("tenlua");
var tenlua2 = document.getElementById("tenlua2");
var mtieuco = document.getElementById("mtco");
var mtieuko = document.getElementById("mtko");
var chucmung = document.getElementById("chucmung");
var chucmayman = document.getElementById("chucmayman");

var shipNameR = [document.getElementById("r2"), document.getElementById("r3"), document.getElementById("r4")];
var shipNameD = [document.getElementById("d2"), document.getElementById("d3"), document.getElementById("d4")];

var r1 = document.getElementById("r1");
var r2 = document.getElementById("r2");
var r3 = document.getElementById("r3");
var r4 = document.getElementById("r4");

var d2 = document.getElementById("d2");
var d3 = document.getElementById("d3");
var d4 = document.getElementById("d4");
//khai bao bien
const toadophaoXplayer1 = 310;
const toadophaoYplayer1 = 310;
const toadophaoXplayer2 = 900;
const toadophaoYplayer2 = 250;
var posX = toadophaoXplayer1;
var posY = toadophaoYplayer1;
var posX2 = toadophaoXplayer2;
var posY2 = toadophaoYplayer2;
var vao1lan = true;
var vao1lan2 = true;
var vx = 0;
var vy = 0;
var vx2 = 0;
var vy2 = 0;
var checkshotornoshot = 0;
var timer = 31;
var t = timer;

//HAM HIEU UNG BAN TRUNG BAN HUT
function hieuungchucmungp1(time, hieuung) {
    setTimeout(function() {
        muctieuctx.clearRect(0, 0, muctieu.width, muctieu.height);
        muctieuctx.beginPath();
        muctieuctx.drawImage(hieuung, 300, 50, time, time);
        if (time > 300) {
            time -= 4;
            hieuungchucmungp1(time, hieuung);
        }
        if (time <= 300 && time >= (20)) {
            time -= 20;
            hieuungchucmungp1(time, hieuung);
        }
    }, 5)
}

function hieuungchucmungp2(time, hieuung) {
    setTimeout(function() {
        muctieuctx.clearRect(0, 0, muctieu.width, muctieu.height);
        muctieuctx.beginPath();
        muctieuctx.drawImage(hieuung, 1000, 500, time, time);
        if (time < -300) {
            time += 4;
            hieuungchucmungp2(time, hieuung);
        }
        if (time >= -300 && time <= (-20)) {
            time += 20;
            hieuungchucmungp2(time, hieuung);
        }
    }, 5)
}
//Ham nay de ve muc tieu
function dohoamuctieu(newXp2, newYp2, OKorNO) {
    if (OKorNO == 0) {
        muctieuctx.clearRect(0, 0, muctieu.width, muctieu.height);
        muctieuctx.beginPath();
        muctieuctx.drawImage(mtieuco, newXp2, newYp2, 60, 60);
    } else {
        muctieuctx.clearRect(0, 0, muctieu.width, muctieu.height);
        muctieuctx.beginPath();
        muctieuctx.drawImage(mtieuko, newXp2, newYp2, 60, 60);
    }
}
// ham nay de ve ten lua ban qua doi thu
function dohoashot(newX, newY, data) { //data la gia tri gui qua 0-100.
    if (vao1lan) {
        vx = newX - posX;
        vy = newY - posY;
        vao1lan = false;
    }
    setTimeout(function() {
        posX += vx * 1 / 20;
        posY += vy * 1 / 20;
        hieuungctx.clearRect(0, 0, hieuung.width, hieuung.height);
        hieuungctx.beginPath();
        hieuungctx.drawImage(tenlua, posX, posY, 60, 60);
        if (posX <= newX - 3) {
            dohoashot(newX, newY, data);
        } else {
            if (data >= 1) {
                player2ctx.drawImage(imgco, newX, newY);
                // hieuungchucmungp1(500, chucmung);
                muctieuctx.drawImage(mtieuko, newX, newY, 60, 60);
            } else {
                player2ctx.drawImage(imgkhong, newX, newY);
                // hieuungchucmungp1(500, chucmayman);
            }
            posX = toadophaoXplayer1;
            posY = toadophaoYplayer1;
            vao1lan = true;
            hieuungctx.clearRect(0, 0, hieuung.width, hieuung.height);
            hieuungctx.beginPath();
            hieuungctx.drawImage(tenlua, -100, 0, 60, 60);
            muctieuctx.drawImage(mtieuko, newX, newY, 60, 60);
        }
    }, 0.3)
}

function dohoashot2(newX, newY, data) { //data la gia tri gui qua 0-100.
    if (vao1lan2) {
        vx2 = newX - posX2;
        vy2 = newY - posY2;
        vao1lan2 = false;
    }
    setTimeout(function() {
        posX2 += vx2 * 1 / 20;
        posY2 += vy2 * 1 / 20;
        hieuungctx.clearRect(0, 0, hieuung.width, hieuung.height);
        hieuungctx.beginPath();
        hieuungctx.drawImage(tenlua2, posX2, posY2, 60, 60);
        if (posX2 >= newX - 3) {
            dohoashot2(newX, newY, data);
        } else {
            if (data >= 1) {
                ctx.drawImage(imgco, newX, newY);
                // hieuungchucmungp2(-500, chucmung);
                muctieuctx.drawImage(mtieuko, newX, newY, 60, 60);
            } else {
                ctx.drawImage(imgkhong, newX, newY);
                // hieuungchucmungp2(-500, chucmayman);
            }
            posX2 = toadophaoXplayer2;
            posY2 = toadophaoYplayer2;
            vao1lan2 = true;
            hieuungctx.clearRect(0, 0, hieuung.width, hieuung.height);
            hieuungctx.beginPath();
            hieuungctx.drawImage(tenlua2, -100, 0, 60, 60);
            muctieuctx.drawImage(mtieuko, newX, newY, 60, 60);
        }
    }, 0.3)
}

function LoadShip(start, end, arr) {
    for (var i = start; i <= end; i++) {
        switch (arr[i]) {
            case 'S':
                ctx.drawImage(r1, toadoyplayer1[i % 10], toadoyplayer1[Math.floor(i / 10)], 60, 60);
                break;
            case 'D2':
                ctx.drawImage(d2, toadoyplayer1[i % 10], toadoyplayer1[Math.floor(i / 10)], 60, 60 * 2);
                break;
            case 'D3':
                ctx.drawImage(d3, toadoyplayer1[i % 10], toadoyplayer1[Math.floor(i / 10)], 60, 60 * 3);
                break;
            case 'D4':
                ctx.drawImage(d4, toadoyplayer1[i % 10], toadoyplayer1[Math.floor(i / 10)], 60, 60 * 4);
                break;
            case 'R2':
                ctx.drawImage(r2, toadoyplayer1[i % 10], toadoyplayer1[Math.floor(i / 10)], 60 * 2, 60);
                break;
            case 'R3':
                ctx.drawImage(r3, toadoyplayer1[i % 10], toadoyplayer1[Math.floor(i / 10)], 60 * 3, 60);
                break;
            case 'R4':
                ctx.drawImage(r4, toadoyplayer1[i % 10], toadoyplayer1[Math.floor(i / 10)], 60 * 4, 60);
                break;
            default:
                break;
        }
    }
}
//Ket noi den Socket server
var socket = io.connect("http://doanncb.ddns.net:3000");

//CAP NHAT TRAN CHIEN

var x = getCookie("Bantausession");

socket.emit('YeuCauUser', {
    COKI: x,
});
socket.emit('REQYEUCAUCHECKSERVER', {
    COKI: x,
});
socket.on("ResYeuCauUser", function(data) {
    var userla = data.USerLa;
    var element = document.getElementById('id_cua_toi_1');
    element.innerHTML = '' + userla;
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

socket.on("YEUCAUCHECKSERVER", function(data) {
    console.log("Check");
    socket.emit('REQYEUCAUCHECKSERVER', {
        COKI: x,
    });
});
var shotf = 0;
var SHOTLAYERFIGHT = 0;
var shotfEnemy = 0;
var SHOTLAYERFIGHTEnemy = 0;
var turn = 1;
var chay1lan = 1;
var chay1lan2 = 1;
var chay1lan3 = 1;

var WIN = 0;
var P1WIN = 0;
var P2WIN = 0;
if (chay1lan == 1) {
    CHECKINTERVAL();
    SETINTERVAL();
    chay1lan = 0;
}
socket.on("RESYEUCAUCHECKSERVER", function(data) {
    //Che do 1 PC mode
    LoadShip(0, 99, P1SHIP);
    if (data.emSHOTLAYERFIGHT > SHOTLAYERFIGHT) {
        shotf = 1;
    } else { shotf = 0; }
    SHOTLAYERFIGHT = data.emSHOTLAYERFIGHT;

    if (data.emSHOTENEMY > SHOTLAYERFIGHTEnemy) {
        shotfEnemy = 1;
    } else { shotfEnemy = 0; }
    SHOTLAYERFIGHTEnemy = data.emSHOTENEMY;
    if (chay1lan2 == 1) {
        if (data.emLUOT == 1) {
            turn = 1;
        } else turn = -1;
        chay1lan2 = 0;
    }
    if (chay1lan3 == 1) {
        P1SHIP = data.emSHIPMAP;
        P2SHIP = data.emSHIPMAPENYMY;
        for (var i = P1SHIP.length - 1; i >= 0; i--) {
            if (P1SHIP[i] != "N") {
                WIN += 1;
            }
        }
        chay1lan3 = 0;
    }
    enemyla = data.emENEMY;
    var element = document.getElementById('id_cua_toi_2');
    element.innerHTML = ' ' + enemyla;
    console.log(WIN);
    console.log(P1WIN + "P1 WIN");
    console.log(P2WIN + "P2 WIN");

    //Player1
    if (turn == 1) {
        var CONTRO1 = (data.emCONTROPLAYERFIGHT);
        console.log(data.emCONTROPLAYERFIGHT + "Player1");
        console.log(CONTRO1);
        if (P2SHIP[CONTRO1 - 1] == "N") { CONTRO1 = -CONTRO1; }
        var requestData = Math.abs(CONTRO1);
        if (shotf) {

            if (shotorno2[(Math.abs(requestData - 1))] == 0) {
                dohoashot(toadoxplayer2[(Math.abs(requestData - 1)) % 10], toadoyplayer2[Math.floor((Math.abs(requestData - 1)) / 10)], CONTRO1);
                shotorno2[(Math.abs(requestData - 1))] += 1;
                // socket.emit('UpdateShotOrNot', { arr: shotorno2, COKI: x });
                checkDestroyShip(requestData - 1, P2SHIP, shotorno2, 1);
                t = timer;
                // turn = -turn;
                if (P2SHIP[Math.abs(requestData - 1)] == 'N') {
                    turn = -turn;
                } else {
                    socket.emit('Hit', { hit: true, COKI: x });
                }

                if (CONTRO1 > 0) {
                    P1WIN += 1;
                }
            } else {
                dohoamuctieu(toadoxplayer2[(Math.abs(requestData - 1)) % 10], toadoyplayer2[Math.floor((Math.abs(requestData - 1)) / 10)], 1)
            }
        } else {
            dohoamuctieu(toadoxplayer2[(Math.abs(requestData - 1)) % 10], toadoyplayer2[Math.floor((Math.abs(requestData - 1)) / 10)], shotorno2[Math.abs(requestData - 1)])
        }
    } else {
        var CONTRO2 = (data.emCONTROENEMY);
        console.log(data.emCONTROENEMY + "Player2");
        console.log(CONTRO2);
        if (P1SHIP[CONTRO2 - 1] == "N") { CONTRO2 = -CONTRO2; }
        var requestData2 = Math.abs(CONTRO2);
        if (shotfEnemy) {
            if (shotorno[(Math.abs(requestData2 - 1))] == 0) {
                dohoashot2(toadoxplayer1[(Math.abs(requestData2 - 1)) % 10], toadoyplayer1[Math.floor((Math.abs(requestData2 - 1)) / 10)], CONTRO2);
                shotorno[(Math.abs(requestData2 - 1))] += 1;
                // socket.emit('UpdateShotOrNot', { arr: shotorno2, COKI: x });
                checkDestroyShip(requestData2 - 1, P1SHIP, shotorno, 2);
                t = timer;
                if (P1SHIP[Math.abs(requestData2 - 1)] == 'N') {
                    turn = -turn;
                } else {
                    socket.emit('Hit', { hit: true, COKI: x });
                }
                if (CONTRO2 > 0) {
                    P2WIN += 1;
                }
            } else {
                dohoamuctieu(toadoxplayer1[(Math.abs(requestData2 - 1)) % 10], toadoyplayer1[Math.floor((Math.abs(requestData2 - 1)) / 10)], 1)
            }
        } else {
            dohoamuctieu(toadoxplayer1[(Math.abs(requestData2 - 1)) % 10], toadoyplayer1[Math.floor((Math.abs(requestData2 - 1)) / 10)], shotorno[Math.abs(requestData2 - 1)])
        }
    }
    //Che do 2 PC mode
    function myFunction() {
        if (P1WIN > P2WIN) {
            document.getElementById("winorlose").innerHTML = "WIN";
        } else document.getElementById("winorlose").innerHTML = "LOSE";
        modal.style.display = "block";
    }
    if ((P1WIN == WIN) || (P2WIN == WIN)) {
        setTimeout(myFunction, 1000);
    }
});

function checkDestroyShip(pt, shipArr, shotOrNoArr, player) {
    switch (shipArr[pt]) {
        case 'H':
            for (var i = 0; i < 4; i++) {
                if (shotOrNoArr[pt - i] == 0) {
                    break;
                }
                if (shipArr[pt - i] == 'R2' || shipArr[pt - i] == 'R3' || shipArr[pt - i] == 'R4') {
                    var flag = false;
                    for (let index = 0; index < shipArr[pt - i][1]; index++) {
                        if (shotOrNoArr[pt - i + index] == 0) {
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        var iName = Number(shipArr[pt - i][1]) - 2;
                        if (player == 1) {
                            player2ctx.drawImage(shipNameR[iName], toadoxplayer2[(pt - i) % 10], toadoyplayer2[Math.floor((pt - i) / 10)], 60 * shipArr[pt - i][1], 60);
                        } else
                            player2ctx.drawImage(shipNameR[iName], toadoxplayer1[(pt - i) % 10], toadoyplayer1[Math.floor((pt - i) / 10)], 60 * shipArr[pt - i][1], 60);
                    }
                }
            }
            break;
        case 'V':
            var destroyLen = 0;
            for (var i = 0; i < 40; i += 10) {
                if (shotOrNoArr[pt - i] == 0) {
                    break;
                }
                if (shipArr[pt - i] == 'D2' || shipArr[pt - i] == 'D3' || shipArr[pt - i] == 'D4') {
                    var flag = false;
                    for (let index = 0; index < (shipArr[pt - i][1]) * 10; index += 10) {
                        if (shotOrNoArr[pt - i + index] == 0) {
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        var iName = Number(shipArr[pt - i][1]) - 2;
                        if (player == 1) {
                            player2ctx.drawImage(shipNameD[iName], toadoxplayer2[(pt - i) % 10], toadoyplayer2[Math.floor((pt - i) / 10)], 60, 60 * shipArr[pt - i][1]);
                        } else {
                            player2ctx.drawImage(shipNameD[iName], toadoxplayer1[(pt - i) % 10], toadoyplayer1[Math.floor((pt - i) / 10)], 60, 60 * shipArr[pt - i][1]);
                        }
                    }
                }
            }
            break;
        case 'R2':
        case 'R3':
        case 'R4':
            var flag = false;
            for (let index = 0; index < shipArr[pt][1]; index++) {
                if (shotOrNoArr[pt + index] == 0) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                var iName = Number(shipArr[pt][1]) - 2;
                if (player == 1) {
                    player2ctx.drawImage(shipNameR[iName], toadoxplayer2[(pt) % 10], toadoyplayer2[Math.floor((pt) / 10)], 60 * shipArr[pt][1], 60);
                } else {
                    player2ctx.drawImage(shipNameR[iName], toadoxplayer1[(pt) % 10], toadoyplayer1[Math.floor((pt) / 10)], 60 * shipArr[pt][1], 60);
                }

            }
            break;
        case 'D2':
        case 'D3':
        case 'D4':
            var flag = false;
            for (let index = 0; index < (shipArr[pt][1]) * 10; index += 10) {
                if (shotOrNoArr[pt + index] == 0) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                var iName = Number(shipArr[pt][1]) - 2;
                if (player == 1) {
                    player2ctx.drawImage(shipNameD[iName], toadoxplayer2[(pt) % 10], toadoyplayer2[Math.floor((pt) / 10)], 60, 60 * shipArr[pt][1]);
                } else {
                    player2ctx.drawImage(shipNameD[iName], toadoxplayer1[(pt) % 10], toadoyplayer1[Math.floor((pt) / 10)], 60, 60 * shipArr[pt][1]);
                }
            }
            break;
        case 'S':
            if (player == 1) {
                player2ctx.drawImage(r1, toadoxplayer2[(pt) % 10], toadoyplayer2[Math.floor((pt) / 10)], 60, 60);
            } else {
                player2ctx.drawImage(r1, toadoxplayer1[(pt) % 10], toadoyplayer1[Math.floor((pt) / 10)], 60, 60);
            }

            break;
        default:
            break;
    }
}

function CHECKINTERVAL() {
    setInterval(function() {
        if (turn == 1) {
            document.getElementById("demo2").innerHTML = "Your turn";
            document.getElementById("demo2").style.color = "#337AB7";
        } else {
            document.getElementById("demo2").innerHTML = "Enemy turn";
            document.getElementById("demo2").style.color = "#2ecc71";
        }
    }, 300);
}

function SETINTERVAL() {
    setInterval(function() {
        t = t - 1;
        document.getElementById("demo").innerHTML = t;
        if (t == 0) {
            t = timer;
            turn = -turn;
        }
    }, 1000);
}

// Get the modal
var modal = document.getElementById('myModal');

function PlayAgain() {
    socket.emit('Playagain', {
        COOKIE: x,
    });
}

socket.on("RESPlayagain", function(data) {
    // console.log(data.emPlayAgain);
    // if (data.emPlayAgain == 1) {
    //     socket.emit('CLEAR', {});

    // }
    socket.emit('CLEAR', { COOKIE: x });
});
socket.on("CLEAROK", function(data) {
    window.location = '/room';
});

$('#logout').on('click', function() {
    // window.location = '/logout';
    socket.emit('Playagain', {
        COOKIE: x,
    });
});