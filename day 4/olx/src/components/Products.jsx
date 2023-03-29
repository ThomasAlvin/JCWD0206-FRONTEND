export function Products() {
 const data = [
  {
   url: 'https://apollo-singapore.akamaized.net/v1/files/fbtl120e4dpu-ID/image;s=272x0',
   price: 575000000,
   year: 2022,
   name: 'Honda crv turbo prestige black',
   location: 'Tebet, Jakarta',
   date: '18 Mar',
   highlight: true
  },
  {
   url: 'https://apollo-singapore.akamaized.net/v1/files/u87ggs9vpjuz-ID/image;s=300x600;q=60',
   price: 323000000,
   year: 2023,
   name: 'Mobil Baru Hyundai',
   location: 'Cilandak, Jakarta Selatan',
   date: '16 Mar',
   highlight: true
  },
  {
   url: 'https://apollo-singapore.akamaized.net/v1/files/9afemfau9re73-ID/image;s=780x0;q=60',
   price: 160000000,
   year: 2013,
   name: 'vw golf tsi 2013',
   location: 'Cilandak, Jakarta Selatan',
   date: '16 Mar',
   highlight: true
  },
  {
   url: 'https://apollo-singapore.akamaized.net/v1/files/bbyqx0n62ncr3-ID/image;s=300x600;q=60',
   price: 2500000000,
   year: 2022,
   name: 'BMW 840i Coupe 2022 ISTIMEWA',
   location: 'Kebayon, Jakarta Selatan',
   date: '16 Mar',
   highlight: true
  },
  {
   url: 'https://apollo-singapore.akamaized.net/v1/files/qq117p3ibpmn3-ID/image;s=780x0;q=60',
   price: 2650000000,
   year: 2022,
   name: 'BMW 840i Coupe Msport 2023 NIK',
   location: 'Cilandak, Jakarta Selatan',
   date: '16 Mar',
   highlight: false
  },
  {
   url: 'https://apollo-singapore.akamaized.net/v1/files/p9sl9tf6oup2-ID/image;s=780x0;q=60',
   price: 2745000000,
   year: 2020,
   name: 'HARGA KHUSUS KREDITLANDROVER DEFENDER 110 DIESEL',
   location: 'Cilandak, Jakarta Selatan',
   date: '16 Mar',
   highlight: false
  },
  {
   url: 'https://apollo-singapore.akamaized.net/v1/files/pvnipnltn4de1-ID/image;s=780x0;q=60',
   price: 2250000000,
   year: 2020,
   name: 'Mercedes Benz GLS450AMG 2020',
   location: 'Cilandak, Jakarta Selatan',
   date: '16 Mar',
   highlight: false
  },
  {
   url: 'https://apollo-singapore.akamaized.net/v1/files/po1fwt86c99v-ID/image;s=780x0;q=60',
   price: 150000000,
   year: 2015,
   name: 'Honda Cr-V (2015)',
   location: 'Batam',
   date: '16 Mar',
   highlight: false
  },
  {
   url: 'https://apollo-singapore.akamaized.net/v1/files/1auldq9w3f1w-ID/image;s=780x0;q=60',
   price: 149000000,
   year: 2017,
   name: 'VW Polo GTI 1.2 Turbo AT 2017',
   location: 'Batam',
   date: '16 Mar',
   highlight: false
  },
  {
   url: 'https://apollo-singapore.akamaized.net/v1/files/epvrhhrxk8b33-ID/image;s=780x0;q=60',
   price: 120000000,
   year: 2001,
   name: '‼️FOR SALE‼️',
   location: 'Batam',
   date: '16 Mar',
   highlight: false
  }
 ];
 return (
  <>
   <div className="banner"></div>
   <div
    className="flex"
    style={{
     justifyContent: 'center',
     padding: '10px 0px 20px 0px',
     alignItems: 'center',
     width: '100vw',
     display: 'flex',
     flexDirection: 'column',
     fontFamily:
      "Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans','Helvetica Neue' sans-serif"
    }}
   >
    <div className="recommend">Rekomendasi Baru</div>
    <div className="products">
     {data.map((val, idx) => (
      <Card key={'product_' + idx} {...val} number={idx + 1} />
     ))}
    </div>
   </div>
  </>
 );
}

function Card(props) {
 return (
  <div className="card">
   <div
    className="logo2"
    style={!props.highlight ? { justifyContent: 'end' } : null}
   >
    <div className={props.highlight ? 'highlight' : 'hidden'}>HIGHLIGHT</div>
    <i className="fa fa-heart-o fa-lg"></i>
   </div>
   <div className="product-image">
    <img src={props.url} alt="" />
   </div>

   <div
    className={'border-yellow'}
    style={props.number > 4 ? { borderColor: 'white' } : null}
   >
    <div className="sub-product">
     <div className="product-harga">
      Rp {parseInt(props.price).toLocaleString('id-ID')}
     </div>
     <div className="product-year">{props.year}</div>

     <div className="product-name">
      {props.name.length > 29
       ? props.name.substring(0, 27) + '....'
       : props.name}
     </div>

     <div className="product-footer">
      <div>{props.location}</div>
      <div>{props.date}</div>
     </div>
    </div>
   </div>
  </div>
 );
}
