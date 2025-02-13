import {
  Button,
  Center,
  Flex,
  Icon,
  IconButton,
  Img,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import logo from "../assets/images/instagram-logo.png";
import logo2 from "../assets/images/Googleplay.png";
import logo3 from "../assets/images/Microsoft.png";
import { useNavigate } from "react-router-dom";
import { BsApple, BsFacebook, BsGift, BsGoogle } from "react-icons/bs";
import { api } from "../api/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
  const [seePassword, setSeePassword] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const [login, setLogin] = useState({
    emus: "",
    password: "",
  });
  const nav = useNavigate();
  function inputHandler(input) {
    const { value, id } = input.target;
    const tempobject = { ...login };
    tempobject[id] = value;
    setLogin(tempobject);
    console.log(tempobject);
  }
  return (
    <>
      <Center flexDir={"column"} gap={"10px"} pt={"10px"}>
        <Center flexDir={"column"} gap={"80px"}>
          <Center flexDir={"column"}>
            <Center minW={"700px"} w={"700px"} gap={"12px"} flexDir={"column"}>
              <Center
                minW={"500px"}
                w={"500px"}
                flexDir={"column"}
                border={"1px solid #dbdbdb"}
              >
                <Img src={logo} width={"300px"}></Img>
                <Center gap={"10px"} flexDir={"column"}>
                  <Input
                    w={"300px"}
                    fontSize={"12px"}
                    bgColor={"#fafafa"}
                    placeholder="Email or Phone Number"
                    pl={"15px"}
                    onChange={inputHandler}
                    id="emus"
                  ></Input>
                  <InputGroup>
                    <Input
                      id="password"
                      onChange={inputHandler}
                      fontSize={"12px"}
                      type={seePassword ? "text" : "password"}
                      border={"1px #878787 solid"}
                      placeholder="Create your password"
                    ></Input>
                    <InputRightElement width={"2.5rem"} h={"100%"}>
                      <IconButton
                        colorScheme="whiteAlpha"
                        color={"grey"}
                        as={seePassword ? AiOutlineEye : AiOutlineEyeInvisible}
                        w={"24px"}
                        h={"24px"}
                        onClick={() => setSeePassword(!seePassword)}
                        cursor={"pointer"}
                      ></IconButton>
                    </InputRightElement>
                  </InputGroup>
                  <Button
                    color={"white"}
                    borderRadius={"10px"}
                    w={"100%"}
                    colorScheme="cyan"
                    onClick={async () => {
                      try {
                        let token;
                        await api.post("/auth/v2", login).then((res) => {
                          localStorage.setItem(
                            "auth",
                            JSON.stringify(res.data.token)
                          );
                          token = res.data.token;
                          toast({
                            title: res.data.message,
                            description: "Login Successful.",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                          });
                        });
                        api.get("/auth/v3?token=" + token).then((res) => {
                          console.log(res.data);
                          dispatch({
                            type: "login",
                            payload: res.data,
                          });
                        });
                        nav("/homepage");
                      } catch (err) {
                        console.log(err);
                        alert(err.message);
                      }
                    }}
                  >
                    Login
                  </Button>
                  <Center gap={"10px"}>
                    <Flex
                      h={"2px"}
                      w={"130px"}
                      bgColor={"blackAlpha.300"}
                    ></Flex>
                    <Flex>OR</Flex>
                    <Flex
                      h={"2px"}
                      w={"130px"}
                      bgColor={"blackAlpha.300"}
                    ></Flex>
                  </Center>
                  <Flex gap={"10px"}>
                    <Icon as={BsFacebook} fontSize={"24px"}></Icon>
                    <Flex alignItems={"center"}>Login With Facebook</Flex>
                  </Flex>
                  <Flex
                    pb={"24px"}
                    fontSize={"12px"}
                    className="forgot-password"
                    onClick={() => nav("/forgot-password/request")}
                  >
                    Forgot password?
                  </Flex>
                </Center>
              </Center>
              <Center
                minW={"500px"}
                w={"500px"}
                flexDir={"column"}
                border={"1px solid #dbdbdb"}
                paddingY={"20px"}
              >
                <Flex fontSize={"14px"}>
                  Don't Have An Account?{" "}
                  <Flex
                    fontSize={"14px"}
                    color={"#0bc5ea"}
                    cursor={"pointer"}
                    onClick={() => nav("/register")}
                  >
                    &nbsp;Sign Up
                  </Flex>
                </Flex>
              </Center>
              <Center>Get The App</Center>
              <Flex gap={"10px"}>
                <Img src={logo2} width={"130px"} h={"40px"}></Img>
                <Img src={logo3} width={"130px"} h={"40px"}></Img>
              </Flex>
            </Center>
          </Center>
          <Center
            minW={"1000px"}
            w={"1000px"}
            color={"blackAlpha.700"}
            gap={"16px"}
          >
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Meta
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              About
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Blog
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Jobs
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Help
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              API
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Privacy
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Terms
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Top Accounts
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Locations
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Instagram Lite
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Contact Uploading & Non-Users
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Meta Verified
            </Flex>
          </Center>
        </Center>
        <Center
          minW={"1000px"}
          w={"1000px"}
          color={"blackAlpha.700"}
          gap={"20px"}
        >
          <Flex fontSize={"13px"}> English</Flex>
          <Flex fontSize={"13px"}> © 2023 Instagram from Meta</Flex>
        </Center>
      </Center>
    </>
  );
}
