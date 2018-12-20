///////////////////////////////////////////////////////
/////////////PHẦN HOAT DONG SERVER/////////////////////
//////////////////////////////////////////////////////
var express = require("express");
var session = require("express-session")
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./DB-v2');
var app = express();
app.use(express.static("public"));

let sess;

var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use(express.static('public'));

app.use(cookieParser());
app.use(session({
    secret: 'hahahihi8585',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

server.listen(3000, function() {
    console.log('Server is running at port: 3000!')
});

app.get('/', function(request, response) {
    sess = request.session;
    var temp = 0;
    for (var i = SESSIONID.length - 1; i >= 0; i--) {
        if (SESSIONID[i] == request.sessionID) {
            if (STRUCT[i].KiemTraTrangThai() == 0) {
                response.sendFile(__dirname + '/views/index.html');
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 1) {
                response.redirect('/room')
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 2) {
                response.redirect('/create');
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 3) {
                response.redirect('/fight');
                temp = 1;
            }
        }
    }
    if (temp == 0) {
        response.sendFile(__dirname + '/views/index.html');
    }
});

app.get('/room', function(request, response) {
    sess = request.session;
    if (sess.username) {
        //v7+
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == request.sessionID) {
                if (STRUCT[i].KiemTraTrangThai() == 0) {
                    STRUCT[i].setTrangThai("room");
                }
            }
        }
        //v7-
    }
    var temp = 0;
    for (var i = SESSIONID.length - 1; i >= 0; i--) {
        if (SESSIONID[i] == request.sessionID) {
            if (STRUCT[i].KiemTraTrangThai() == 0) {
                response.sendFile(__dirname + '/views/index.html');
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 1) {
                response.sendFile(__dirname + '/views/room.html');
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 2) {
                response.redirect('/create');
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 3) {
                response.redirect('/fight');
                temp = 1;
            }
        }
    }
    if (temp == 0) {
        response.sendFile(__dirname + '/views/index.html');
    }
});

app.get('/create', function(request, response) {
    sess = request.session;
    if (sess.username) {
        //v7+
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == request.sessionID) {
                if (STRUCT[i].KiemTraTrangThai() == 1) {
                    STRUCT[i].setTrangThai("create");
                }
            }
        }
        //v7-
    }

    var temp = 0;
    for (var i = SESSIONID.length - 1; i >= 0; i--) {
        if (SESSIONID[i] == request.sessionID) {
            if (STRUCT[i].KiemTraTrangThai() == 0) {
                response.sendFile(__dirname + '/views/index.html');
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 1) {
                response.redirect('/room')
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 2) {
                response.sendFile(__dirname + '/views/createMap.html');
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 3) {
                response.redirect('/fight');
                temp = 1;
            }
        }
    }
    if (temp == 0) {
        response.sendFile(__dirname + '/views/index.html');
    }
});

app.get('/fight', function(request, response) {
    sess = request.session;
    if (sess.username) {
        //v7+
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == request.sessionID) {
                if (STRUCT[i].KiemTraTrangThai() == 2) {
                    STRUCT[i].setTrangThai("fight");
                }
            }
        }
        //v7-
    }
    var temp = 0;
    for (var i = SESSIONID.length - 1; i >= 0; i--) {
        if (SESSIONID[i] == request.sessionID) {
            if (STRUCT[i].KiemTraTrangThai() == 0) {
                response.sendFile(__dirname + '/views/index.html');
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 1) {
                response.redirect('/room')
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 2) {
                response.redirect('/create');
                temp = 1;
            } else if (STRUCT[i].KiemTraTrangThai() == 3) {
                response.sendFile(__dirname + '/views/fight.html');
                temp = 1;
            }
        }
    }
    if (temp == 0) {
        response.sendFile(__dirname + '/views/index.html');
    }
});

app.get('/register', function(request, response) {
    response.sendFile(__dirname + '/views/register.html');
});

app.get('/gamepad', function(request, response) {
    response.sendFile(__dirname + '/views/gamepad.html');
});

