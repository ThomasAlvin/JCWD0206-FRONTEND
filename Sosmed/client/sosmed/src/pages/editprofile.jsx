import {
  Flex,
  Center,
  Icon,
  Avatar,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { HiX } from "react-icons/hi";
import { GrCheckmark } from "react-icons/gr";
import { IoMdCheckmark } from "react-icons/io";

import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { api } from "../api/api";

export default function EditProfile() {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.login.auth);
  const nav = useNavigate();
  const [changes, setChanges] = useState({});
  function inputHandler(input) {
    const { value, id } = input.target;
    const tempobject = { ...changes };
    tempobject[id] = value;
    setChanges(tempobject);
    console.log(tempobject);
  }
  async function saveChanges() {
    try {
      await api
        .get("/auth/username?username=" + changes.username)
        .then(async (res) => {
          await api
            .patch("/auth/update/" + userSelector.id, changes)
            .then(async () => {
              const token = JSON.parse(localStorage.getItem("auth"));
              console.log(token);
              const user = await api
                .get("/auth/v3?token=" + token)
                .then((res) => {
                  console.log(res.data);
                  return res.data;
                });
              console.log(user);
              if (user?.email) {
                dispatch({
                  type: "login",
                  payload: user,
                });
              }
              alert("Perubahan Berhasil");
              nav("/profilepage");
            });
        });
    } catch (err) {
      alert("username telah dipakai");
    }
  }
  return (
    <>
      <Center>
        <Flex
          border={"1px #dbdbdb solid"}
          minW={"500px"}
          w={"500px"}
          maxW={"500px"}
          flexDir={"column"}
          pt={"10px"}
          pb={"50px"}
          pl={"15px"}
          pr={"15px"}
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex gap={"25px"} alignItems={"center"}>
              <Icon
                onClick={() => nav("/profilepage")}
                cursor={"pointer"}
                fontSize={"34px"}
                as={HiX}
              ></Icon>
              <Flex fontSize={"22px"}>EditProfile</Flex>
            </Flex>

            <Icon
              cursor={"pointer"}
              color={"#0bc5ea"}
              fontSize={"28px"}
              as={IoMdCheckmark}
              onClick={() => saveChanges()}
            ></Icon>
          </Flex>
          <Center flexDir={"column"}>
            <Avatar w={"60px"} h={"60px"}></Avatar>
            <Flex cursor={"pointer"} color={"#0bc5ea"}>
              Edit picture or avatar
            </Flex>
          </Center>
          <Flex gap={"5px"} flexDir={"column"}>
            <Flex flexDir={"column"} borderBottom={"solid black 1px"}>
              <Flex fontSize={"16px"} color={"blackAlpha.600"}>
                Name
              </Flex>

              <Input
                id="fullname"
                onChange={inputHandler}
                placeholder={userSelector.fullname}
                fontSize={"20px"}
                pb={"5px"}
              ></Input>
            </Flex>
            <Flex flexDir={"column"} borderBottom={"solid black 1px"}>
              <Flex fontSize={"16px"} color={"blackAlpha.600"}>
                Username
              </Flex>
              <Input
                id="username"
                onChange={inputHandler}
                placeholder={userSelector.username}
                fontSize={"20px"}
                pb={"5px"}
              ></Input>
            </Flex>
            <Flex flexDir={"column"} borderBottom={"solid black 1px"}>
              <Flex fontSize={"16px"} color={"blackAlpha.600"}>
                Pronouns
              </Flex>
              <Input
                onChange={inputHandler}
                placeholder={userSelector.pronouns}
                fontSize={"20px"}
                pb={"5px"}
              ></Input>
            </Flex>
            <Flex flexDir={"column"}>
              <Flex fontSize={"16px"} color={"blackAlpha.600"}>
                Bio
              </Flex>
              <Textarea
                id="bio"
                onChange={inputHandler}
                placeholder={userSelector.bio}
                fontSize={"16px"}
                pb={"5px"}
              ></Textarea>
              <Flex
                fontSize={"16px"}
                color={"blackAlpha.600"}
                borderTop={"solid black 1px"}
              >
                0/150
              </Flex>
            </Flex>
            <Flex flexDir={"column"} borderBottom={"solid black 1px"}>
              <Flex fontSize={"16px"} color={"blackAlpha.600"}>
                Gender
              </Flex>
              <Select
                id="gender"
                fontSize={"20px"}
                pb={"5px"}
                onChange={inputHandler}
              >
                <option
                  value={userSelector.gender}
                  style={{ display: "none" }}
                  color="grey"
                >
                  {userSelector.gender}
                </option>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
              </Select>
            </Flex>
          </Flex>
        </Flex>
        <Footer />
      </Center>
    </>
  );
}
