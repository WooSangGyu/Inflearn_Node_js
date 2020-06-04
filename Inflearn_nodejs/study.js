//  forEach
//  배열 전체를 돌며 해당 배열의 요소에 직접 어떤 작업을 수행하고 싶을 때 "배열 자체를 변경"

var testArray = ["a", "b", "c", "d"];

testArray.forEach( function (item, index, array){
	
	array[index] = item+"_test";
});

console.log(testArray);
//  expected output: Array ["a_test", "b_test", "c_test", "d_test"]

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ



//  map()
//  배열 전체를 돌며 해당 배열 요소를 사용하여 "다른 새로운 배열"을 만들고 싶을 때

var num = [2, 3, 4];
var db = num.map(function(number) {
    return num * 2;
});

console.log(num);
console.log(db);

// expected output :num = [2, 3, 4] 
//                   db = [4, 6, 8]

//  위의 결과 값으로는 다음과 같다
//  num = [2, 3, 4];
//  db = [4, 6, 8];


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ



//  array.some
//  배열 요소 중 하나라도 특정 조건을 만족하는지 알고 싶을 때
//  콜백 수행 중 true값을 return하면 바로 중단되며 true를 return한다.
//  true가 한번도 return 되지 않은채 끝나면 최종적으로 false를 return 한다.


var testArray = ["a", "b", "c", "d"];

var isTrue = testArray.some(function (item, index, array) {

	console.log(index + "번째 요소 : " + item);
	return item.search("b")>-1;
});

//  expected output : "0번째 요소 a"
//                    "1번째 요소 b"


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ



//  json.parse()
//  JSON 문자열의 구문을 분석하고, 그 결과에서 javaScript 값이나 객체를 생성

const json = '{"result":true, "count":42}';
const obj = JSON.parse(json);

console.log(obj.count);
//  expected output: 42

console.log(obj.result);
//  expected output: true


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ



//  filter()
//  제공된 함수로 구현된 테스트를 통과하는 모든 요소가 있는
//  새로운 배열을 만든다.

function fuc(num) {
    return num >= 5;
};
var filter = [3, 5, 21, 25, 4, 11].filter(fuc);
// expected output : filter = [5, 21, 25, 11]

//  json object로 이루어진 배열중에 특정 값만 filter시킬 때 유용

var arr = [    
    {"name":"apple", "count": 2},    
    {"name":"orange", "count": 5},    
    {"name":"pear", "count": 3},    
    {"name":"orange", "count": 16}
  ];    
  var newArr = arr.filter(function(item){    
    return item.name === "orange";
  });  
  console.log("Filter results:",newArr);
  
//  expected output : [
//                      {"name":"orange", "count": 5},
//                      {"name":"orange", "count": 16}
//                    ]


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ



// find
// filter와 비슷하지만 단 하나의 요소만 리턴
// 콜백의 return이 true인 요소 찾을 때까지 순회

var arr = [4, 15, 377, 395, 400, 1024, 3000];
var count = 0;

var found = arr.find(function (n) {
    count++;
    return n % 5 == 0;
});

console.log(count);
//  expected output : 2
console.log(found);
//  expected output : 15


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ



//  reduce()
//  배열의 요소들을 하나씩 돌며, 이전 콜백의 return 값(previousValue)을 넘겨받아 작업을 수행하고 싶을 때
//  Promise를 이용해 비동기 작업 순차 실행에 유용

var arr = [9, 2, 8, 5, 7];
var count = 0;

var sum = arr.reduce(function (pre, value) {
    
    count++;
    return pre + value;
});

console.log(sum);
//expected output: 31
console.log(count);
//expected output: 4
// initialValue가 없는 경우 총 4번 실행 됌. 첫 호출 때 pre요소가 9가 전달됨

var count = 0;
var sum = arr.reduce(function (pre, value) {

    count++;
    return pre + value;
}, 0);

console.log(sum);
//expected output: 31
console.log(count);
//expected output: 5
// initialValue가 있는경우 호출 횟수는 5번으로 증가함. 왜냐하면 첫 pre가 0이 전달됌.


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ



//  indexOf()
//  배열에서 특정 값이 있는지 검색한다. 배열에서 지정된 요소를 찾는 경우
//  인덱스 번호를 반환 한다. 존재하지 않는다면 -1을 반환한다.

var a = [2, 5, 9];
console.log(a.indexOf(2));
//  expected output : 0
console.log(a.indexOf(9));
//  expected output : 2


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ



//  json.stringfy()
//  javaScript 값이나 객체를 json문자열로 변환한다. 선택적으로 replacer 함수로 전달할 경우
//  변환 전 값을 변형할 수 있고, 전달한 경우 지정한 속성만 결과에 포함된다.

console.log(JSON.stringify({ x: 5, y: 6 }));
//  expected output: "{"x":5,"y":6}"

console.log(JSON.stringify([new Number(3), new String('false'), new Boolean(false)]));
//  expected output: "[3,"false",false]"

console.log(JSON.stringify({ x: [10, undefined, function(){}, Symbol('')] }));
//  expected output: "{"x":[10,null,null,null]}"

console.log(JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)));
//  expected output: ""2006-01-02T15:04:05.000Z""


//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


//  trim()
//  문자열 좌우에서 공백을 제거하는 함수

var str = " test ";
var trimStr = str.trim();

console.log(str);
// expected output : " test "
console.log(trimStr);
// expected output : "test"