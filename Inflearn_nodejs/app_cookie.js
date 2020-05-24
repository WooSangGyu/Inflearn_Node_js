var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser('24@!$!@$12412412$A124')); //24@!$!@$12412412$A124 는 암호화의 키값

var products = {
    1:{title:'The history of web 1'},
    2:{title:'The next web'}
};

app.get('/products', function(req, res){
    var output = '';
    for(var name in products){
        output += 
        `<li>
            <a href="/cart/${name}">${products[name].title}</a>
        </li>`
    }
    res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart"> Cart </a>`);
});

/*
cart = {
    제품의 아이디:제품의 수량
    1:1,
    2:1,
    3:0
}
*/

app.get('/cart/:id', function(req, res){
    var id = req.params.id;      //cart 의 아이디 값 저장
    if(req.signedCookies.cart) {              // 만약 cart의 값이 있다면 그대로 가져와서 적용 없다면 새롭게 cart의 값을 만듦
        var cart = req.signedCookies.cart;  //signedCookies 암호화시키기
    } else {
      var cart = {};
    }
    
    if(!cart[id]) {       //만약 cart[id]의 값이 없다면 만들고 0 으로 지정
        cart[id] = 0;
    }
    cart[id] = parseInt(cart[id])+1;   //cart[id]값에 현재 갯수+1해서 값 증가시키기

    res.cookie('cart', cart, {signed:true})     // cookie의 'cart' 항목에 cart의 값을 저장 , singed:true는 쿠키를 저장할 때 암호화 해서 저장해라
    res.redirect('/cart'); // localhost3003/cart로 넘겨주기
});

app.get('/cart', function(req, res){
    var cart = req.signedCookies.cart;
    if (!cart) {                    // cart 안에 값이 없다면 비어있다고 알려주기
        res.send('Empty'); 
    } else {
        var output = '';
        for(var id in cart) {
            output += `<li>${products[id].title} (${cart[id]})</li>` //products[id].title로 상품 이름 가져오기, cart[id]로 id값의 개수 가져오기
        }
    }
    res.send(`
    <h1>Cart</h1>
    <ul>${output}</ul>
    <a href ="/products">Products List</a>
    `);
});


app.get('/count', function(req, res) {
    if(req.signedCookies.count) {
        var count = parseInt(req.signedCookies.count);
    } else {
        var count = 0;
    }

    count = count+1;

    res.cookie('count',count , {signed:true});
    res.send('count : ' + count);
});

app.listen(3003, function(){
    console.log('Connected 3003 prot!!!');
});