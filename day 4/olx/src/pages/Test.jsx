import { useEffect } from 'react';
import { useState } from 'react';

export default function TestPage() {
 //  let name = 'test';
 const [name, setName] = useState('ayam');

 const [arrName, setArrName] = useState(['mikhael', 'chris', 'thomas']);

 //name = state => variable
 //setName = setState => function

 function changeName() {
  const newName = document.getElementById('input').value;
  //   name = newName;
  setName(newName);
  console.log(name);
 }
 function Add() {
  console.log(arrName);
  //   arrName.push(name);
  //   ['mikhael', 'chris', 'thomas'];
  //arrName = [  'mikhael', 'chris', 'thomas',"halo" ]
  //[ 'mikhael', 'chris', 'thomas',"halo","halo"]
  const tempArr = [...arrName];
  //   tempArr.push(name);
  setArrName([...arrName, name]);
  //   setArrName(tempArr);
  setName('');
 }

 function change(val) {
  console.log(val);
  setName(val);
 }

 const [result, setResult] = useState(0);

 function sum() {
  const angka1 = parseInt(document.getElementById('angkaPertama').value);
  const angka2 = parseInt(document.getElementById('angkaKedua').value);

  setResult(angka1 + angka2);
  console.log(angka1 + angka2);
 }
 const [angka1, setAngka1] = useState(0);
 const [angka2, setAngka2] = useState(0);

 function assignAngka(value, classname) {
  console.log(classname);
  value = parseInt(value);
  if ('angka1' == classname) {
   setAngka1(value);
  } else {
   setAngka2(value);
  }
 }

 function sum2() {
  setResult(angka1 + angka2);
 }

 //componentDidUpdated
 useEffect(() => {
  //   alert(angka1 + angka2);
  setResult(angka1 + angka2);
 }, [angka1, angka2]);

 return (
  <div>
   <h1>Test</h1>
   <h2>{name}</h2>
   <div>
    {arrName.map((val) => (
     <div>{val} </div>
    ))}
   </div>

   <input
    style={{ backgroundColor: 'grey' }}
    type="text"
    id="input"
    onChange={changeName}
    value={name}
   />

   <button onClick={Add}>Add</button>

   <div>
    <input
     style={{ backgroundColor: 'red' }}
     type="text"
     onChange={(event) => change(event.target.value)}
    />

    <div>
     <input
      style={{
       width: '30px',
       backgroundColor: 'blue',
       color: 'white'
      }}
      type="text"
      defaultValue={0}
      id="angkaPertama"
      className="angka1"
      onChange={(e) => assignAngka(e.target.value, e.target.className)}
      //   onChange={sum}
     />
     +
     <input
      style={{ width: '30px', backgroundColor: 'blue', color: 'white' }}
      type="text"
      className="angka2"
      defaultValue={0}
      id="angkaKedua"
      //   onChange={sum}
      onChange={(e) => assignAngka(e.target.value, e.target.className)}
     />
     = {result}
    </div>
    <div>
     {angka1} + {angka2} <button onClick={sum2}>=</button>
     {result}
    </div>
   </div>
  </div>
 );
}

// componentWillMount
// componentDidMount
// componentDidUpdated =>
// componentWillUnmount

// useEffect(cb) will mount
// useEffect(cb,[]) did mount
// useEffect(cb,[a,b]) updated
// useEffect(()=> {

//     return () => {
//         //unmount
//     }
// },[])

const obj = {
 name: 'udin',
 age: 200
};

// const name = obj.name
// const age = obj.age

const { name, age } = obj;
