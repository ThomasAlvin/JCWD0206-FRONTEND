import {
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Input,
  Textarea,
  Center,
  Box,
  Button,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { api } from "../api/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function LogoutModal(props) {
  const toast = useToast();
  const dispatch = useDispatch();
  const nav = useNavigate();
  function logout() {
    window.location.reload();
    localStorage.removeItem("auth");
    dispatch({
      type: "logout",
    });
    return;
  }
  return (
    <>
      <Flex
        bgColor={"white"}
        maxW={"524px"}
        // maxH={'389px'}
        w={"524px"}
        h="100%"
        borderRadius={"5px"}
        flexDir={"column"}
        pb="20px"
      >
        <Flex
          justifyContent={"space-between"}
          w="100%"
          fontSize="24px"
          padding={"24px 24px 24px 24px"}
        >
          <Flex fontWeight={"bold"}>Login</Flex>
          <Flex>
            <Icon
              h={"36px"}
              w={"36px"}
              as={IoMdClose}
              color="#87878"
              cursor={"pointer"}
              onClick={() => props.onClose()}
            ></Icon>
          </Flex>
        </Flex>
        <Flex padding={"24px 24px 24px 24px"}>
          Apakah anda yakin ingin logout akun?
        </Flex>

        <Flex p={"24px"} gap={"40px"}>
          <Center
            borderRadius={"5px"}
            fontWeight={"600"}
            bgColor={"#7aebff"}
            h="48px"
            w="400px"
            cursor={"pointer"}
            onClick={logout}
            color={"white"}
          >
            LOGOUT
          </Center>
          <Center
            borderRadius={"5px"}
            fontWeight={"600"}
            bgColor={"red"}
            h="48px"
            w="400px"
            cursor={"pointer"}
            color={"white"}
            onClick={() => props.onClose()}
          >
            BATAL
          </Center>
        </Flex>
      </Flex>
    </>
  );
}
