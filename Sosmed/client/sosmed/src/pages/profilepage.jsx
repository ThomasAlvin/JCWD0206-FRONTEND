import {
  Flex,
  Center,
  Icon,
  Avatar,
  Button,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Img,
} from "@chakra-ui/react";
import { BsPlusSquare } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxHamburgerMenu, RxAvatar } from "react-icons/rx";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineGridOn } from "react-icons/md";

import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import ModalComment from "../components/modalcommentpost";
import ModalAddPost from "../components/modaladdpost";
import { LogoutModal } from "../components/modallogout";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function ProfilePage() {
  const userSelector = useSelector((state) => state.login.auth);
  const [post, setPost] = useState([]);
  const modalAddPost = useDisclosure();
  const nav = useNavigate();
  const modalLogout = useDisclosure();
  async function Verify() {
    await api
      .get("auth/generate-token/emailverify", {
        params: {
          email: userSelector.email,
        },
      })
      .then(
        (res) => alert(res.data.message)
        // /forgot-password/token
        //    console.log(res.data));
      );
  }
  useEffect(() => {
    api
      .get("/post/userId/" + userSelector.id)
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <Center>
        <Flex
          pt={"15px"}
          pl={"15px"}
          border={"1px #dbdbdb solid"}
          minW={"500px"}
          w={"500px"}
          maxW={"500px"}
          flexDir={"column"}
          pr={"15px"}
        >
          <Flex
            pb={"20px"}
            fontWeight={"700"}
            fontSize={"20px"}
            alignItems={"center"}
          >
            {userSelector.fullname}
            <Flex w={"100%"}></Flex>
            <Flex gap={"20px"} alignItems={"center"}>
              <Icon
                cursor={"pointer"}
                fontSize={"25px"}
                as={BsPlusSquare}
                onClick={() => modalAddPost.onOpen()}
              ></Icon>
              <Icon
                fontSize={"32px"}
                cursor={"pointer"}
                as={RxHamburgerMenu}
                onClick={() => modalLogout.onOpen()}
              ></Icon>
            </Flex>
            <Flex></Flex>
          </Flex>
          <Flex>
            <Flex flexDir={"column"} alignItems={"center"}>
              <Avatar
                src={userSelector.avatar_url}
                w={"80px"}
                h={"80px"}
              ></Avatar>
            </Flex>
            <Flex
              justifyContent={"space-evenly"}
              w={"100%"}
              alignItems={"center"}
            >
              <Flex flexDir={"column"} alignItems={"center"}>
                <Flex fontWeight={"700"}>100</Flex>
                <Flex>Post</Flex>
              </Flex>
              <Flex flexDir={"column"} alignItems={"center"}>
                <Flex fontWeight={"700"}>2000</Flex>
                <Flex>Followers</Flex>
              </Flex>
              <Flex flexDir={"column"} alignItems={"center"}>
                <Flex fontWeight={"700"}>20</Flex>
                <Flex>Following</Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex fontWeight={"500"} pb={"25px"}>
            {userSelector.fullname}
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Button onClick={() => nav("/EditProfile")} w={"200px"}>
              Edit Profile
            </Button>
            <Button w={"200px"} onClick={Verify}>
              Verify Account
            </Button>

            <Button>
              <Icon fontSize="24px" as={AiOutlineUserAdd}></Icon>
            </Button>
          </Flex>
          <Flex fontWeight={"500"}>Story&nbsp;Highlights</Flex>
          <Flex pb={"10px"}> Keep your favourite stories on your profile</Flex>
          <Flex gap={"15px"} pb={"40px"}>
            <Avatar w={"60px"} h={"60px"}></Avatar>
            <Avatar w={"60px"} h={"60px"}></Avatar>
            <Avatar w={"60px"} h={"60px"}></Avatar>
            <Avatar w={"60px"} h={"60px"}></Avatar>
            <Avatar w={"60px"} h={"60px"}></Avatar>
            <Avatar w={"60px"} h={"60px"}></Avatar>
          </Flex>
          <Flex justifyContent={"space-evenly"} w={"100%"} pb={"5px"}>
            <Flex
              flexDir={"column"}
              w={"100%"}
              alignItems={"center"}
              gap={"5px"}
            >
              <Icon
                cursor={"pointer"}
                fontSize={"24px"}
                as={MdOutlineGridOn}
              ></Icon>
              <Flex w={"100%"} borderBottom={"2px black solid"}></Flex>
            </Flex>
            <Flex
              flexDir={"column"}
              w={"100%"}
              alignItems={"center"}
              gap={"5px"}
            >
              <Icon
                cursor={"pointer"}
                color={"#dbdbdb"}
                fontSize={"24px"}
                as={RxAvatar}
              ></Icon>
              <Flex w={"100%"} borderBottom={"2px #dbdbdb solid"}></Flex>
            </Flex>
          </Flex>
          <Flex pb={"50px"}>
            <Grid gridTemplateColumns={"repeat(3,1fr)"} w="100%">
              {post.map((val) => (
                <Img
                  src={val.media_url}
                  cursor={"pointer"}
                  border={"4px white solid"}
                ></Img>
              ))}
            </Grid>
          </Flex>
        </Flex>
        <Footer />
      </Center>
      <Modal
        isOpen={modalAddPost.isOpen}
        onClose={modalAddPost.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxH="500px" h={"500px"} maxW="700px">
          <ModalAddPost onClose={modalAddPost.onClose} />
        </ModalContent>
      </Modal>
      <Modal
        isOpen={modalLogout.isOpen}
        onClose={modalLogout.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <LogoutModal onClose={modalLogout.onClose} />
        </ModalContent>
      </Modal>
    </>
  );
}
