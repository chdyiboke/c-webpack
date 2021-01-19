import A from './a'
import B from './b'

// let p = require('./nodejs.png');
// console.log(p);

console.log('Bravo!');

console.log(A()?.aaa?.ccc);
console.log(B);

const fun =()=>{
  console.log('箭头');
}
fun();
console.log('devserver');