app.get('/logout', function(request, response) {
    checkID.splice(checkUser.indexOf(request.session.username), 1);
    userGamepad.splice(checkUser.indexOf(request.session.username), 1);
    checkUser.splice(checkUser.indexOf(request.session.username), 1);
    for (var i = SESSIONID.length - 1; i >= 0; i--) {
        if (SESSIONID[i] == request.sessionID) {
            STRUCT[i].setTrangThai('');
        }
    }
    console.log("checkUser: " + checkUser);
    console.log("checkID: " + checkID);
    console.log("userGamepad: " + userGamepad);
    console.log("gamepadArr: " + gamepadArr);
    io.sockets.emit("GamepadArr", { arr: gamepadArr, ss: checkID, id: userGamepad });

    if (PHONGS.phong1.includes(request.sessionID)) {
        PHONGS.phong1.splice(PHONGS.phong1.indexOf(request.sessionID), 1);
        console.log("PHONGS.phong1: " + PHONGS.phong1);
        phong[0] = PHONGS.phong1.length;
    } else if (PHONGS.phong2.includes(request.sessionID)) {
        PHONGS.phong2.splice(PHONGS.phong2.indexOf(request.sessionID), 1);
        phong[1] = PHONGS.phong2.length;
    } else if (PHONGS.phong3.includes(request.sessionID)) {
        PHONGS.phong3.splice(PHONGS.phong3.indexOf(request.sessionID), 1);
        phong[2] = PHONGS.phong3.length;
    }
    io.sockets.emit('UpdateEnemy', "Chưa có đối thủ");
    response.redirect('/');
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/login', urlencodedParser, function(req, res) {

    db.selectPlayer(req.body.username, req.body.password, function(isExist) {
        if (isExist) {
            if (!checkUser.includes(req.body.username)) {
                checkUser.push(req.body.username);
                checkID.push(req.sessionID);
                console.log("checkUser: " + checkUser);
                console.log("checkID: " + checkID);
                res.send({ data: 1, ID: req.sessionID, usr: req.body.username });
                var temp = 0;
                for (var i = SESSIONID.length - 1; i >= 0; i--) {
                    if (SESSIONID[i] == req.sessionID) {
                        SESSIONUSER[i] = req.body.username;
                        //v7+
                        STRUCT[i] = new User();
                        STRUCT[i].setTrangThai("login");
                        STRUCT[i].setUer(req.sessionID);
                        //v7-
                        temp = 1;
                    }
                }
                if (temp == 0) {
                    SESSIONID.push(req.sessionID);
                    SESSIONUSER.push(req.body.username);
                    //V7+
                    STRUCT[useronline] = new User();
                    STRUCT[useronline].setTrangThai("login");
                    STRUCT[useronline].setUer(req.sessionID);
                    useronline += 1;
                    //V7-
                }
            } else {
                res.send({ data: -1 });
            }
        } else {
            res.send({ data: 0 });
        }
    })

    sess = req.session;
    sess.username = req.body.username;
});

app.post('/register', urlencodedParser, function(req, res) {
    request = {
        usn: req.body.username,
        pw: req.body.password
    };
    console.log(request);
    db.findPlayer(req.body.username, function(isExist) {
        if (isExist) {
            res.send({ data: -1 });
        } else {
            db.insertPlayer(req.body.username, req.body.password);
            res.send({ data: 1 });
        }
    })
});



////////////////////////////////////////////////////////
///////PHẦN XỬ LÝ//////////////////////////////////////
///////////////////////////////////////////////////////

