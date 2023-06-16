import { Avatar, Flex, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function CommentCard() {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Flex gap={"5px"} pb={"10px"} justifyContent={"space-between"}>
        <Flex gap={"5px"}>
          <Avatar></Avatar>
          <Flex flexDir={"column"}>
            <span style={{ fontWeight: "500", fontSize: "14px" }}>
              Terizla findriyanti
              <span style={{ fontSize: "12px", color: "#a0aec0" }}>
                &nbsp;&nbsp;&nbsp;1 days ago
              </span>
            </span>
            <span style={{ overflowWrap: "anywhere" }}> Haiya</span>
          </Flex>
        </Flex>

        <Flex pt={"20px"} pr={"20px"}>
          <Icon
            fontSize={"24px"}
            onClick={() => {
              setLiked(!liked);
            }}
            color={liked ? "red" : "black"}
            as={liked ? AiFillHeart : AiOutlineHeart}
          ></Icon>
        </Flex>
      </Flex>
    </>
  );
}
