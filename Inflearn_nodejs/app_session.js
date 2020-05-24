var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: '126498162asdrasydr0y10',
    resave: false, //session id를 접속할 때 마다 새롭게 발급하는것을 하지 않는다
    saveUninitialized: true // session id를 session을 실제로 사용하기 전까지 발급하지 말아라
  }));

app.get('/auth/logout', function(req, res){
    delete req.session.displayName;
    res.redirect('/welcome');
});
app.get('/welcome', function(req, res){
    if(req.session.displayName){
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
    var user = {
        username: 'sanggyu',
        password: '123',
        displayName:'SangGyu'
    };
    var uname = req.body.username;
    var pwd = req.body.password;

    if(uname == user.username && pwd == user.password){
        req.session.displayName = user.displayName;
        res.redirect('/welcome');
    } else {
        res.send(`Who are you?
        <p>
        <a href="/auth/login">login</a>
        </p>
        `);
    }
});

app.get('/auth/login', function(req, res) {
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

