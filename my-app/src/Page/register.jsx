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
  Radio,
  RadioGroup,
  Select,
  Toast,
  useToast,
} from "@chakra-ui/react";
import logo from "../assets/spotify-logo2.png";
import { BsFacebook, BsGoogle } from "react-icons/bs";
import { TbAlertCircleFilled } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { Formik, useFormik } from "formik";
import axios from "axios";
export default function RegisterPage() {
  const toast = useToast();
  const [radioValue, setRadioValue] = useState("Male");
  YupPassword(Yup);
  const nav = useNavigate();
  const months = [
    {
      name: "January",
      number: 1,
    },
    {
      name: "February",
      number: 2,
    },
    {
      name: "March",
      number: 3,
    },
    {
      name: "April",
      number: 4,
    },
    {
      name: "May",
      number: 5,
    },
    {
      name: "June",
      number: 6,
    },
    {
      name: "July",
      number: 7,
    },
    {
      name: "August",
      number: 8,
    },
    {
      name: "September",
      number: 9,
    },
    {
      name: "October",
      number: 10,
    },
    {
      name: "November",
      number: 11,
    },
    {
      name: "December",
      number: 12,
    },
  ];

  const formik = useFormik({
    initialValues: {
      email: "",
      email2: "",
      password: "",
      username: "",
      day: 0,
      month: 0,
      year: 0,
      gender: "",
      marketingmessage: "",
      datamarketing: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("You need to enter your email")
        .email("this is not a valid email"),
      email2: Yup.string()
        .required("You need to confirm your email")
        .oneOf([Yup.ref("email")], "Email addresses don't match"),
      password: Yup.string()
        .required(
          <Flex>
            <Center>Please enter your password</Center>
          </Flex>
        )
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
      day: Yup.number()
        .lessThan(32, "Must be less than 32")
        .moreThan(
          0,
          <Flex>
            <Center>
              {" "}
              <Icon as={TbAlertCircleFilled} w={"16px"} h={"16px"}></Icon>
              <Box>Enter a valid date</Box>
            </Center>
          </Flex>
        ),

      month: Yup.number().moreThan(
        0,
        <Flex>
          <Center>
            {" "}
            <Icon as={TbAlertCircleFilled} w={"16px"} h={"16px"}></Icon>
            <Box>Enter a valid Month</Box>
          </Center>
        </Flex>
      ),
      year: Yup.number()
        .lessThan(2023, "Enter a valid year")
        .moreThan(
          0,
          <Flex>
            <Center>
              {" "}
              <Icon as={TbAlertCircleFilled} w={"16px"} h={"16px"}></Icon>
              <Box>Enter a valid Year</Box>
            </Center>
          </Flex>
        ),
    }),
    onSubmit: async () => {
      const { email, password, username, day, month, year, gender } =
        formik.values;
      const account = { email, password, username, gender };
      account.birthdate = new Date(year, month, day);
      const user = { ...formik.values };
      user.birthdate = new Date(user.year, user.month, user.day);
      const checkemail = await axios
        .get("http://localhost:2000/user", { params: { Email: account.email } })
        .then((res) => {
          if (res.data.length) {
            console.log(res.data);
            return true;
          } else {
            return false;
          }
        });
      if (checkemail) {
        alert("email has been used");
      } else {
        await axios.post("http://localhost:2000/user", account).then(() => {
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          nav("/login");
        });
      }
    },
  });

  const [seepassword, setSeePassword] = useState(false);
  function inputHandler(event) {
    const { value, id } = event.target;
    console.log(value);
    console.log(event);
    formik.setFieldValue(id, value);
  }
  function radioInputHandler(value) {
    const id = "gender";
    console.log(value);

    formik.setFieldValue(id, value);
  }
  function numberHandler(event) {
    var { value, id, maxLength } = event.target;
    if (value.length >= maxLength) {
      event.target.value = value.slice(0, maxLength);
      value = value.slice(0, maxLength);
      console.log(value);
      formik.setFieldValue(id, value);
    } else {
      console.log(value);
      formik.setFieldValue(id, value);
    }
  }
  return (
    <>
      {" "}
      <Flex justifyContent={"center"}>
        <Flex flexDir={"column"} pt={"40px"} w={"450px"}>
          <Flex gap={"30px"} flexDir={"column"}>
            <Center>
              <img src={logo} alt="spotify" width={"143px"} />
            </Center>
            <Center fontSize={"26px"} fontWeight={"700"}>
              Sign up for free to start listening
            </Center>
            <Center>
              <Button
                colorScheme="facebook"
                h={"50px"}
                w={"400px"}
                borderRadius={"50px"}
                gap={"20px"}
              >
                <Icon as={BsFacebook} h={"24px"} w={"24px"} />
                Sign up with Facebook
              </Button>
            </Center>
            <Center>
              <Button
                h={"50px"}
                w={"400px"}
                borderRadius={"50px"}
                gap={"20px"}
                colorScheme="white"
                border={"2px black solid"}
                color={"grey.100"}
              >
                <Icon as={FcGoogle} h={"24px"} w={"24px"} />
                Sign up with Google
              </Button>
            </Center>
            <Center gap={"20px"}>
              <Box h="1px" bgColor={"grey"} w={"170px"}></Box>
              <Box> OR</Box>
              <Box h="1px" bgColor={"grey"} w={"170px"}></Box>
            </Center>
          </Flex>
          <Flex fontWeight={700} fontSize={"14px"} pt={"15px"}>
            What's your email?
          </Flex>
          <Flex pt={"10px"}>
            <Input
              id="email"
              onChange={inputHandler}
              border={"1px #878787 solid"}
              placeholder="Enter your email"
              h={"48px"}
              paddingY={"8px"}
            ></Input>
          </Flex>
          <Flex
            fontSize={"14px"}
            color={"red"}
            alignItems={"center"}
            gap={"5px"}
            pt={"5px"}
          >
            <Icon
              as={TbAlertCircleFilled}
              h={"20px"}
              w={"20px"}
              display={formik.errors.email ? "block" : "none"}
            ></Icon>{" "}
            {formik.errors.email}{" "}
          </Flex>

          <Flex
            textDecor={"underline"}
            color={"green.700"}
            fontSize={"14px"}
            fontWeight={500}
          >
            Use phone number instead
          </Flex>
          <Flex fontWeight={700} fontSize={"14px"} pt={"20px"}>
            Confirm your email
          </Flex>
          <Flex pt={"10px"}>
            <Input
              id="email2"
              onChange={inputHandler}
              border={"1px #878787 solid"}
              placeholder="Enter your email again"
              h={"48px"}
              paddingY={"8px"}
            ></Input>
          </Flex>
          <Flex
            fontSize={"14px"}
            color={"red"}
            alignItems={"center"}
            gap={"5px"}
            pt={"5px"}
          >
            <Icon
              as={TbAlertCircleFilled}
              h={"20px"}
              w={"20px"}
              display={formik.errors.email2 ? "block" : "none"}
            ></Icon>{" "}
            {formik.errors.email2}{" "}
          </Flex>
          <Flex fontWeight={700} fontSize={"14px"} pt={"20px"}>
            Create a password
          </Flex>
          <Flex pt={"10px"}>
            <InputGroup>
              <Input
                id="password"
                onChange={inputHandler}
                type={seepassword ? "text" : "password"}
                border={"1px #878787 solid"}
                placeholder="Create your password"
                h={"48px"}
                paddingY={"8px"}
              ></Input>
              <InputRightElement width={"3.5rem"} h={"100%"}>
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
          </Flex>
          <Flex
            fontSize={"14px"}
            color={"red"}
            alignItems={"center"}
            gap={"5px"}
            pt={"5px"}
          >
            <Icon
              as={TbAlertCircleFilled}
              h={"20px"}
              w={"20px"}
              display={formik.errors.password ? "block" : "none"}
            ></Icon>{" "}
            {formik.errors.password}{" "}
          </Flex>
          <Flex fontWeight={700} fontSize={"14px"} pt={"20px"}>
            What should we call you?
          </Flex>
          <Flex pt={"10px"}>
            <Input
              id="username"
              onChange={inputHandler}
              border={"1px #878787 solid"}
              placeholder="Enter a profile name"
              h={"48px"}
              paddingY={"8px"}
            ></Input>
          </Flex>
          <Flex
            fontSize={"14px"}
            color={"red"}
            alignItems={"center"}
            gap={"5px"}
            pt={"5px"}
          >
            <Icon
              as={TbAlertCircleFilled}
              h={"20px"}
              w={"20px"}
              display={formik.errors.username ? "block" : "none"}
            ></Icon>{" "}
            {formik.errors.username}{" "}
          </Flex>
          <Flex fontSize={"14px"} fontWeight={"500"} pt={"10px"}>
            This appears on your profile
          </Flex>
          <Flex fontWeight={700} fontSize={"14px"} pt={"20px"}>
            What's your date of birth?
          </Flex>
          <Flex gap={"20px"} pt={"10px"}>
            <Flex flexDir={"column"} gap={"10px"}>
              <Flex fontSize={"14px"} fontWeight={"500"}>
                Day
              </Flex>
              <Flex>
                <Input
                  id="day"
                  maxLength={2}
                  onChange={numberHandler}
                  h={"48px"}
                  placeholder="DD"
                  w={"90px"}
                  border={"1px solid black"}
                ></Input>
              </Flex>
            </Flex>
            <Flex flexDir={"column"} gap={"10px"}>
              <Flex fontSize={"14px"} fontWeight={"500"}>
                Month
              </Flex>
              <Flex>
                <Select
                  w={"202px"}
                  border={"1px solid black"}
                  h={"48px"}
                  id="month"
                  onChange={inputHandler}
                >
                  <option value={0} style={{ display: "none" }} color="grey">
                    Month
                  </option>
                  {months.map((val) => {
                    return <option value={val.number}>{val.name}</option>;
                  })}
                </Select>
              </Flex>
            </Flex>
            <Flex flexDir={"column"} gap={"10px"}>
              <Flex fontSize={"14px"} fontWeight={"500"}>
                Year
              </Flex>
              <Flex>
                <Input
                  id="year"
                  maxLength={4}
                  onChange={numberHandler}
                  placeholder="YYYY"
                  w={"112px"}
                  border={"1px solid black"}
                  h={"48px"}
                ></Input>
              </Flex>
            </Flex>
          </Flex>
          <Flex color={"red"}>{formik.errors.day}</Flex>
          <Flex color={"red"}>{formik.errors.month}</Flex>
          <Flex color={"red"}>{formik.errors.year}</Flex>
          <Flex fontWeight={700} fontSize={"14px"} pt={"20px"}>
            What's your gender?
          </Flex>
          <RadioGroup
            pt={"10px"}
            id="gender"
            value={radioValue}
            defaultValue="Male"
            onChange={(val) => {
              setRadioValue(val);
              radioInputHandler(val);
            }}
          >
            <Flex flexDir={"column"} gap={"12px"}>
              <Flex gap={"30px"} fontSize={"14px"}>
                <Radio border={"1px #878787 solid"} value="Male">
                  <Flex fontSize={"14px"} fontWeight={"500"}>
                    Male
                  </Flex>
                </Radio>
                <Radio border={"1px #878787 solid"} value="Female">
                  <Flex fontSize={"14px"} fontWeight={"500"}>
                    Female
                  </Flex>
                </Radio>
                <Radio border={"1px #878787 solid"} value="Non-binary">
                  <Flex fontSize={"14px"} fontWeight={"500"}>
                    Non-binary
                  </Flex>
                </Radio>
                <Radio border={"1px #878787 solid"} value="Other">
                  <Flex fontSize={"14px"} fontWeight={"500"}>
                    Other
                  </Flex>
                </Radio>
              </Flex>
              <Flex>
                <Radio border={"1px #878787 solid"} value="Prefer-not-to-say">
                  <Flex fontSize={"14px"} fontWeight={"500"}>
                    Prefer not to say
                  </Flex>
                </Radio>
              </Flex>
            </Flex>
          </RadioGroup>
          <Flex pt={"30px"}>
            <Checkbox colorScheme="green">
              <Box fontSize={"14px"} fontWeight={"500"}>
                I would prefer not to receive marketing messages from Spotify
              </Box>
            </Checkbox>
          </Flex>
          <Flex pt={"30px"} gap={"10px"}>
            <Checkbox pb={"20px"} colorScheme="green"></Checkbox>
            <Box fontSize={"14px"} fontWeight={"500"}>
              Share my registration data with Spotify's content providers for
              marketing purposes.
            </Box>
          </Flex>
          <Flex flexDir={"column"} gap={"10px"} pt={"30px"}>
            <Center fontSize={"10px"}>
              By clicking on sign-up, you agree to Spotify's&nbsp;
              <Flex
                textDecor={"underline"}
                color={"green.500"}
                fontSize={"10px"}
              >
                {"   "}
                Terms and Conditions of Use
              </Flex>
            </Center>
            <Center fontSize={"10px"}>
              By clicking on sign-up, you agree to the&nbsp;
              <Flex
                textDecor={"underline"}
                color={"green.500"}
                fontSize={"10px"}
              >
                {"   "}
                Spotify Privacy Policy.
              </Flex>
            </Center>
          </Flex>
          <Center pt={"10px"}>
            {" "}
            <Button
              colorScheme="whatsapp"
              w={"159px"}
              h={"56px"}
              color={"black"}
              borderRadius={"50px"}
              fontSize={"18px"}
              fontWeight={"bold"}
              onClick={formik.handleSubmit}
            >
              Sign up
            </Button>
          </Center>
          <Center fontSize={"14px"} fontWeight={"500"} pt={"30px"}>
            Have an account?&nbsp;
            <Flex
              textDecor={"underline"}
              color={"green.500"}
              fontSize={"14px"}
              fontWeight={"500"}
              cursor={"pointer"}
              onClick={() => nav("/login")}
            >
              {"   "}
              Log in.
            </Flex>
          </Center>
          <Center h={"150px"}></Center>
        </Flex>
      </Flex>
    </>
  );
}
