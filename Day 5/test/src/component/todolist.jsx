import { useState } from "react";
export default function ToDoList() {
  const [todo, setTodo] = useState("lol");
  const arr = [];
  function changevalue() {
    const newName = document.getElementById("inputs").value;
    setTodo(newName);
    console.log(todo);
  }
  return (
    <center>
      <div
        style={{
          border: "2px solid black",
          width: "400px",
          height: "500px",
          backgroundColor: "grey",
        }}
      >
        <div className="dateinput">
          TODO LIST
          <input type="date" style={{ width: "98%" }} />
          <input
            id="inputs"
            onChange={changevalue}
            value={todo}
            style={{ backgroundColor: "white", width: "98%" }}
            type="text"
          />{" "}
        </div>
        <div>
          <button onClick={arr.push({ todo })} style={{ width: "100%" }}>
            Add
          </button>
        </div>
        <div style={{ backgroundColor: "white", width: "100%" }}>
          {arr.map((val) => (
            <div></div>
          ))}
        </div>
      </div>
    </center>
  );
}
