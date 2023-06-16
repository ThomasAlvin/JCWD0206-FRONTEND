import { useEffect, useState } from "react";
export default function TestPage() {
  // let name = "test";
  const [name, setName] = useState("");
  const [arrName, setArrName] = useState(["mikhael, chris, thomas"]);

  function changename() {
    const newName = document.getElementById("input").value;
    setName(newName);
    console.log(name);
    // return (name = newName);
  }
  function Add() {
    console.log(arrName);
    const tempArr = [...arrName];
    setArrName([...arrName, name]);
    setName("");
  }
  function change(val) {
    console.log(val);
    setName(val);
  }
  // const [result, setResult] = useState(0);

  function sum() {
    const angka1 = parseInt(document.getElementById("angkaPertama").value);
    const angka2 = parseInt(document.getElementById("angkaKedua").value);
    setResult(angka1 + angka2);
    console.log(angka1 + angka2);
  }

  // const [angka1, setAngka1] = useState(0);
  const [angka1, setAngka1] = useState(0);
  const [angka2, setAngka2] = useState(0);
  const [result, setResult] = useState(0);

  function assignAngka(value, classname) {
    console.log(classname);
    value = parseInt(value);
    if ("angka1" == classname) {
      setAngka1(value);
    } else {
      setAngka2(value);
    }
  }

  function sum2() {
    setResult(angka1 + angka2);
  }
  useEffect(() => {
    setResult(angka1 + angka2);
  }, [angka1, angka2]);
  // useEffect(() => setResult(angka1 + angka2), [angka1, angka2]);

  return (
    <div>
      <h1>Test</h1>
      <h2>{name}</h2>
      <div>
        {arrName.map((val) => (
          <div>{val}</div>
        ))}
      </div>
      <input
        style={{ backgroundColor: "red" }}
        type="text"
        id="input"
        onChange={changename}
        value={name}
      />
      <button onClick={Add}>Add</button>

      <div>
        <input
          style={{ backgroundColor: "grey" }}
          type="text"
          onChange={(e) => change(e.target.value)}
        />
        <div>
          <input
            style={{ width: "20px", backgroundColor: "blue", color: "white" }}
            type="text"
            defaultValue={0}
            id="angkaPertama"
            onChange={sum}
          />{" "}
          +
          <input
            style={{ width: "20px", backgroundColor: "blue", color: "white" }}
            type="text"
            defaultValue={0}
            id="angkaKedua"
            onChange={sum}
          />
          = {result}
        </div>
      </div>
    </div>
  );
}
