import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Center,
  Box,
  Image,
} from "@chakra-ui/react";
import burgerIcon from "../assets/Vector.svg";
import { AiFillStar, AiOutlineMenu } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { BiSushi } from "react-icons/bi";

export default function Navbar() {
  return (
    <>
      <Flex>
        <Flex w={"100vw"}>
          <Flex pt={"32px"} pl={"40px"} gap={"20px"}>
            <Flex flexDir={"column"} gap={"16px"}>
              <Flex gap={"14px"}>
                <Center
                  border={"1px black solid"}
                  borderRadius={"8px"}
                  maxW={"48px"}
                  maxH={"48px"}
                  w={"48px"}
                  h={"48px"}
                >
                  <Image
                    cursor={"pointer"}
                    src={burgerIcon}
                    w="28px"
                    h="17px"
                  ></Image>
                </Center>
                {/* </Center> */}

                <InputGroup w={553} h={48}>
                  <Input
                    borderRadius={"8px"}
                    pl={"20px"}
                    w={"100%"}
                    border={"1px black solid"}
                    placeholder="Search menu here"
                    bgColor={"#F4F4F4"}
                    justifyContent={"center"}
                  ></Input>
                  <InputRightElement w={"60px"} h={"100%"}>
                    <Icon
                      colorScheme="whiteAlpha"
                      color={"grey"}
                      as={BsSearch}
                      boxSize={24}
                    ></Icon>
                  </InputRightElement>
                </InputGroup>
              </Flex>
              <Flex gap={"10px"}>
                <Button
                  color={"#00000066"}
                  w={"115.2px"}
                  h={"48px"}
                  borderRadius={"8px"}
                  gap={"10px"}
                  fontSize={"16px"}
                  border={"1px #00000066 solid"}
                >
                  <Icon as={AiFillStar} fontSize={"20px"}></Icon>
                  Best Seller
                </Button>
                <Button
                  color={"#00000066"}
                  w={"115.2px"}
                  h={"48px"}
                  borderRadius={"8px"}
                  gap={"10px"}
                  fontSize={"16px"}
                  border={"1px #00000066 solid"}
                >
                  <Icon as={BiSushi} fontSize={"20px"}></Icon>
                  Best Seller
                </Button>
                <Button
                  color={"#00000066"}
                  w={"115.2px"}
                  h={"48px"}
                  borderRadius={"8px"}
                  gap={"10px"}
                  fontSize={"16px"}
                  border={"1px #00000066 solid"}
                >
                  <Icon as={BsSearch} fontSize={"20px"}></Icon>
                  Best Seller
                </Button>
                <Button
                  color={"#00000066"}
                  w={"115.2px"}
                  h={"48px"}
                  borderRadius={"8px"}
                  gap={"10px"}
                  fontSize={"16px"}
                  border={"1px #00000066 solid"}
                >
                  <Icon as={BsSearch} fontSize={"20px"}></Icon>
                  Best Seller
                </Button>
                <Button
                  color={"#00000066"}
                  w={"115.2px"}
                  h={"48px"}
                  borderRadius={"8px"}
                  gap={"10px"}
                  fontSize={"16px"}
                  border={"1px #00000066 solid"}
                >
                  <Icon as={BsSearch} fontSize={"20px"}></Icon>
                  Best Seller
                </Button>
              </Flex>
              {/* <Flex
          pt={"20px"}
          pl={"30px"}
          id="cardgrid"
          bgColor={"#121212"}
          display={"grid"}
          gridTemplateColumns={"19% 19% 19% 19%"}
          gap={"3px"}
        >
          {props.data.map((val, idx) => {
            return <Card {...val} setPlaylist={props.setPlaylist} />;
          })}
        </Flex> */}
            </Flex>
            <Button
              color={"green"}
              w={"229px"}
              h={"48px"}
              borderRadius={"8px"}
              border={"1px #007237 solid"}
              fontSize={"16px"}
              fontWeight={"600 !important"}
            >
              Bill List (2)
            </Button>
            <Button
              color={"green"}
              w={"229px"}
              h={"48px"}
              borderRadius={"8px"}
              border={"1px #007237 solid"}
              fontSize={"16px"}
              fontWeight={"600 !important"}
            >
              Table
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
