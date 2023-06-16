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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

export function CreatePlaylist(props) {
  const arr = [];
  const [added, setAdded] = useState(["lol"]);
  const [imgUrl, setImgUrl] = useState(
    require("../assets/default-spotify.png")
  );
  useEffect(() => {
    props.semuaLagu.map(() => {
      arr.push(false);
      console.log("ol");
    });
  }, [added]);
  function input(e) {
    if (!e.target.value) {
      setImgUrl(require("../assets/default-spotify.png"));
      return;
    }
    setImgUrl(e.target.value);
  }

  return (
    <>
      <Flex
        bgColor={"#282828"}
        color={"white"}
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
          padding={"24px"}
        >
          <Flex fontWeight={"bold"}>Playlist details</Flex>
          <Flex alignItems={"end"}>
            <Icon
              as={IoMdClose}
              color="#87878"
              cursor={"pointer"}
              onClick={() => props.onClose()}
            ></Icon>
          </Flex>
        </Flex>
        <Flex padding={"0px 24px 24px 24px"} justifyContent={"space-between"}>
          <Flex flexDir={"column"} gap="10px">
            <Image
              w={"180px"}
              h="180px"
              src={imgUrl}
              boxShadow={"0px 0px 20px black"}
            ></Image>
            <Input
              bgColor={"#3E3E3E"}
              border={"none"}
              w="180px"
              h="40px"
              placeholder="Image URL"
              onChange={input}
            ></Input>
          </Flex>
          <Flex flexDir={"column"} justifyContent={"space-between"}>
            <Input
              bgColor={"#3E3E3E"}
              border={"none"}
              w="280px"
              h="40px"
              placeholder="Title"
            ></Input>
            <Textarea
              bgColor={"#3E3E3E"}
              border={"none"}
              w="280px"
              maxH="75%"
              h={"100%"}
              resize={"none"}
              placeholder="Description"
            ></Textarea>
          </Flex>
        </Flex>
        <Flex flexDir={"column"}>
          <Flex paddingX={"24px"} fontWeight={"bold"}>
            Add Musics
          </Flex>
          <ListMusics
            arr={arr}
            isilagu={props.isilagu}
            setCounter={props.setCounter}
            counter={props.counter}
            fetchData={props.fetchData}
          />
        </Flex>

        <Center w="100%">
          <Center
            borderRadius={"5px"}
            fontWeight={"600"}
            bgColor={"#1ED760"}
            h="48px"
            w="90%"
            cursor={"pointer"}
            onClick={() => {
              setAdded(arr);
              console.log(arr);
            }}
          >
            SAVE
          </Center>
        </Center>
      </Flex>
    </>
  );
}

export function ListMusics(props) {
  useEffect(() => {
    console.log(props);
  }, [props]);
  return (
    <>
      <Flex flexDir={"column"} paddingBottom="10px" gap={"10px"}>
        <Grid
          templateColumns="1fr 2fr 1fr"
          columnGap={5}
          maxH={"550px"}
          overflow={"hidden"}
        >
          <GridItem w="100%" h="25px"></GridItem>
          <GridItem w="100%" h="25px" fontWeight={"bold"}>
            Title
          </GridItem>
          <GridItem w="100%" h="25px" fontWeight={"bold"}>
            Artist
          </GridItem>
          {props?.isilagu?.map((val) => {
            return (
              <>
                <GI val={val} arr={props.arr} />
              </>
            );
          })}
        </Grid>

        <Flex gap={"20px"} w="100%" justifyContent={"center"}>
          <Flex
            cursor={"pointer"}
            onClick={() => {
              props.setCounter(props.counter - 1);

              props.fetchData(props.counter - 1);
            }}
          >
            Prev
          </Flex>
          <Flex
            cursor={"pointer"}
            onClick={() => {
              props.setCounter(props.counter + 1);
              props.fetchData(props.counter + 1);
            }}
          >
            Next
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

function GI(props) {
  const { val } = props;
  const [buttonid, setButtonid] = useState(true);
  function idButton(event) {
    const { value, id } = event.target;
    setButtonid(!buttonid);
    if (buttonid) {
      props.arr[id - 1] = true;
    }
    console.log(value);
    console.log(event);
  }
  return (
    <>
      <GridItem w="100%" h="25px" fontWeight={"bold"}>
        <Center h={"25px"}>
          <Button
            colorScheme={buttonid ? "black" : "green"}
            size={"sm"}
            h={"15px"}
            id={props.val.Id}
            value={props.val.Id}
            onClick={idButton}
          >
            Add
          </Button>
        </Center>
      </GridItem>
      <GridItem w="100%" h="25px">
        {val.title}
      </GridItem>
      <GridItem w="100%" h="25px">
        {val.creator}
      </GridItem>
    </>
  );
}
