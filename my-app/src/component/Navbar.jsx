import { Box, Button, Flex, Icon, Select } from "@chakra-ui/react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "../css/navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth_types } from "../redux/types";
export default function Navbar(props) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.auth);
  return (
    <>
      <Flex
        top={0}
        position={"sticky"}
        bgColor={"black"}
        opacity={0.9}
        w={"100vw"}
        h={"60px"}
        justifyContent={"space-between"}
        pt={"17px"}
        pb={"12px"}
        pl={"26vw"}
      >
        <Flex gap={"15px"}>
          <Icon
            as={BiChevronLeft}
            h={"32px"}
            w={"32px"}
            color={"grey"}
            bgColor={"black"}
            borderRadius={"50px"}
          ></Icon>
          <Icon
            as={BiChevronRight}
            h={"32px"}
            w={"32px"}
            color={"grey"}
            borderRadius={"50px"}
            bgColor={"black"}
            onClick={() =>
              dispatch({ type: "login", payload: { username: "lol" } })
            }
          ></Icon>
        </Flex>
        <Flex pr={"40px"} gap={"20px"}>
          <Button
            borderRadius={"50px"}
            h={"30px"}
            w={"120px"}
            bgColor={"black"}
            border={"1px white solid"}
            color={"white"}
            onClick={() => console.log(userSelector)}
          >
            Upgrade
          </Button>
          <Select
            borderRadius={"50px"}
            h={"30px"}
            color={"white"}
            id="accountselect"
            onChange={(val) => {
              if (val.target.value == "logout") {
                dispatch({ type: auth_types.logout });
                localStorage.clear("user");
                nav("/login");
              }
            }}
          >
            <option style={{ display: "none" }}>
              {userSelector?.username}
            </option>
            <option>Profile</option>
            <option>Upgrade to premium</option>
            <option>Support</option>
            <option>Download</option>
            <option>Settings</option>
            <option value={"logout"}>Log out</option>
          </Select>
        </Flex>
      </Flex>
    </>
  );
}
