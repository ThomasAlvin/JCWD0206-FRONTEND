import { Flex, Icon, Center, Avatar } from "@chakra-ui/react";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsPlusSquare } from "react-icons/bs";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const nav = useNavigate();
  const location = useLocation();
  return (
    <>
      <Flex
        bottom={"0"}
        position={"fixed"}
        minW={"500px"}
        w={"500px"}
        maxW={"500px"}
      >
        <Flex
          fontSize={"30px"}
          bgColor={"white"}
          w={"100vw"}
          justifyContent={"space-evenly"}
          paddingY={"10px"}
        >
          <Icon
            cursor={"pointer"}
            as={
              location.pathname.split("/")[1] == "homepage"
                ? AiFillHome
                : AiOutlineHome
            }
            onClick={() => nav("/homepage")}
          ></Icon>
          <Icon cursor={"pointer"} as={BiSearch}></Icon>
          <Icon cursor={"pointer"} as={BsPlusSquare}></Icon>
          <Icon cursor={"pointer"} as={MdOutlineVideoLibrary}></Icon>
          <Avatar
            cursor={"pointer"}
            w={"30px"}
            h={"30px"}
            onClick={() => nav("/profilepage")}
          ></Avatar>
        </Flex>
      </Flex>
    </>
  );
}
