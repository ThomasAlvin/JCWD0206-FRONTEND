import {
  Box,
  Center,
  Flex,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function ForgotPassword() {
  const location = useLocation();
  const [user, setUser] = useState({});
  const [token, setToken] = useState();

  async function fetchUser(token) {
    await axios
      .get("http://localhost:2000/auth/v3?token=" + token, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("lola");
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  async function changePassword() {
    await axios
      .patch("http://localhost:2000/auth/v4?token=" + token, {
        user,
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        // window.location.reload(false);
        nav("/login");
      })
      .catch((err) => {
        alert("Token has expired");
        nav("/login");
      });
  }

  useEffect(() => {
    console.log(location);
    //   "/","forgot-password", "sahkdjsahkdjsahjkdhsakjdsa"
    const token2 = location.pathname.split("/")[2]; // ini variable sementara untuk nampung
    //   ["", forgot-password , setiPkRkDCbKGZ6aYy-fq]
    //setiPkRkDCbKGZ6aYy-fq
    fetchUser(token2);
    setToken(token2);
  }, []);

  const dispatch = useDispatch();

  const nav = useNavigate();

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };
  const [seepassword, setSeePassword] = useState(false);

  return (
    <>
      {user.id ? (
        <Box w="100vw" h="100vh" bgColor={"#F2F4F7"}>
          <Center w="100%" h="100%">
            <Flex
              bgColor={"white"}
              w="300px"
              flexDir={"column"}
              padding="20px"
              gap="10px"
              borderRadius={"10px"}
            >
              <Box
                fontWeight={"500"}
                fontSize={"30px"}
                fontFamily={"sans-serif"}
              >
                Forgot Password
              </Box>

              <Box>
                <Box fontWeight={"500"} paddingBottom={"10px"}>
                  {" "}
                  New Password
                </Box>
                <InputGroup>
                  <Input
                    id="password"
                    onChange={inputHandler}
                    type={seepassword ? "text" : "password"}
                    border={"1px #878787 solid"}
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
              </Box>

              <Button
                marginTop={"25px"}
                bgColor="#035EBF"
                color={"white"}
                w="100%"
                onClick={changePassword}
              >
                Change Password
              </Button>
              {/* </Link> */}
            </Flex>
          </Center>
        </Box>
      ) : (
        <Center h="100vh">
          <h1> Link has Expired </h1>
        </Center>
      )}
    </>
  );
}

export function RequestForgotPassword() {
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  async function forgotPassword() {
    await axios
      .get("http://localhost:2000/auth/generate-token/email", {
        params: {
          email,
        },
      })
      .then(
        (res) => alert(res.data.message)
        // /forgot-password/token
        //    console.log(res.data));
      );
  }
  return (
    <Box w="100vw" h="100vh" bgColor={"#F2F4F7"}>
      <Center w="100%" h="100%">
        <Flex
          bgColor={"white"}
          w="300px"
          flexDir={"column"}
          padding="20px"
          gap="10px"
          borderRadius={"10px"}
        >
          <Box fontWeight={"500"} fontSize={"20px"} fontFamily={"sans-serif"}>
            Request Forgot Password
          </Box>

          <Box>
            <Box fontWeight={"500"} paddingBottom={"10px"}>
              {" "}
              Email
            </Box>
            <Input
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Input>
          </Box>

          <Button
            marginTop={"25px"}
            bgColor="#035EBF"
            color={"white"}
            w="100%"
            onClick={forgotPassword}
          >
            Forgot Password
          </Button>
          {/* </Link> */}
        </Flex>
      </Center>
    </Box>
  );
}
