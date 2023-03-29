import logo from '../assets/olx-logo.png.png';
import jual from '../assets/olx-jual.png.png';

export default function Navbar() {
 return (
  <div className="navbar">
   <div className="container">
    <div className="flex" style={{ gap: '20px' }}>
     <div className="logo">
      <img src={logo} alt="" width="42px" height="24px" />
     </div>

     <div className=" flex" id="location">
      <div className="input-icon">
       <i className="fa fa-search icon"></i>
       <input type="text" placeholder="Cari kota,area, atau lokal" />
       <i className="fa fa-angle-up icon arrow fa-lg"></i>
      </div>
     </div>

     <div className="input-icon strech" id="search">
      <input
       type="text"
       name=""
       id=""
       className="input-search"
       placeholder="Temukan Mobil, Handphone, dan lainnya ..."
      />
      <i className="fa fa-search logo search fa-lg"></i>
     </div>
    </div>

    <div style={{ display: 'flex' }}>
     <div className="login desktop">Login/daftar</div>
     <div className="jual desktop">
      <img height="100%" width="109px" src={jual} alt="" />
     </div>
    </div>
   </div>
  </div>
 );
}
