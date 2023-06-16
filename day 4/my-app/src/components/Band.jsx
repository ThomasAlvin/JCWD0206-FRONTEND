import gambarBand from "./band.jpg";
export default function Band() {
  const data = [
    {
      url: "https://asset.kompas.com/crops/W4P3no-vmu-9GnsCWwybHDufncM=/120x34:4222x2768/750x500/data/photo/2021/04/18/607ba95f8d6f7.jpg",
      name: "fahmi",
    },
    {
      url: "https://asset.kompas.com/crops/W4P3no-vmu-9GnsCWwybHDufncM=/120x34:4222x2768/750x500/data/photo/2021/04/18/607ba95f8d6f7.jpg",
      name: "fahmi2",
    },
    {
      url: "https://asset.kompas.com/crops/W4P3no-vmu-9GnsCWwybHDufncM=/120x34:4222x2768/750x500/data/photo/2021/04/18/607ba95f8d6f7.jpg",
      name: "fahmi3",
    },
  ];
  return (
    <div id="img-band">
      {data.map((val) => (
        <Member url={val.url} name={val.name} keysOK={() => ok(val.name)} />
      ))}
    </div>
  );
}

function Member(props) {
  return (
    <div class="member">
      <img src={props.url} alt="member" width="100%" height="100%" />
      <div>{props.name}</div>
    </div>
  );
}
