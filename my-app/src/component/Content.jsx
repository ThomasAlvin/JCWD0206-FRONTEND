import {
  Box,
  Button,
  Flex,
  Icon,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import "../css/content.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
export default function Content(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const userSelector = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(props?.data);
  }, [[props.data]]);

  const arr = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuLhyroBTNf-wDwwPQdALP7ABQLCYUKt70Ag&usqp=CAU",
      name: "Wolf in sheeps's clothing",
      creator: "Killerx",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdrEvz9Po_hAgSeJrFkmmZdpU-6C3vtnjukA&usqp=CAU",
      name: "Hymn for the weekend",
      creator: "Jonstorn",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI9ASfG1pIVWBeRiiGllFoWhkMWhIQLp3dAg&usqp=CAU",
      name: "All eyes on me",
      creator: "Maxer",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEDCuoHYVMgvU_Q52dvTZKiiHjQ3qzLstqPQ&usqp=CAU",
      name: "Build our machine",
      creator: "Critikal",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEDCuoHYVMgvU_Q52dvTZKiiHjQ3qzLstqPQ&usqp=CAU",
      name: "Build our machine",
      creator: "Critikal",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEDCuoHYVMgvU_Q52dvTZKiiHjQ3qzLstqPQ&usqp=CAU",
      name: "Build our machine",
      creator: "Critikal",
    },
  ];
  return (
    <>
      <Flex bgColor={"#121212"} flexDir={"column"} pl={"25vw"}>
        <Flex
          bgColor={"#121212"}
          fontSize={"22px"}
          color={"white"}
          fontWeight={"bold"}
          pl={"30px"}
          pt={"20px"}
        >
          Recently played
        </Flex>
        <Flex
          pt={"20px"}
          pl={"30px"}
          id="cardgrid"
          bgColor={"#121212"}
          display={"grid"}
          gridTemplateColumns={"19% 19% 19% 19%"}
          gap={"3px"}
        >
          {props.data.map((val, idx) => {
            return <Card {...val} setPlaylist={props.setPlaylist} />;
          })}
        </Flex>
        <Flex
          bgColor={"#121212"}
          fontSize={"22px"}
          color={"white"}
          fontWeight={"bold"}
          pl={"30px"}
          pt={"20px"}
        >
          Your shows
        </Flex>
        <Flex
          pt={"20px"}
          pl={"30px"}
          id="cardgrid"
          bgColor={"#121212"}
          display={"grid"}
          gridTemplateColumns={"19% 19% 19% 19%"}
          gap={"3px"}
        >
          {arr.map((val, idx) => {
            return <Card {...val} setPlaylist={props.setPlaylist} />;
          })}
        </Flex>
      </Flex>
    </>
  );
}
function Card(props) {
  return (
    <Flex id="card">
      <Flex bgColor={"#181818"} flexDir={"column"} w={"190px"} h={"300px"}>
        <Flex id="bungkus" onClick={() => props?.setPlaylist(props.list)}>
          <Flex id="image" width={"100%"} height={"200px"}>
            <img src={props.image} />
          </Flex>
        </Flex>
        <Flex pl={"15px"} color={"white"} fontWeight={"bold"}>
          {props.name?.length > 18
            ? props.name.slice(0, 18) + "..."
            : props.name}
        </Flex>
        <Flex pl={"15px"} color={"gray.400"}>
          {props.creator}
        </Flex>
      </Flex>
    </Flex>
  );
}
