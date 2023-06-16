import {
  Avatar,
  Box,
  Flex,
  Icon,
  Img,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import logo from "../assets/images/Googleplay.png";
import { HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../api/api";
import { useState } from "react";
export default function ModalAddPost(props) {
  const toast = useToast();
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.login.auth);
  const [users, setUsers] = useState([]);
  const [postDetail, setPostDetail] = useState({
    title: "",
    caption: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const fetchData = async () => {
    try {
      const response = await api.get("/auth/getAll");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  function inputHandler(input) {
    const { value, id } = input.target;
    const tempobject = { ...postDetail };
    tempobject[id] = value;
    setPostDetail(tempobject);
    console.log(tempobject);
  }
  const handleFileChange = (event, id) => {
    setSelectedFile(event.target.files[0]);
  };

  async function uploadAvatar(file) {
    try {
      console.log(file);

      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("title", postDetail.title);
      formData.append("caption", postDetail.caption);
      formData.append("userId", userSelector.id);

      console.log(formData);

      await api.post("/post/image/v2", formData).then(async (res) => {
        // alert(res.data);

        window.location.reload();
      });

      setSelectedFile(null);

      fetchData();
    } catch (err) {
      setSelectedFile(null);
    }
  }
  return (
    <>
      <Flex h>
        <Flex flexDir={"column"} pt={"10px"}>
          <Flex justifyContent={"space-between"} px={"10px"}>
            <Icon
              cursor={"pointer"}
              onClick={() => props.onClose()}
              as={HiX}
              fontSize={"24px"}
            ></Icon>
            <Box>Create new post</Box>
            <Box
              onClick={() => {
                uploadAvatar(selectedFile);
              }}
              color={"cyan"}
            >
              Share
            </Box>
          </Flex>
          <Flex w={"700px"} h={"400px"}>
            <Input
              accept="image/png, image/gif, image/jpeg"
              w={"70%"}
              h={"100%"}
              type="file"
              onChange={(e) => {
                // console.log(e.target.files[0]);
                // console.log(selectedFile);
                handleFileChange(e, userSelector.id);
              }}
            ></Input>
            <Flex w={"30%"} flexDir={"column"} border={"1px solid #e3e2de "}>
              <Flex alignItems={"center"} gap={"5px"} pl={"10px"}>
                <Avatar
                  src={userSelector.avatar_url}
                  w={"25px"}
                  h={"25px"}
                ></Avatar>
                <Flex fontSize={"10px"} fontWeight={"600"}>
                  {userSelector.fullname}
                </Flex>
              </Flex>
              <Input
                id="title"
                pl={"10px"}
                variant={"unstyled"}
                placeholder="Insert your title"
                onChange={inputHandler}
              ></Input>
              <Textarea
                id="caption"
                pl={"10px"}
                h={"100%"}
                borderTop={"1px solid #e3e2de"}
                placeholder="Write a caption"
                onChange={inputHandler}
              ></Textarea>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
