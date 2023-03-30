import { useEffect } from 'react';
import { useState } from 'react';

export default function TodoListPage() {
 const [todoList, setTodoList] = useState([]);
 const [todo, setTodo] = useState({ date: '', judul: '', desc: '' });

 const [total, setTotal] = useState(0);

 function deleteTodo(idx) {
  const tempArr = [...todoList]; //shallow copy todolist
  tempArr.splice(idx, 1);
  setTodoList(tempArr);
 }

 function inputHandler(event) {
  const id = event.target.id; //date judul
  const value = event.target.value;
  const tempObj = { ...todo }; // {date: null, judul: "", desc : ""} /{date: "2023/03/30", judul : "", desc: ""}
  tempObj[id] = value; // tempObj['date'] = value, tempObj['judul'] = "makan siang"
  //{date: "2023/03/30", judul : "", desc: ""}  /{date: "2023/03/30", judul : "makan siang", desc: ""}
  setTodo(tempObj);
  console.log(tempObj);
 }

 useEffect(() => {
  setTotal(todoList.length);
 }, [todoList, todo.judul]);

 //useEffect punya 2 arrg
 // 1. cb
 // 2. array

 //useEffect akan membaca arrg ke 2 yaitu si array
 // di dalam array ada variable todolist
 // apabila todolist isinya berubah
 //maka dia akan menjalan arrg ke 1

 function add() {
  const { judul, date, desc } = todo;
  if (!judul || !date || !desc) {
   return alert('isi semua dong bos');
  }
  const tempArr = [...todoList]; //shallow copy isi array todo list ke tempArr
  tempArr.push(todo); //Push todo { date,judul,desc} => array=> [{date,judul,desc}]
  setTodoList(tempArr);

  setTodo({ date: '', judul: '', desc: '' });
 }

 return (
  <center>
   <h1 style={{ color: 'black' }}>TODO LIST</h1>
   <div
    style={{
     width: '400px',
     border: '8px double white',
     padding: '5px',
     marginTop: '20px',
     height: '500px',
     backgroundColor: 'grey',
     flexDirection: 'column',
     display: 'flex',
     gap: '5px'
    }}
   >
    <input
     style={{ height: '28px' }}
     type="date"
     id="date"
     onChange={inputHandler}
     value={todo.date}
    />
    <input
     id="judul"
     style={{ height: '20px' }}
     placeholder="Judul kegiatan anda ..."
     onChange={inputHandler}
     value={todo.judul}
    ></input>

    <input
     id="desc"
     style={{ height: '50px' }}
     placeholder="Deskripsi kegiatan anda ..."
     onChange={inputHandler}
     value={todo.desc}
    ></input>

    <button
     style={{
      height: '30px',
      border: '2px solid darkgrey',
      color: 'black',
      fontWeight: 'bold'
     }}
     onClick={add}
    >
     ADD
    </button>

    <div
     style={{
      backgroundColor: 'white',
      width: '400px',
      padding: '10px 0px',
      height: '100%',
      display: 'flex',
      gap: '5px',
      flexDirection: 'column',
      overflowY: 'auto'
     }}
    >
     {todoList.map((val, idx) => (
      <Card {...val} delete={() => deleteTodo(idx)} />
     ))}
    </div>
   </div>
   <div>
    <h1>Total List : {total}</h1>
   </div>
  </center>
 );
}

function Card(props) {
 return (
  <div
   style={{
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 10px',
    gap: '5px',
    border: '1px solid black',
    height: '50px'
   }}
  >
   <div style={{ width: '150px', padding: '0px 5px', fontWeight: 'bold' }}>
    {props.judul.length > 10
     ? props.judul.substring(0, 10) + '...'
     : props.judul}
   </div>
   <div style={{ width: '150px', padding: '0px 5px' }}> {props.date}</div>
   <div style={{ width: '150px', padding: '0px 5px' }}>
    {props.desc.length > 10 ? props.desc.substring(0, 10) + '...' : props.desc}
   </div>
   <button onClick={props.delete}>delete</button>
  </div>
 );
}
