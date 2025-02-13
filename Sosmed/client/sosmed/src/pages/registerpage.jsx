import {
  Box,
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
import * as Yup from "yup";
import YupPassword from "yup-password";
import { Formik, useFormik } from "formik";
import { BsApple, BsFacebook, BsGift, BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/api";
import { TbAlertCircleFilled } from "react-icons/tb";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function RegisterPage() {
  const [seepassword, setSeePassword] = useState(false);
  const [seepassword2, setSeePassword2] = useState(false);

  const toast = useToast();
  const [radioValue, setRadioValue] = useState("Male");
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password2: "",
      password: "",
      username: "",
      fullname: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("You need to enter your email")
        .email("Email is not valid"),
      fullname: Yup.string().required("You need to enter your semail"),
      password2: Yup.string()
        .required("You need to confirm your password")
        .oneOf([Yup.ref("password")], "Passwords don't match"),
      password: Yup.string()
        .required("You need to enter your password")
        .minUppercase(
          1,
          "Your password needs atleast 1 uppercase letter, 1 number, and 1 symbol with atleast 8 characters"
        )
        .minNumbers(
          1,
          "Your password needs atleast 1 uppercase letter, 1 number, and 1 symbol with atleast 8 characters"
        )
        .minSymbols(
          1,
          "Your password needs atleast 1 uppercase letter, 1 number, and 1 symbol with atleast 8 characters"
        )
        .min(
          8,
          "Your password needs atleast 1 uppercase letter, 1 number, and 1 symbol with atleast 8 characters"
        ),
      username: Yup.string().required("You need to enter your username"),
    }),
    onSubmit: async () => {
      const { email, password, username, fullname } = formik.values;
      const account = { email, password, username, fullname };

      const checkemail = await api
        .get("/auth/email?email=" + email)
        .then((res) => {
          if (res.data) {
            return true;
          } else {
            return false;
          }
        });
      console.log(checkemail);
      if (checkemail) {
        alert("Email has been used");
        formik.values.email = "";
      } else {
        await api.post("/auth", account).then(() => {
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          nav("/login");
        });
      }
    },
  });
  const [register, setRegister] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
  });
  function inputHandler(input) {
    const { value, id } = input.target;
    const tempobject = { ...register };
    tempobject[id] = value;
    setRegister(tempobject);
    formik.setFieldValue(id, value);
    console.log(formik.values);
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
                <Center
                  maxW={"300px"}
                  fontSize={"18px"}
                  color={"blackAlpha.700"}
                  textAlign={"center"}
                  fontWeight={"500"}
                  pb={"10px"}
                >
                  Sign up to see photos and videos from your friends
                </Center>
                <Center pb={"20px"}>
                  <Button
                    color={"white"}
                    borderRadius={"10px"}
                    w={"300px"}
                    colorScheme="cyan"
                    gap={"5px"}
                  >
                    <Icon as={BsFacebook} fontSize={"20px"}></Icon>
                    <Flex alignItems={"center"}>Login With Facebook</Flex>
                  </Button>
                </Center>
                <Center gap={"10px"}>
                  <Flex h={"2px"} w={"130px"} bgColor={"blackAlpha.300"}></Flex>
                  <Flex>OR</Flex>
                  <Flex h={"2px"} w={"130px"} bgColor={"blackAlpha.300"}></Flex>
                </Center>
                <Center gap={"10px"} flexDir={"column"} pt={"10px"} w={"300px"}>
                  <Input
                    w={"300px"}
                    fontSize={"12px"}
                    bgColor={"#fafafa"}
                    placeholder="Email or Phone Number"
                    pl={"7px"}
                    id="email"
                    onChange={inputHandler}
                  ></Input>

                  <Flex w={"100%"} fontSize={"12px"} color={"red"}>
                    {formik.errors.email}
                  </Flex>
                  <Input
                    w={"300px"}
                    fontSize={"12px"}
                    bgColor={"#fafafa"}
                    placeholder="fullname"
                    pl={"7px"}
                    id="fullname"
                    onChange={inputHandler}
                  ></Input>
                  <Flex w={"100%"} fontSize={"12px"} color={"red"}>
                    {formik.errors.fullname}
                  </Flex>
                  <Input
                    w={"300px"}
                    fontSize={"12px"}
                    bgColor={"#fafafa"}
                    placeholder="Username"
                    pl={"7px"}
                    id="username"
                    onChange={inputHandler}
                  ></Input>
                  <Flex w={"100%"} fontSize={"12px"} color={"red"}>
                    {formik.errors.username}
                  </Flex>
                  <InputGroup>
                    <Input
                      pl={"7px"}
                      id="password"
                      onChange={inputHandler}
                      bgColor={"#fafafa"}
                      fontSize={"12px"}
                      type={seepassword2 ? "text" : "password"}
                      placeholder="Create your password"
                      paddingY={"8px"}
                    ></Input>
                    <InputRightElement width={"2.5rem"} h={"100%"}>
                      <IconButton
                        colorScheme="whiteAlpha"
                        color={"grey"}
                        as={seepassword2 ? AiOutlineEye : AiOutlineEyeInvisible}
                        w={"32px"}
                        h={"32px"}
                        onClick={() => setSeePassword2(!seepassword2)}
                        cursor={"pointer"}
                      ></IconButton>
                    </InputRightElement>
                  </InputGroup>
                  <Flex w={"300px"} fontSize={"12px"} color={"red"}>
                    {formik.errors.password}
                  </Flex>
                  <InputGroup>
                    <Input
                      pl={"7px"}
                      fontSize={"12px"}
                      bgColor={"#fafafa"}
                      id="password2"
                      onChange={inputHandler}
                      type={seepassword ? "text" : "password"}
                      placeholder="Create your password"
                      paddingY={"8px"}
                    ></Input>
                    <InputRightElement width={"2.5rem"} h={"100%"}>
                      <IconButton
                        colorScheme="whiteAlpha"
                        color={"grey"}
                        as={seepassword ? AiOutlineEye : AiOutlineEyeInvisible}
                        w={"32px"}
                        h={"32px"}
                        onClick={() => setSeePassword(!seepassword)}
                        cursor={"pointer"}
                      ></IconButton>
                    </InputRightElement>
                  </InputGroup>
                  <Flex w={"100%"} fontSize={"12px"} color={"red"}>
                    {formik.errors.password2}
                  </Flex>
                  <Center textAlign={"center"} fontSize={"12px"} maxW={"300px"}>
                    <Flex>
                      <span>
                        People who use our service may have uploaded your
                        contact information to Instagram.
                        {/* <Flex> Learn More</Flex> */}
                        <a
                          href="http://instagram.com"
                          style={{ color: "#0bc5ea" }}
                        >
                          <span>Learn More</span>
                        </a>
                      </span>
                    </Flex>
                  </Center>
                  <Center textAlign={"center"} fontSize={"12px"} maxW={"300px"}>
                    <span>
                      {" "}
                      By signing up, you agree to our{" "}
                      <a style={{ color: "#0bc5ea", cursor: "pointer" }}>
                        Terms,{" "}
                      </a>
                      <a style={{ color: "#0bc5ea", cursor: "pointer" }}>
                        Privacy Policy
                      </a>
                      <span> and </span>
                      <a style={{ color: "#0bc5ea", cursor: "pointer" }}>
                        Cookies Policy
                      </a>{" "}
                    </span>
                  </Center>
                  <Flex pb={"20px"} w={"100%"}>
                    <Button
                      color={"white"}
                      borderRadius={"10px"}
                      w={"100%"}
                      colorScheme="cyan"
                      onClick={formik.handleSubmit}
                    >
                      Sign Up
                    </Button>
                  </Flex>
                </Center>
              </Center>

              <Center>Get The App</Center>
              <Flex gap={"10px"}>
                <Img
                  cursor={"pointer"}
                  src={logo2}
                  width={"130px"}
                  h={"40px"}
                ></Img>
                <Img
                  cursor={"pointer"}
                  src={logo3}
                  width={"130px"}
                  h={"40px"}
                ></Img>
              </Flex>
            </Center>
          </Center>
          <Center flexWrap={"wrap"} color={"blackAlpha.700"} gap={"16px"}>
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
        <Center color={"blackAlpha.700"} gap={"20px"}>
          <Flex fontSize={"13px"}> English</Flex>
          <Flex fontSize={"13px"}> © 2023 Instagram from Meta</Flex>
        </Center>
      </Center>
    </>
  );
}
