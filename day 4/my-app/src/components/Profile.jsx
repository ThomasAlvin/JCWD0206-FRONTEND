export default function Profile(props) {
 console.log(props);
 return (
  <div>
   <h1 style={{ ...props }}> ini Profile </h1>
  </div>
 );
}
export function Propicts(props) {
 return (
  <div>
   <h1> ini adalah {props.value} </h1>
   {Data}
  </div>
 );
}

export function Data() {
 return (
  <div>
   <h1> ini adalah Data </h1>
   <IsiData />
  </div>
 );
}

function IsiData() {
 let arr = ['udin', 'petot'];
 return (
  <div>
   {arr.map((val) => (
    <div> {val} </div>
   ))}
  </div>
 );
}