//++++++++++++++++Function User++++++++++++++++++++++++++++++++++++++++++++++++++++
//---Chuc nang: Luu giu thong tin cua user(STRUCT)-----//
//---Tham so: Khong//
//---Cach dung: khong dung trong chuong trinh - chi dung phuong thuc cua no--------------
//trang thai 0: dang nhap va chon tay cam
//Trang thai 1: room
//trang thai 2: creatmap
//trang thai 3: fight
function User() {
    // Thuộc tính chinh
    this.username = '';
    this.trangthai = '';
    // Thuộc tính room
    this.vitriphong = 1;
    this.keyvaoroom = 0;
    // Thuộc tính create map
    this.controplayercreate = 1;
    this.shotcreate = 0;
    this.keycreate = 'R';
    this.shipmap = [];
    // Thuộc tính fight
    this.sangsang = 0;
    this.controplayerfight = 1;
    this.shotfight = 0;
    this.playagain = 0;

    // Phương thức
    this.setUer = function(username) {
        this.username = username;
    };
    this.setTrangThai = function(trangthai) {
        this.trangthai = trangthai;
    };
    this.setViTriPhong = function(sophong) {
        this.vitriphong = sophong;
    };
    this.setKeyVaoRoom = function(key) {
        this.keyvaoroom = key;
    };
    this.setConTroPlayerCreat = function(contro) {
        this.controplayercreate = contro;
    };
    this.setShotCreat = function(shot) {
        this.shotcreate = shot;
    };
    this.setKeyCreat = function(keycr) {
        this.keycreate = keycr;
    };
    this.setShipMap = function(shipm) {
        this.shipmap = shipm;
    };
    this.setSangSang = function(ss) {
        this.sangsang = ss;
    };
    this.setConTroPlayerFight = function(controf) {
        this.controplayerfight = controf;
    };
    this.setShotFight = function(shotf) {
        this.shotfight = shotf;
    };
    this.setPlayAgain = function(again) {
        this.playagain = again;
    };

    this.KiemTraTrangThai = function() {
        if (this.trangthai == "room") {
            return 1;
        } else if (this.trangthai == "create") {
            return 2;
        } else if (this.trangthai == "fight") {
            return 3;
        } else { return 0 }
    };

    // Phải return this thì mới tạo mới được đối tượng
    return this;
}
var STRUCT = [];
var PHONGS = new TPHONG();
//V12
function TPHONG() {

    this.phong1 = [];
    this.phong2 = [];
    this.phong3 = [];
    // Thuộc tính fight


    // Phương thức
    this.setPhong1 = function(phong) {
        if (this.phong1.length == 0) {
            this.phong1[0] = phong;
        } else this.phong1[1] = phong;
    };
    this.setPhong2 = function(phong) {
        if (this.phong2.length == 0) {
            this.phong2[0] = phong;
        } else this.phong2[1] = phong;
    };
    this.setPhong3 = function(phong) {
        if (this.phong3.length == 0) {
            this.phong3[0] = phong;
        } else this.phong3[1] = phong;
    };

    this.KiemTraTrangThai = function() {
        if (this.trangthai == "room") {
            return 1;
        } else if (this.trangthai == "create") {
            return 2;
        } else if (this.trangthai == "fight") {
            return 3;
        } else { return 0 }
    };

    // Phải return this thì mới tạo mới được đối tượng
    return this;
}
//v12-
//V7-
var SESSIONID = [];
var SESSIONUSER = [];
var userGamepad = [];
var gamepadArr = [];
var gamepadID = [];
var checkUser = [];
var checkID = [];
var useronline = 0;
//so do tau chien cua player1 1:co - 0:khong
var p1Ship = [];
var p2Ship = [];

var controplayer1 = 1; // luu vi tri hien tai cua con tro player1 tat ca 100 vi tri 1-100.
var controplayer2 = 1; // luu vi tri hien tai cua con tro player2 tat ca 100 vi tri 1-100.
var controcontrol = 0; // luu du lieu tu tay cam gui len server UP/DOWN/LEFT/RIGHT/OK/CENCEL.
var shot = 0; // kiem tra xem tai vi tri do co thuyen khong, gui len wed 1:co - 0:khong
var error = 0;
var key = 'O';

var result = 'none';
var controsophonghientai = 1; // chua con tro chi so phong hien tai
var phong = []; // chua mang phong
phong[0] = 0;
phong[1] = 0;
phong[2] = 0;

//++++++++++++++++Function JOINROOM++++++++++++++++++++++++++++++++++++++++++++++++++++
//---Chuc nang: Quan ly con tro trong trang room-----//
//---Tham so: 1. TEXTDATA (U,D,L,R,O,C) 2.controsophonghientai (la vi tri con tro hien tai)//
//---Cach dung: Duoc goi trong ham GAME------------------------------
function JOINROOM(TEXTDATA, controsophonghientai) {
    result = 'none';
    if (TEXTDATA == "U" && controsophonghientai > 1) {
        controsophonghientai -= 1;
    }
    if (TEXTDATA == "D" && controsophonghientai < 3) {
        controsophonghientai += 1;
    }
    return controsophonghientai;
}

