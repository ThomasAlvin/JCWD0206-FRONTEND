import {
  Box,
  Button,
  Flex,
  Icon,
  Img,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../assets/spotify-logo3.png";
import {
  AiFillAlert,
  AiFillHeart,
  AiFillHome,
  AiFillPlusSquare,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import "../css/sidebar.css";
import { VscLibrary } from "react-icons/vsc";
import { useState } from "react";
import axios from "axios";
import { CreatePlaylist } from "./Modal";
export default function Sidebar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lightup, setLightup] = useState("home");
  const selected = ["home", "search", "library"];
  const [isilagu, setIsilagu] = useState([]);
  const [semuaLagu, setSemuaLagu] = useState([]);
  const [counter, setCounter] = useState(1);
  function lightupicon(props) {
    const { id, value } = props.target;
    setLightup(id);

    // console.log(props);
    console.log(id);
  }
  async function fetchData(page) {
    await axios
      .get("http://localhost:2000/musics?_limit=5&_page=" + page)
      .then((res) => {
        console.log(res.data);
        setIsilagu(res.data);
      });
    await axios.get("http://localhost:2000/musics").then((res) => {
      console.log(res.data);
      setSemuaLagu(res.data);
    });
  }
  return (
    <>
      <Flex
        id="sidebarbox"
        left={0}
        position={"fixed"}
        maxW={"25vw"}
        minW={"25vw"}
        w={"3930px"}
        backgroundColor={"blackAlpha.900"}
      >
        <Flex flexDir={"column"} w={"100%"}>
          <Flex pt={"23px"} pl={"23px"}>
            <Img src={logo} w={"130px"} h={"40px"}></Img>
          </Flex>
          <Box h={"30px"}></Box>
          <Flex flexDir={"column"} gap={"10px"}>
            <Flex pl={"23px"} cursor={"pointer"}>
              <Box>
                {/* <Icon
                  className="menu"
                  id="home"
                  h={"30px"}
                  w={"30px"}
                  as={AiFillHome}
                  color={lightup == "home" ? "white" : "gray"}
                > */}
                {/* <AiFillHome
                    size={25}
                    color={lightup == "home" ? "white" : "gray"}
                  /> */}
                {/* </Icon> */}
                <AiFillHome
                  size={25}
                  id="home"
                  onClick={lightupicon}
                  color={lightup == "home" ? "white" : "gray"}
                />
              </Box>
              <Flex
                color={"white"}
                pl={"15px"}
                fontSize={"14px"}
                fontWeight={"bold"}
                alignItems={"center"}
              >
                Home
              </Flex>
            </Flex>
            <Flex pl={"23px"} cursor={"pointer"}>
              <Box onClick={lightupicon}>
                <Icon as="" className="menu" id="search" h={"30px"} w={"30px"}>
                  <AiOutlineSearch
                    size={25}
                    color={lightup == "search" ? "white" : "gray"}
                  />
                </Icon>
              </Box>
              <Flex
                color={"white"}
                pl={"15px"}
                fontSize={"14px"}
                fontWeight={"bold"}
                alignItems={"center"}
              >
                Search
              </Flex>
            </Flex>
            <Flex pl={"23px"} onClick={lightupicon} cursor={"pointer"}>
              <Icon
                as={VscLibrary}
                color={lightup == "search" ? "white" : "grey"}
                h={"30px"}
                w={"30px"}
                id="search"
              ></Icon>
              <Flex
                color={"white"}
                pl={"15px"}
                fontSize={"14px"}
                fontWeight={"bold"}
                alignItems={"center"}
              >
                Your Library
              </Flex>
            </Flex>
            <Flex
              pl={"23px"}
              onClick={() => {
                onOpen();
                fetchData(counter);
              }}
              cursor={"pointer"}
              pt={"20px"}
            >
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <CreatePlaylist
                    isilagu={isilagu}
                    onClose={onClose}
                    setCounter={setCounter}
                    counter={counter}
                    fetchData={fetchData}
                    semuaLagu={semuaLagu}
                  />
                </ModalContent>
              </Modal>
              <Icon
                as={AiFillPlusSquare}
                color={lightup == "search" ? "white" : "grey"}
                h={"30px"}
                w={"30px"}
                id="search"
              ></Icon>
              <Flex
                color={"white"}
                pl={"15px"}
                fontSize={"14px"}
                fontWeight={"bold"}
                alignItems={"center"}
                onClick={() => {
                  onOpen();
                  fetchData(counter);
                }}
              >
                Create My Playlist
              </Flex>
            </Flex>
            <Flex pl={"23px"} onClick={lightupicon} cursor={"pointer"}>
              <Icon
                as={AiFillHeart}
                color={lightup == "search" ? "white" : "grey"}
                h={"30px"}
                w={"30px"}
                id="search"
              ></Icon>
              <Flex
                color={"white"}
                pl={"15px"}
                fontSize={"14px"}
                fontWeight={"bold"}
                alignItems={"center"}
              >
                Liked songs
              </Flex>
            </Flex>

            <Flex
              pt={"20px"}
              pl={"23px"}
              color={"white"}
              fontSize={"14px"}
              alignItems={"center"}
            >
              My Playlist #1
            </Flex>
            <Flex
              pl={"23px"}
              color={"white"}
              fontSize={"14px"}
              alignItems={"center"}
            >
              My Playlist #2
            </Flex>
            <Flex
              pl={"23px"}
              color={"white"}
              fontSize={"14px"}
              alignItems={"center"}
            >
              My Playlist #3
            </Flex>
            <Flex
              pl={"23px"}
              color={"white"}
              fontSize={"14px"}
              alignItems={"center"}
            >
              My Playlist #4
            </Flex>
            <Flex
              pl={"23px"}
              color={"white"}
              fontSize={"14px"}
              alignItems={"center"}
            >
              My Playlist #5
            </Flex>
            <Flex
              pl={"23px"}
              onClick={lightupicon}
              cursor={"pointer"}
              pt={"140px"}
            >
              <Icon
                as={BsDownload}
                color={lightup == "search" ? "white" : "grey"}
                h={"25px"}
                w={"25px"}
                id="search"
              ></Icon>
              <Flex
                color={"white"}
                pl={"15px"}
                fontSize={"14px"}
                fontWeight={"bold"}
                alignItems={"center"}
              >
                Install app
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
