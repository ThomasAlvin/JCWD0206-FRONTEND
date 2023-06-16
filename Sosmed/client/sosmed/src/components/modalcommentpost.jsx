import { Avatar, Center, Flex, Icon } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { RiShareBoxFill } from "react-icons/ri";

import { useNavigate } from "react-router-dom";
import CommentCard from "./commentcard";

export default function ModalComment(props) {
  const nav = useNavigate();
  return (
    <>
      <Flex flexDir={"column"} pt={"15px"}>
        <Flex
          pb={"20px"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Flex gap={"20px"}>
            <Icon
              onClick={() => props.onClose()}
              cursor={"pointer"}
              fontSize={"34px"}
              as={BsArrowLeft}
            ></Icon>
            <Flex fontSize={"20px"} fontWeight={"700"}>
              Comments
            </Flex>
          </Flex>
          <Flex w={"260px"}></Flex>
          <Icon fontSize={"30px"} as={RiShareBoxFill}></Icon>
        </Flex>
        <Flex
          gap={"5px"}
          borderBottom={"1px solid #e3e2de"}
          pb={"10px"}
          pr={"10px"}
        >
          <Avatar></Avatar>
          <Flex flexDir={"column"}>
            <span style={{ fontWeight: "500", fontSize: "14px" }}>
              lokerbatam info
              <span style={{ fontSize: "12px", color: "#a0aec0" }}>
                &nbsp;&nbsp;&nbsp;2 days ago
              </span>
            </span>
            <span style={{ overflowWrap: "anywhere" }}>
              {" "}
              &nbsp;Loker batam di Laundrymat
            </span>
          </Flex>
        </Flex>
        <CommentCard />
        <CommentCard />
      </Flex>
    </>
  );
}
