import {
  Avatar,
  Flex,
  Center,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Img,
} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineEllipsis, AiOutlineHeart } from "react-icons/ai";
import { FaEllipsisV } from "react-icons/fa";
import { HiOutlineEllipsisVertical } from "react-icons/hi";
import { TbMessageCircle2 } from "react-icons/tb";
import { GrShare } from "react-icons/gr";
import { BsBookmark } from "react-icons/bs";
import { useEffect, useState } from "react";
import ModalComment from "./modalcommentpost";
import { api } from "../api/api";
import { useSelector } from "react-redux";

export default function Card(props) {
  const userSelector = useSelector((state) => state.login.auth);
  const [liked, setLiked] = useState(true);
  const [allLiked, setAllLiked] = useState({});
  const [poster, setPoster] = useState({});
  const [postLike, setPostLike] = useState();

  const [likeDetails, setLikeDetails] = useState({
    userId: userSelector.id,
    liked: true,
    postId: props.id,
  });
  useEffect(() => {
    console.log(typeof props.posterId);
    api.get("/like/").then((res) => {
      setAllLiked(res.data);
      console.log(props.posterId);
      api.get(`/auth/getbyId/${props.posterId}`).then((res) => {
        setPoster(res.data);
        console.log(res.data);
      });
      api.get(`/like/getlike/${props.id}`).then((res) => {
        setPostLike(res.data);
        console.log(res.data);
        console.log(postLike);
      });
    });
  }, []);
  const modalComment = useDisclosure();
  return (
    <>
      <Flex
        flexDir={"column"}
        maxW={"500px"}
        borderBottom={"1px solid #dbdbdb "}
        pb={"20px"}
      >
        <Flex
          alignItems={"center"}
          paddingY={"10px"}
          minW={"500px"}
          w={"500px"}
          maxW={"500px"}
          pl={"5px"}
        >
          <Flex alignItems={"center"} gap={"10px"}>
            <Avatar w={"45px"} h={"45px"}></Avatar>
            <Flex fontWeight={700}>{poster.fullname} </Flex>
            <Flex
              onClick={() => {
                console.log(props);
                console.log(allLiked);
              }}
              fontSize={"12px"}
              color={"blackAlpha.600"}
            >
              {" "}
              1&nbsp;day&nbsp;ago
            </Flex>
          </Flex>
          <Flex w={"290px"} h={"100%"}></Flex>

          <Flex pr={"10px"}>
            <Icon
              borderRadius={"50px"}
              as={AiOutlineEllipsis}
              fontSize={"28px"}
              onClick={() => {
                console.log(likeDetails);
              }}
            ></Icon>
          </Flex>
        </Flex>
        <Img src={props.media} w={"100%"} h={"400px"}></Img>
        <Flex gap={"12px"} pt={"10px"}>
          <Icon
            as={!liked ? AiFillHeart : AiOutlineHeart}
            fontSize={"32px"}
            color={!liked ? "red" : "black"}
            onClick={async () => {
              await api.post("/like/v1", likeDetails).then(() => {
                setLikeDetails({
                  userId: userSelector.id,
                  liked: !liked,
                  postId: props.id,
                });

                setLiked(!liked);
              });
            }}
          ></Icon>
          <Icon as={TbMessageCircle2} fontSize={"30px"}></Icon>
          <Icon as={GrShare} fontSize={"26px"}></Icon>
          <Flex w={"330px"} h={"100%"}>
            {" "}
          </Flex>
          <Icon as={BsBookmark} fontSize={"28px"}></Icon>
        </Flex>
        <Flex fontWeight={"500"}>{postLike?.count} likes</Flex>

        <Flex w={"100%"} pb={"10px"}>
          <span>
            <span style={{ fontWeight: "500", alignItems: "center" }}>
              {" "}
              {poster.fullname}
            </span>
            <span style={{ overflowWrap: "anywhere", fontWeight: "600" }}>
              &nbsp;{props.title}
            </span>
            <span style={{ overflowWrap: "anywhere" }}>
              &nbsp;{props.caption}
            </span>
          </span>
          {/* sndjfsdjfdshkjfsdhkfjsdhkfjshdfjksdhfjkshdfjkshdkfjshdkfhsdkjfhsdkjfhdskjfhsdkjfhsdkjfshdjk */}
        </Flex>
        <Flex
          onClick={() => modalComment.onOpen()}
          fontSize={"14px"}
          color={"blackAlpha.600"}
          cursor={"pointer"}
        >
          View all 163 comments
        </Flex>
      </Flex>
      <Modal
        isOpen={modalComment.isOpen}
        onClose={modalComment.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalComment onClose={modalComment.onClose} />
        </ModalContent>
      </Modal>
    </>
  );
}
