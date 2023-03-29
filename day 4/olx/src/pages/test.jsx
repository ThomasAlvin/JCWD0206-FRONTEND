export default function TestPage() {
  let name = "";
  function changeName(newName) {
    return (name = newName);
  }
  return (
    <div>
      <h1>tets</h1>
      <h2>{name}</h2>
      <input
        style={{ backgroundColor: "red" }}
        type="text"
        onChange={() => changename(this.value)}
      />
    </div>
  );
}
