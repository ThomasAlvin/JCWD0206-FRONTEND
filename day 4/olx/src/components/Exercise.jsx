export default function Test() {
  const arr = [
    {
      image:
        "https://apollo-singapore.akamaized.net/v1/files/wjvzyfkfv8e83-ID/image;s=300x600;q=60",
      price: 100000,
      year: 1990,
      merek: "Hondo",
    },
    {
      image:
        "https://apollo-singapore.akamaized.net/v1/files/fwj58jphyrd43-ID/image;s=300x600;q=60",
      price: 200000,
      year: 1999,
      merek: "Hondo",
    },
    {
      image:
        "https://apollo-singapore.akamaized.net/v1/files/hrxvqwlckqif2-ID/image;s=300x600;q=60",
      price: 300000,
      year: 1998,
      merek: "Hondo",
    },
    {
      image:
        "https://apollo-singapore.akamaized.net/v1/files/4xmwy7uegq2n-ID/image;s=300x600;q=60",
      price: 400000,
      year: 1997,
      merek: "Hondo",
    },
    {
      image:
        "https://apollo-singapore.akamaized.net/v1/files/iorruan30w9q3-ID/image;s=300x600;q=60",
      price: 500000,
      year: 1996,
      merek: "Hondo",
    },
    {
      image:
        "https://apollo-singapore.akamaized.net/v1/files/bx82csqgghcb-ID/image;s=300x600;q=60",
      price: 600000,
      year: 1995,
      merek: "Hondo",
    },
    {
      image:
        "https://apollo-singapore.akamaized.net/v1/files/w86rksvi0h3l-ID/image;s=300x600;q=60",
      price: 700000,
      year: 1994,
      merek: "Hondo",
    },
    {
      image:
        "https://apollo-singapore.akamaized.net/v1/files/1tm71xxiex9w1-ID/image;s=300x600;q=60",
      price: 800000,
      year: 1993,
      merek: "Hondo",
    },
    {
      image:
        "https://apollo-singapore.akamaized.net/v1/files/fnvzfx6omjoh1-ID/image;s=300x600;q=60",
      price: 900000,
      year: 1992,
      merek: "Hondo",
    },
    {
      image:
        "https://apollo-singapore.akamaized.net/v1/files/yfc8csjs9xgz-ID/image;s=300x600;q=60",
      price: 10000000000,
      year: 2000,
      merek: "Hondo",
    },
  ];

  return (
    <div className="lol">
      <div className="juduls">Berdasarkan Pencarian Terakhir Anda</div>
      <div className="grid">
        {arr.map((val, idx) => (
          <Desc {...val} />
        ))}
      </div>
    </div>
  );
}

function Desc(props) {
  return (
    <div>
      <div
        className="logo2"
        style={!props.highlight ? { justifyContent: "end" } : null}
      ></div>
      <div className="bungkus">
        <div className="product-image">
          <img src={props.image} alt="member" />
        </div>
        <div className="kuning">
          <div className="product-price">
            Rp{parseInt(props.price).toLocaleString("id-ID")}
          </div>
          <div className="product-year">{props.year}</div>
          <div className="product-merek">{props.merek}</div>
        </div>
      </div>
    </div>
  );
}
