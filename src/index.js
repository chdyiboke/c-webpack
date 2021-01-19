import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import A from './a'
import B from './b'

ReactDOM.render(
  <React.StrictMode>
    <div><div>{A()}{B()}react</div><App /></div>
  </React.StrictMode>,
  document.getElementById('root')
);




// import A from './a'
// import B from './b'

// let p = require('./nodejs.png');
// console.log(p);

// console.log('Bravo!');

// console.log(A()?.aaa?.ccc);
// console.log(B);

// const fun =()=>{
//   console.log('箭头');
// }
// fun();
console.log('devserver');

