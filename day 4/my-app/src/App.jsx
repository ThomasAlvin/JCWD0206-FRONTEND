import logo from './logo.svg';
import './App.css';
import Profile, { Propicts, Data } from './components/Profile';
import Band from './components/Band';

const App = () => {
 const judul = 'welcome to jungle';
 function laler() {
  alert('hello');
 }
 return (
  <div>
   <h1 style={{ color: 'red', fontFamily: 'sans-serif', paddingLeft: '10px' }}>
    Halo Warga Batam!
   </h1>
   <h1 className="judul">{judul}</h1>
   <button style={{ marginLeft: '10px' }} onClick={laler}>
    ok
   </button>

   <Profile color="blue" fontSize="40px" />
   <Propicts value={judul} />
   <Data />

   <Band />
  </div>
 );
};

export default App;
