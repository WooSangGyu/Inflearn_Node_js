var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var MySQLStore = require('express-mysql-session')(session);
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: '126498162asdrasydr0y10',
    resave: false, //session id를 접속할 때 마다 새롭게 발급하는것을 하지 않는다
    saveUninitialized: true, // session id를 session을 실제로 사용하기 전까지 발급하지 말아라
    store:new MySQLStore({          // mysql 연결
        host: 'localhost',
        port: 3306,
        user: 'test',
        password: 'test123',
        database: 'testsession'
    })
}));

app.get('/auth/logout', function(req, res){
    delete req.session.displayName;   // 세션 삭제
    req.session.save(function(){        // database에 crud 하기 때문에 redirect가 저장되기 전에 일어날 수 있기 때문에 save라는 함수에 redirect을 준다.
        res.redirect('/welcome');       // save라는 인자로 전달한 함수를 crud가 끝난 후 나중에 콜백을 주기 때문에 내용이 변경된 후에 redirect된다.
    });
});
app.get('/welcome', function(req, res){
    if(req.session.displayName){ //만약 세션이 존재한다면 Hello displayName 띄우기.
        res.send(`
        <h1>Hello, ${req.session.displayName}</h1>
        <a href="/auth/logout">Logout</a>
        `);
    } else {
        res.send(`
        <h1>Welcome</h1>
        <a href="/auth/login">Login</a>
        `);
    }
});
app.post('/auth/login', function(req, res) {
    var user = {                        //원래는 DB에서 가져와야됌
        username: 'sanggyu',
        password: '123',
        displayName:'SangGyu'
    };
    var uname = req.body.username;  //입력한 아이디 가져와서 uname에 저장
    var pwd = req.body.password; // 입력한 비밀번호 pwd에 저장

    if(uname == user.username && pwd == user.password){     //입력한 아이디와 db의 아이디, 입력한 pw와 db비번 비교
        req.session.displayName = user.displayName;              //만약 같다면 displayName에 user.displayName을 넣기
        req.session.save(function(){
            res.redirect('/welcome');
        });
    } else {                                 // 값이 다르다면
        res.send(`Who are you?
        <p>
        <a href="/auth/login">login</a>
        </p>
        `);
    }
});

app.get('/auth/login', function(req, res) { // submit을 클릭시 /auth/login으로 post형식으로 내용을 보냄
    var output =`
    <h1>Login Page</h1>
    <form action="/auth/login" method="post">   
        <p>
            <input type="text" name="username" placeholder="username">
        </p>
        <p>
            <input type="password" name="password" placeholder="password">
        </p>
        <p>
            <input type="submit">
        </p>
    </form>
    `;
    res.send(output);
});


app.get('/count', function(req, res){
    if(req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send('count :'+ req.session.count);
});


/*
session id의 Value(고유)로 접속한 각 사용자는
서버에 count 값으로 저장되어있다.
그 값을 req.session.count로 저장할 수도 있지만
동시에 req.session.count로 값을 읽어올 수도 있다.

app.get('/tmp', function(req, res){
    res.send('result :'+req.session.count);
});
*/
app.listen(3003, function() {
    console.log('Connected 3003 port!!!');
});

