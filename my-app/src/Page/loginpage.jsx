import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import logo from "../assets/spotify-logo2.png";
import { BsApple, BsFacebook, BsGift, BsGoogle } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import axios from "axios";
import { userLogin } from "../redux/middleware/userauth";
import { auth_types } from "../redux/types";
export default function LoginPage(props) {
  const [seePassword, setSeePassword] = useState(false);
  const [validation, setValidation] = useState(true);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  function inputHandler(input) {
    const { value, id } = input.target;
    const tempobject = { ...account };
    tempobject[id] = value;
    setAccount(tempobject);
    console.log(tempobject);
  }

  async function login() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const status = await dispatch(userLogin(account));
    console.log(email);
    if (status) {
      console.log(dispatch(userLogin(account)));
      return nav("/");
    } else {
      email.value = "";
      password.value = "";
      setValidation(false);
    }
  }
  return (
    <>
      <Center>
        <Flex flexDir={"column"} pb={"60px"}>
          <Center paddingBottom={"25px"} paddingTop={"20px"}>
            <img src={logo} alt="spotify" width={"143px"} />
          </Center>
          <Box bgColor={"gray.200"} w={"100vw"} h={"1px"}></Box>
          <Center>
            <Flex
              flexDir={"column"}
              gap={"10px"}
              paddingTop={"20px"}
              w={"450px"}
            >
              <Center paddingTop={"29px"} fontSize={"14px"} fontWeight={"bold"}>
                <Box>To continue,log in to spotify</Box>
              </Center>
              <Center>
                <Button
                  w={"450px"}
                  h={"48px"}
                  colorScheme="blue"
                  borderRadius={"50px"}
                  gap={"10px"}
                >
                  <Icon w={"30px"} h={"20px"} as={BsFacebook}></Icon>
                  CONTINUE WITH FACEBOOK
                </Button>
              </Center>
              <Center>
                <Button
                  w={"450px"}
                  h={"48px"}
                  backgroundColor="black"
                  color={"white"}
                  borderRadius={"50px"}
                  gap={"10px"}
                >
                  <Icon w={"30px"} h={"20px"} as={BsApple}></Icon>
                  CONTINUE WITH APPLE
                </Button>
              </Center>
              <Center>
                <Button
                  w={"450px"}
                  h={"48px"}
                  colorScheme="white"
                  borderRadius={"50px"}
                  gap={"10px"}
                  border={"grey 1px solid"}
                  color="grey"
                >
                  <Icon w={"30px"} h={"20px"} as={FcGoogle}></Icon>
                  CONTINUE WITH GOOGLE
                </Button>
              </Center>
              <Center>
                <Button
                  w={"450px"}
                  h={"48px"}
                  colorScheme="white"
                  borderRadius={"50px"}
                  gap={"10px"}
                  border={"grey 1px solid"}
                  color="grey"
                >
                  CONTINUE WITH PHONE NUMBER
                </Button>
              </Center>
              <Center>
                <Flex alignItems={"center"} gap={"20px"} fontWeight={"bold"}>
                  <Box bgColor={"gray.200"} h={"1px"} w={"195px"}></Box>
                  OR
                  <Box bgColor={"gray.200"} h={"1px"} w={"195px"}></Box>
                </Flex>
              </Center>

              <Box fontSize={"14px"} fontWeight={"bold"}>
                Email address or username
              </Box>

              <Input
                type="text"
                h={"48px"}
                border={"1px black solid"}
                onChange={inputHandler}
                id="email"
                backgroundColor={account.email ? "blue.50" : "white"}
              ></Input>

              <Box fontSize={"14px"} fontWeight={"bold"}>
                Password
              </Box>
              <InputGroup>
                <Input
                  type={seePassword ? "text" : "password"}
                  h={"48px"}
                  border={"1px black solid"}
                  onChange={inputHandler}
                  id="password"
                  backgroundColor={account.password ? "blue.50" : "white"}
                ></Input>
                <InputRightElement w={"60px"} h={"100%"}>
                  <IconButton
                    colorScheme="whiteAlpha"
                    color={"grey"}
                    as={seePassword ? AiOutlineEye : AiOutlineEyeInvisible}
                    w={"32px"}
                    h={"32px"}
                    onClick={() => setSeePassword(!seePassword)}
                    cursor={"pointer"}
                  ></IconButton>
                </InputRightElement>
              </InputGroup>
              <Box
                color={"red"}
                display={validation ? "none" : "block"}
                style={
                  validation ? { fontSize: "50px" } : { transition: "width 2s" }
                }
              >
                Incorrect email or password
              </Box> 
              <Box
                textDecoration={"underline"}
                fontWeight={"bold"}
                fontSize={"16px"}
              >
                Forgot your Password?
              </Box>
              <Flex justifyContent={"space-between"} pb={"10px"}>
                <Checkbox colorScheme="green"> Remember me</Checkbox>
                <Button
                  borderRadius={"50px"}
                  colorScheme="whatsapp"
                  w={"121px"}
                  h={"48px"}
                  color={"black"}
                  onClick={login}
                >
                  {" "}
                  LOG IN
                </Button>
              </Flex>
              <Box bgColor={"gray.200"} h={"2px"}></Box>
              <Center fontSize={"17px"} fontWeight={"bold"} pt={"15px"}>
                Don't have an account?
              </Center>
              <Flex
                justifyContent={"center"}
                pt={"15px"}
                borderRadius={"50px"}
                colorScheme="white"
                color={"gray"}
                border={"1px grey solid"}
                h={"55px"}
                fontWeight={"bold"}
                onClick={() => nav("/register")}
              >
                {" "}
                SIGN UP FOR SPOTIFY
              </Flex>
            </Flex>
          </Center>
        </Flex>
      </Center>
    </>
  );
}