io.on("connection", function(socket) {
    socket.on('disconnect', function() {
        if (gamepadID.includes(socket.id)) {
            gamepadArr.splice(gamepadID.indexOf(socket.id), 1);
            gamepadID.splice(gamepadID.indexOf(socket.id), 1);
            console.log("DIS gamepadArr: " + gamepadArr);
            console.log("DIS gamepadID: " + gamepadID);
            io.sockets.emit("GamepadArr", { arr: gamepadArr, ss: checkID, id: userGamepad });
        }
    });
    YEUCAUUSER();
    FYEUCAUCHECKSERVER();
    socket.on('BoardInfo', function(data) {
        console.log(data);
        // if (!gamepadArr.includes(data)) {
        //     gamepadArr.push(data);
        // }
        gamepadArr.push(data);
        gamepadID.push(socket.id);
        console.log("gamepadArr: " + gamepadArr);
        console.log("gamepadID: " + gamepadID);
        io.sockets.emit("GamepadArr", { arr: gamepadArr, ss: checkID, id: userGamepad });
    });
    socket.emit("GamepadArr", { arr: gamepadArr, ss: checkID, id: userGamepad });
    socket.on('GamepadSelected', function(data) {
        userGamepad[checkID.indexOf(data.COKI)] = gamepadArr[data.i];
        console.log("checkUser: " + checkUser);
        console.log("userGamepad: " + userGamepad);
        io.sockets.emit("GamepadArr", { arr: gamepadArr, ss: checkID, id: userGamepad });
    });
    socket.on('GamepadKey', function(data) {
        console.log("GamepadKey: " + data);
        var reqKey = data[0];
        var reqID = data.slice(2, 8);
        console.log("id: " + reqID);
        console.log("reqKey: " + reqKey);
        FYEUCAUCHECKSERVER();
        var index = userGamepad.indexOf(reqID);
        var ID = SESSIONID.indexOf(checkID[index]) + 1;
        if (index != -1) {
            GAME(reqKey, ID);
        }
    });
    socket.on('Hit', function(data) {
        console.log(data);
        if (data.hit) {
            var index = 0;
            for (index = 0; index < checkID.length; index++) {
                if (checkID[index] == data.COKI)
                    break;
            }
            console.log("Gamepad vibrator: " + gamepadArr[index]);
            io.sockets.emit("vibrator", gamepadArr[index]);
        }

    });
    socket.on('UpdateShotOrNot', function(data) {

    });
    socket.on('SendTextToSerVer', function(data) {
        console.log(data);
        FYEUCAUCHECKSERVER();
        GAME(data.DATA, data.P);
    });
    socket.on('PointerChange', function(data) {
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data.COKI) {
                STRUCT[i].controplayercreate = data.pt + 1;
            }
        }
    });
    //++++++++++++++++Function YEUCAUUSER++++++++++++++++++++++++++++++++++++++++++++++++++++
    //---Chuc nang: Yeu cau cac client check trang thai user tren SERVER-----//
    //---Tham so: Khong//
    //---Cach dung: Dc dung khi lan dau load trang html moi--------------
    function YEUCAUUSER() {
        socket.on("YeuCauUser", function(data) {
            //console.log("COOKIE " + data.COKI);
            for (var i = SESSIONID.length - 1; i >= 0; i--) {
                if (SESSIONID[i] == data.COKI) {
                    socket.emit('ResYeuCauUser', {
                        USerLa: SESSIONUSER[i],
                    });
                    break;
                } else {
                    socket.emit('ResYeuCauUser', {
                        USerLa: "Chưa đăng nhập",
                    });
                }
            }
        });
    }

    function CHECKLUOT(data) {

        var enemy = data;
        var EnemyLa = 0;
        var YOU = 0;
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data) {
                YOU = STRUCT[i].sangsang;
                if (STRUCT[i].vitriphong == 1) {
                    if (PHONGS.phong1.length == 2) {
                        if (PHONGS.phong1[0] == data) {
                            EnemyLa = 1;
                        } else { EnemyLa = 2; }
                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 2) {
                    if (PHONGS.phong2.length == 2) {

                        if (PHONGS.phong2[0] == data) {
                            EnemyLa = 1;
                        } else { EnemyLa = 2; }
                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 3) {
                    if (PHONGS.phong3.length == 2) {
                        if (PHONGS.phong3[0] == data) {
                            EnemyLa = 1;
                        } else { EnemyLa = 2; }
                    } else {
                        EnemyLa = 0;
                    }
                }
                break;
            }
        }
        return EnemyLa;
    }

    function SHIPENYMYMAP(data) {

        var enemy = data;
        var EnemyLa = 0;
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data) {
                YOU = STRUCT[i].sangsang;
                if (STRUCT[i].vitriphong == 1) {
                    if (PHONGS.phong1.length == 2) {
                        if (PHONGS.phong1[0] == data) {
                            enemy = PHONGS.phong1[1];
                        } else { enemy = PHONGS.phong1[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].shipmap;
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 2) {
                    if (PHONGS.phong2.length == 2) {

                        if (PHONGS.phong2[0] == data) {
                            enemy = PHONGS.phong2[1];
                        } else { enemy = PHONGS.phong2[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].shipmap;

                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 3) {
                    if (PHONGS.phong3.length == 2) {
                        if (PHONGS.phong3[0] == data) {
                            enemy = PHONGS.phong3[1];
                        } else { enemy = PHONGS.phong3[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].shipmap;
                                //console.log("enemy la:" + EnemyLa);
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                }
                break;
            }
        }
        return EnemyLa;
    }

    function CHECKSHOTENEMY(data) {

        var enemy = data;
        var EnemyLa = 0;
        var YOU = 0;
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data) {
                YOU = STRUCT[i].sangsang;
                if (STRUCT[i].vitriphong == 1) {
                    if (PHONGS.phong1.length == 2) {
                        if (PHONGS.phong1[0] == data) {
                            enemy = PHONGS.phong1[1];
                        } else { enemy = PHONGS.phong1[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].shotfight;
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 2) {
                    if (PHONGS.phong2.length == 2) {

                        if (PHONGS.phong2[0] == data) {
                            enemy = PHONGS.phong2[1];
                        } else { enemy = PHONGS.phong2[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].shotfight;

                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 3) {
                    if (PHONGS.phong3.length == 2) {
                        if (PHONGS.phong3[0] == data) {
                            enemy = PHONGS.phong3[1];
                        } else { enemy = PHONGS.phong3[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].shotfight;
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                }
                break;
            }
        }
        return EnemyLa;
    }

    function CHECKCONTROENEMY(data) {

        var enemy = data;
        var EnemyLa = 0;
        var YOU = 0;
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data) {
                YOU = STRUCT[i].sangsang;
                if (STRUCT[i].vitriphong == 1) {
                    if (PHONGS.phong1.length == 2) {
                        if (PHONGS.phong1[0] == data) {
                            enemy = PHONGS.phong1[1];
                        } else { enemy = PHONGS.phong1[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].controplayerfight;
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 2) {
                    if (PHONGS.phong2.length == 2) {

                        if (PHONGS.phong2[0] == data) {
                            enemy = PHONGS.phong2[1];
                        } else { enemy = PHONGS.phong2[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].controplayerfight;

                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 3) {
                    if (PHONGS.phong3.length == 2) {
                        if (PHONGS.phong3[0] == data) {
                            enemy = PHONGS.phong3[1];
                        } else { enemy = PHONGS.phong3[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].controplayerfight;
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                }
                break;
            }
        }
        return EnemyLa;
    }

    function CHECKSS(data) {

        var enemy = data;
        var EnemyLa = 0;
        var YOU = 0;
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data) {
                YOU = STRUCT[i].sangsang;
                if (STRUCT[i].vitriphong == 1) {
                    if (PHONGS.phong1.length == 2) {
                        if (PHONGS.phong1[0] == data) {
                            enemy = PHONGS.phong1[1];
                        } else { enemy = PHONGS.phong1[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].sangsang;
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 2) {
                    if (PHONGS.phong2.length == 2) {

                        if (PHONGS.phong2[0] == data) {
                            enemy = PHONGS.phong2[1];
                        } else { enemy = PHONGS.phong2[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].sangsang;

                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 3) {
                    if (PHONGS.phong3.length == 2) {
                        if (PHONGS.phong3[0] == data) {
                            enemy = PHONGS.phong3[1];
                        } else { enemy = PHONGS.phong3[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].sangsang;
                                //console.log("enemy la:" + EnemyLa);
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                }
                break;
            }
        }
        return EnemyLa * YOU;
    }

    function CHECKPLAYAGAIN(data) {

        var enemy = data;
        var EnemyLa = 0;
        var YOU = 0;
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data) {
                YOU = STRUCT[i].playagain;
                if (STRUCT[i].vitriphong == 1) {
                    if (PHONGS.phong1.length == 2) {
                        if (PHONGS.phong1[0] == data) {
                            enemy = PHONGS.phong1[1];
                        } else { enemy = PHONGS.phong1[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].playagain;
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 2) {
                    if (PHONGS.phong2.length == 2) {

                        if (PHONGS.phong2[0] == data) {
                            enemy = PHONGS.phong2[1];
                        } else { enemy = PHONGS.phong2[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].playagain;

                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                } else if (STRUCT[i].vitriphong == 3) {
                    if (PHONGS.phong3.length == 2) {
                        if (PHONGS.phong3[0] == data) {
                            enemy = PHONGS.phong3[1];
                        } else { enemy = PHONGS.phong3[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = STRUCT[i].playagain;
                                //console.log("enemy la:" + EnemyLa);
                                break;
                            }
                        }

                    } else {
                        EnemyLa = 0;
                    }

                }
                break;
            }
        }
        return EnemyLa * YOU;
    }

    function YEUCAUENEMY(data) {

        var enemy = data;
        var EnemyLa = "Chưa có đối thủ";
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data) {
                if (STRUCT[i].vitriphong == 1) {
                    if (PHONGS.phong1.length == 2) {
                        if (PHONGS.phong1[0] == data) {
                            enemy = PHONGS.phong1[1];
                        } else { enemy = PHONGS.phong1[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = SESSIONUSER[i];
                                //console.log("enemy la:" + EnemyLa);
                                break;
                            }
                        }

                    } else {
                        EnemyLa = "Chưa có đối thủ";
                    }

                } else if (STRUCT[i].vitriphong == 2) {
                    if (PHONGS.phong2.length == 2) {
                        if (PHONGS.phong2[0] == data) {
                            enemy = PHONGS.phong2[1];
                        } else { enemy = PHONGS.phong2[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = SESSIONUSER[i];
                                //console.log("enemy la:" + EnemyLa);
                                break;
                            }
                        }

                    } else {
                        EnemyLa = "Chưa có đối thủ";
                    }

                } else if (STRUCT[i].vitriphong == 3) {
                    if (PHONGS.phong3.length == 2) {
                        if (PHONGS.phong3[0] == data) {
                            enemy = PHONGS.phong3[1];
                        } else { enemy = PHONGS.phong3[0]; }

                        for (var i = SESSIONID.length - 1; i >= 0; i--) {
                            if (SESSIONID[i] == enemy) {
                                EnemyLa = SESSIONUSER[i];
                                //console.log("enemy la:" + EnemyLa);
                                break;
                            }
                        }

                    } else {
                        EnemyLa = "Chưa có đối thủ";
                    }

                }
                break;
            }
        }
        return EnemyLa;
    }

    socket.on("REQYEUCAUCHECKSERVER", function(data) {
        //console.log(data.COKI);
        var temp = 0;
        var ENE = YEUCAUENEMY(data.COKI);
        var checkss = CHECKSS(data.COKI);
        var controenemy = CHECKCONTROENEMY(data.COKI);
        var shotenemy = CHECKSHOTENEMY(data.COKI);
        var luot = CHECKLUOT(data.COKI);
        var enymymap = SHIPENYMYMAP(data.COKI);
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data.COKI) {
                socket.emit('RESYEUCAUCHECKSERVER', {
                    DATANE: "Ban Da Yeu Cau check thanh cong" + i,
                    emPHONG: phong,
                    emVITRICONTROPHONG: STRUCT[i].vitriphong,
                    emKEYVAOROOM: STRUCT[i].keyvaoroom,

                    emCONTROPLAYERCREATE: STRUCT[i].controplayercreate,
                    emSHOTLAYERCREATE: STRUCT[i].shotcreate,
                    emKEYPLAYERCREATE: STRUCT[i].keycreate,

                    emSHIPMAP: STRUCT[i].shipmap,
                    emENEMY: ENE,
                    emSS: checkss,

                    emCONTROPLAYERFIGHT: STRUCT[i].controplayerfight,
                    emSHOTLAYERFIGHT: STRUCT[i].shotfight,
                    emCONTROENEMY: controenemy,
                    emSHOTENEMY: shotenemy,
                    emLUOT: luot,
                    emSHIPMAPENYMY: enymymap,

                });
                temp = 1;
            }
            if (temp == 0 && i == -1) {
                socket.emit('RESYEUCAUCHECKSERVER', {
                    DATANE: "Ban khong co quyen check",
                });
            }
        }
    });
    //v7-
    socket.on('SendShipPos', function(data) {
        //console.log(data);
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data.COOKIE) {
                STRUCT[i].setShipMap(data.Arr);
                STRUCT[i].setSangSang(1);
                // console.log("SS cua thang vua gui" + STRUCT[i].sangsang + " " + data.COOKIE);
            }
        }

    });
    socket.on('Playagain', function(data) {
        //console.log(data);
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (SESSIONID[i] == data.COOKIE) {
                STRUCT[i].setPlayAgain(1);
                // console.log("Playagain cua thang vua gui" + STRUCT[i].playagain + " " + data.COOKIE);
                var CHECKPA = CHECKPLAYAGAIN(data.COOKIE);
                socket.emit('RESPlayagain', {
                    emPlayAgain: CHECKPA,

                });
            }
        }

    });
    socket.on('CLEAR', function(data) {
        //console.log(data);
        var deleteId = [];
        if (PHONGS.phong1.includes(data.COOKIE)) {
            deleteId = PHONGS.phong1;
            PHONGS.phong1 = [];
            phong[0] = PHONGS.phong1.length;
        } else if (PHONGS.phong2.includes(data.COOKIE)) {
            deleteId = PHONGS.phong2;
            PHONGS.phong2 = [];
            phong[1] = PHONGS.phong2.length;
        } else if (PHONGS.phong3.includes(data.COOKIE)) {
            deleteId = PHONGS.phong3;
            PHONGS.phong3 = [];
            phong[2] = PHONGS.phong3.length;
        }
        for (var i = SESSIONID.length - 1; i >= 0; i--) {
            if (deleteId.includes(SESSIONID[i])) {
                STRUCT[i].setKeyVaoRoom(0);
                STRUCT[i].setPlayAgain(0);
                STRUCT[i].setTrangThai("room");
                STRUCT[i].setShotCreat(0);
                STRUCT[i].setKeyCreat(0);
                STRUCT[i].setConTroPlayerFight(1);
                STRUCT[i].setSangSang(0);
                STRUCT[i].setShotFight(0);
                STRUCT[i].setConTroPlayerCreat(0);
            }
        }
        io.sockets.emit('CLEAROK', {});
    });
});
//++++++++++++++++Function GAME++++++++++++++++++++++++++++++++++++++++++++++++++++
//---Chuc nang: Xu ly toan bo du lieu tu luc tao phong den luc ket thuc game-----//
//---Tham so: 1. DuLieuGuiLen (U,D,L,R,O,C) 2.IDNguoiChoi (1,2,3,...)//
//---Cach dung: Neu nhan du lieu thi se chay ham nay------------------------------
function GAME(DuLieuGuiLen, IDNguoiChoi) {
    if (DuLieuGuiLen != 'L' && DuLieuGuiLen != 'R' && DuLieuGuiLen != 'U' &&
        DuLieuGuiLen != 'D' && DuLieuGuiLen != 'O' && DuLieuGuiLen != 'C') {
        console.log("Du lieu gui len khong hop le: " + DuLieuGuiLen);
    }
    switch (STRUCT[IDNguoiChoi - 1].KiemTraTrangThai()) {
        case 0:
            console.log("Moi dang nhap thoi");
            break;
        case 1:
            console.log("Dang o room");
            var phongx = STRUCT[IDNguoiChoi - 1].vitriphong;
            console.log("Phong hien tai: " + phongx);
            console.log("Data gui len: " + DuLieuGuiLen);
            if (DuLieuGuiLen == 'O') {
                if (phong[phongx - 1] < 2) {
                    console.log("Ban da vao phong: " + phongx);
                    if (phongx == 1) {
                        PHONGS.setPhong1(STRUCT[IDNguoiChoi - 1].username);
                        phong[0] = PHONGS.phong1.length;
                    } else if (phongx == 2) {
                        PHONGS.setPhong2(STRUCT[IDNguoiChoi - 1].username);
                        phong[1] = PHONGS.phong2.length;
                    } else if (phongx == 3) {
                        PHONGS.setPhong3(STRUCT[IDNguoiChoi - 1].username);
                        phong[2] = PHONGS.phong3.length;
                    }
                    console.log(PHONGS.phong1[0] + " phong1");
                    console.log(PHONGS.phong2 + " phong2");
                    console.log(PHONGS.phong3 + " phong3");
                    STRUCT[IDNguoiChoi - 1].setKeyVaoRoom("ok");
                } else if (phong[controsophonghientai - 1] == 2) {
                    STRUCT[IDNguoiChoi - 1].setKeyVaoRoom("full");
                }
            }
            STRUCT[IDNguoiChoi - 1].setViTriPhong(JOINROOM(DuLieuGuiLen, phongx));
            console.log("Mang phong hien tai: " + phong)
            break;
        case 2:
            //STRUCT[data.P-1].setKeyVaoRoom("0"); // cho quay ve trang thai truoc
            console.log("Dang tao map");
            var controplayer1 = STRUCT[IDNguoiChoi - 1].controplayercreate;
            if (DuLieuGuiLen == 'L') {
                if (Math.abs(controplayer1 % 10) != 1) {
                    controplayer1 -= 1;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerCreat(controplayer1);
                }
                //key = 'L';
                STRUCT[IDNguoiChoi - 1].setShotCreat(0);
                STRUCT[IDNguoiChoi - 1].setKeyCreat('L');
            } else if (DuLieuGuiLen == 'R') {
                if (Math.abs(controplayer1 % 10) != 0) {
                    controplayer1 += 1;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerCreat(controplayer1);
                }
                //key = 'R';
                STRUCT[IDNguoiChoi - 1].setShotCreat(0);
                STRUCT[IDNguoiChoi - 1].setKeyCreat('R');
            } else if (DuLieuGuiLen == 'U') {
                if (Math.abs(Math.floor((controplayer1) / 10)) != 0 && controplayer1 != 10) {
                    controplayer1 -= 10;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerCreat(controplayer1);
                }
                //key = 'U';
                STRUCT[IDNguoiChoi - 1].setShotCreat(0);
                STRUCT[IDNguoiChoi - 1].setKeyCreat('U');
            } else if (DuLieuGuiLen == 'D') {
                if (Math.abs(Math.floor((controplayer1) / 10)) != 9 && controplayer1 != 100) {
                    controplayer1 += 10;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerCreat(controplayer1);
                } else if (controplayer1 == 90) {
                    controplayer1 += 10;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerCreat(controplayer1);
                }
                //key = 'D';
                STRUCT[IDNguoiChoi - 1].setShotCreat(0);
                STRUCT[IDNguoiChoi - 1].setKeyCreat('D');
            } else if (DuLieuGuiLen == 'O') {
                //shot = 1;
                var temp = STRUCT[IDNguoiChoi - 1].shotcreate;
                // temp += 1;
                temp = 1;
                STRUCT[IDNguoiChoi - 1].setShotCreat(temp);
                //key = 'O';
                STRUCT[IDNguoiChoi - 1].setKeyCreat('O');
            } else if (DuLieuGuiLen == 'C') {
                //shot = 1;
                var temp = STRUCT[IDNguoiChoi - 1].shotcreate;
                // temp -= 1;
                temp = -1;
                STRUCT[IDNguoiChoi - 1].setShotCreat(temp);
                //key = 'C';
                STRUCT[IDNguoiChoi - 1].setKeyCreat('C');
            } else {
                //error = 1;
            }

            break;
        case 3:
            console.log("Dang trong tran");
            var controplayer1 = STRUCT[IDNguoiChoi - 1].controplayerfight;
            if (DuLieuGuiLen == 'L') {
                if (controplayer1 == 1) {
                    controplayer1 = 100;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerFight(controplayer1);
                } else {
                    controplayer1 -= 1;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerFight(controplayer1);
                }

            } else if (DuLieuGuiLen == 'R') {
                if (controplayer1 == 100) {
                    controplayer1 = 1;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerFight(controplayer1);
                } else {
                    controplayer1 += 1;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerFight(controplayer1);
                }
            } else if (DuLieuGuiLen == 'U') {
                if (Math.floor((controplayer1) / 10) == 0 || controplayer1 == 10) {
                    controplayer1 += 90;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerFight(controplayer1);
                } else {
                    controplayer1 -= 10;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerFight(controplayer1);
                }
            } else if (DuLieuGuiLen == 'D') {
                if ((Math.floor((controplayer1) / 10) == 9 || controplayer1 == 100) && controplayer1 != 90) {
                    controplayer1 -= 90;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerFight(controplayer1);
                } else {
                    controplayer1 += 10;
                    STRUCT[IDNguoiChoi - 1].setConTroPlayerFight(controplayer1);
                }
            } else if (DuLieuGuiLen == 'O') {
                var temp = STRUCT[IDNguoiChoi - 1].shotfight;
                temp += 1;
                STRUCT[IDNguoiChoi - 1].setShotFight(temp);
            }
            break;
        case 4:
            day = "Thursday";
            break;
    }
}

//++++++++++++++++Function FYEUCAUCHECKSERVER++++++++++++++++++++++++++++++++++++++++++++++++++++
//---Chuc nang: Yeu cau cac client check trang thai cua client do tren SERVER-----//
//---Tham so: Khong//
//---Cach dung: Dc dung khi co du lieu gui len hoac khi lan dau load trang html moi--------------
function FYEUCAUCHECKSERVER() {
    io.sockets.emit('YEUCAUCHECKSERVER', {
        CHECK: 1,
    });
}