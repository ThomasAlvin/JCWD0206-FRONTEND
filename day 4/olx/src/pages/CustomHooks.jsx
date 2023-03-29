import { useState } from 'react';

export default function CustomHooksPage() {
 const [count, increment, decrement] = UseCounter(0, 1);
 return (
  <>
   <center>
    <div>
     <button onClick={decrement}>decrement</button>

     <h1 style={{ display: 'inline', padding: ' 0px 5px' }}>{count}</h1>
     <button onClick={increment}>increment</button>
    </div>
   </center>
  </>
 );
}

function UseCounter(val, step) {
 const [count, setCount] = useState(val);
 //count  =0
 //step = 1
 function increment() {
  setCount(count + step);
  //   count = count+1
 }
 function decrement() {
  setCount(count - step);
  //   count = count-1
 }

 return [count, increment, decrement];
}
