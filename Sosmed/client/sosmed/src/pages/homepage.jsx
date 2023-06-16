import { Flex, Center, Img, Icon, Box, Avatar } from "@chakra-ui/react";
import logo from "../assets/images/instagram-text-logo.png";
import logo2 from "../assets/images/Googleplay.png";
import logo3 from "../assets/images/Instagram-logo.jpeg";

import { FiCamera } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import Card from "../components/card";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import { api } from "../api/api";

export default function HomePage() {
  const [liked, setLiked] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    api
      .get("/post")
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <Center pb={"50px"}>
        <Center
          flexDir={"column"}
          border={"1px #dbdbdb solid"}
          minW={"500px"}
          w={"500px"}
          maxW={"500px"}
        >
          <Flex alignItems={"center"}>
            <Img src={logo} width={"150px"} h={"60px"}></Img>
            <Box w={"300px"} h={"50px"}></Box>
            <Flex w={"100px"} gap={"20px"}>
              <Icon as={AiOutlineHeart} fontSize={"30px"}></Icon>
              <Icon as={AiOutlineMessage} fontSize={"30px"}></Icon>
            </Flex>
          </Flex>
          <Flex gap={"10px"} maxW={"500px"} borderBottom={"1px #dbdbdb solid"}>
            <Avatar border={"1px pink solid"} size={"lg"} src={logo3}></Avatar>
            <Avatar border={"1px pink solid"} size={"lg"} src={logo2}></Avatar>
            <Avatar border={"1px pink solid"} size={"lg"} src={logo3}></Avatar>
            <Avatar border={"1px pink solid"} size={"lg"} src={logo3}></Avatar>
            <Avatar border={"1px pink solid"} size={"lg"} src={logo3}></Avatar>

            <Avatar border={"1px pink solid"} size={"lg"} src={logo2}></Avatar>
            <Avatar border={"1px pink solid"} size={"lg"} src={logo}></Avatar>
          </Flex>
          <Flex flexDir={"column"}>
            {posts.map((val) => {
              return (
                <Card
                  media={val.media_url}
                  id={val.id}
                  title={val.title}
                  caption={val.caption}
                  posterId={val.userId}
                />
              );
            })}
          </Flex>
        </Center>
        <Footer />
      </Center>
    </>
  );
}
