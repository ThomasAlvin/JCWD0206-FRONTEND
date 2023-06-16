import {
  Box,
  Flex,
  Icon,
  IconButton,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import "../css/playbar.css";
import {
  BsPlusCircle,
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
  BsFillVolumeDownFill,
  BsVolumeOffFill,
} from "react-icons/bs";
import { MdOutlineSmartDisplay } from "react-icons/md";
import { HiFastForward, HiRewind } from "react-icons/hi";
import { MdQueueMusic } from "react-icons/md";
import { BiDevices, BiVolume } from "react-icons/bi";
import {
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiFillStepBackward,
  AiFillStepForward,
  AiOutlineExpandAlt,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Playbar(props) {
  const [currentaudio, setCurrentaudio] = useState(1);
  const [muted, setMuted] = useState(false);
  const [ondragedplay, setOndragedplay] = useState(false);
  const [audio, setAudio] = useState({});
  const [duration, setDuration] = useState(0);
  const [pause, setPause] = useState(true);
  const [currenttime, setCurrenttime] = useState(0);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log(props.playlist);
    changePlaylist();
  }, [props.playlist]);
  useEffect(() => {
    updateTime();
  }, [currenttime]);
  function nextsong() {
    setCounter(counter + 1);
    audio.pause();
  }
  function prevsong() {
    setCounter(counter - 1);
    audio.pause();
  }
  function changeSong(track) {
    if (track > props.playlist.length - 1) {
      track = 0;
    }
    if (track < 0) {
      track = props.playlist.length - 1;
    }
    setCounter(track);
    audio.src = require("../assets/audio/" + props.playlist[track].src);

    return audio.play().finally(() => {
      setPause(false);
      updateTime();
    });
  }
  async function updateTime() {
    if (currenttime == audio.duration && audio.duration) {
      setCounter(counter + 1);
      console.log(counter + 1);
      return await changeSong(counter + 1);
    }
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        if (!pause) {
          resolve(setCurrenttime(audio.currentTime));
          console.log("lol");
        }
      }, 500);
    });
    if (audio.ended) {
      setCounter(counter + 1);
      audio.currentTime = 0;
      setPause(!pause);
    }
  }
  function changePlaylist() {
    setTimeout(() => setCurrenttime(audio?.currentTime), 500);
    if (audio.src) {
      setCounter(0);
      changeSong(0);
    } else {
      soundTrack();
    }
    // setTimeout(() => setCurrentTime());
  }
  function play(status) {
    setPause(status);
    if (!status) {
      audio.play();
      setTimeout(() => setCurrenttime(audio.currentTime), 100);

      return;
    }

    audio.pause();
  }
  function soundTrack() {
    if (props.playlist.length) {
      const tempAudio = new Audio(
        require("../assets/audio/" + props.playlist[counter].src)
      );
      tempAudio.addEventListener("loadedmetadata", function () {
        setDuration(tempAudio.duration / 1000);
        console.log(props.playlist);
      });

      setAudio(tempAudio);
      console.log(tempAudio);
    }
  }

  return (
    <>
      <Box
        id="playbarbox"
        position={"sticky"}
        bottom={0}
        maxH={"90px"}
        h={"90px"}
        bgColor={"#181818"}
        borderTop={"2px  solid"}
      >
        <Box w={"100%"}>
          <Flex pl={"15px"} pt={"17px"} w={"100%"}>
            <Flex w={"450px"}>
              <Flex>
                <Image
                  src={props.playlist[counter]?.image}
                  h={"56px"}
                  w={"56px"}
                />
                <Flex
                  flexDir={"column"}
                  pl={"20px"}
                  pt={"5px"}
                  fontWeight={"bold"}
                  gap={"2px"}
                >
                  <Box fontSize={"13px"} color={"white"} minW={"100px"}>
                    {props.playlist[counter]?.title.length > 25
                      ? props.playlist[counter]?.title.slice(0, 25) + "..."
                      : props.playlist[counter]?.title}
                  </Box>
                  <Box fontSize={"10px"} color={"#b3b3b3"}>
                    {props.playlist[counter]?.creator.length > 20
                      ? props.playlist[counter]?.creator.slice(0, 19) + "..."
                      : props.playlist[counter]?.creator}
                  </Box>
                </Flex>
              </Flex>

              <Flex pl={"16px"} padding={"20px"} gap={"13px"}>
                <Box>
                  <Icon
                    as={BsPlusCircle}
                    h={"16px"}
                    w={"16px"}
                    color={"white"}
                  ></Icon>
                </Box>
                <Box>
                  <Icon
                    as={MdOutlineSmartDisplay}
                    h={"20px"}
                    w={"20px"}
                    color={"white"}
                  ></Icon>
                </Box>
              </Flex>
            </Flex>

            <Flex flexDir={"column"}>
              <Flex w={"580px"} justifyContent={"center"} gap={"10px"}>
                <Icon
                  as={HiRewind}
                  h={"32px"}
                  w={"32px"}
                  color={"white"}
                  onClick={() => {
                    audio.currentTime = audio.currentTime - 10;
                    setCurrenttime(audio.currentTime);
                  }}
                ></Icon>
                <Icon
                  as={AiFillStepBackward}
                  h={"32px"}
                  w={"32px"}
                  color={counter ? "white" : "grey"}
                  onClick={async () => {
                    setCounter(counter - 1);
                    await changeSong(counter - 1);
                  }}
                ></Icon>
                <Icon
                  as={pause ? AiFillPlayCircle : AiFillPauseCircle}
                  h={"32px"}
                  w={"32px"}
                  color={"white"}
                  onClick={() => play(!pause)}
                ></Icon>
                <Icon
                  as={AiFillStepForward}
                  h={"32px"}
                  w={"32px"}
                  color={
                    counter == props.playlist.length - 1 ? "grey" : "white"
                  }
                  onClick={async () => {
                    setCounter(counter + 1);
                    await changeSong(counter + 1);
                  }}
                ></Icon>
                <Icon
                  as={HiFastForward}
                  h={"32px"}
                  w={"32px"}
                  color={"white"}
                  onClick={() => {
                    audio.currentTime = audio.currentTime + 10;
                    setCurrenttime(audio.currentTime);
                  }}
                ></Icon>
              </Flex>
              <Flex>
                <Flex w={"10%"} color={"#b3b3b3"} justifyContent={"center"}>
                  {" "}
                  0{Math.floor(currenttime / 60)}:
                  {Math.floor(currenttime % 60) > 9
                    ? Math.floor(currenttime % 60)
                    : "0" + Math.floor(currenttime % 60)}
                </Flex>
                <Slider
                  aria-label="slider-ex-1"
                  w={"80%"}
                  colorScheme="green"
                  value={Math.round(audio?.currentTime * 100) / audio?.duration}
                  onChange={(val) => {
                    let changeDur = val / 100;
                    if (audio.duration) {
                      changeDur *= audio.duration;
                    }

                    audio.currentTime = changeDur;
                    setCurrenttime(audio?.currentTime);
                  }}
                  onMouseOver={() => setOndragedplay(true)}
                  onMouseOut={() => setOndragedplay(false)}
                >
                  <SliderTrack bg={"#b3b3b3"}>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb opacity={ondragedplay ? 1 : 0} />
                </Slider>
                <Flex w={"10%"} color={"#b3b3b3"} justifyContent={"center"}>
                  {" "}
                  0{Math.floor(audio.duration / 60)}:
                  {Math.floor(audio.duration % 60) > 9
                    ? Math.floor(audio.duration % 60)
                    : "0" + Math.floor(audio.duration % 60)}
                </Flex>
              </Flex>
            </Flex>
            <Flex alignItems={"center"} pl={"200px"}>
              <IconButton
                bg={"#181818"}
                as={MdQueueMusic}
                color={"#b3b3b3"}
                h={"24px"}
                w={"24px"}
                size={"sm"}
                _hover={{ bg: "#181818" }}
              ></IconButton>
              <IconButton
                bg={"#181818"}
                as={BiDevices}
                color={"#b3b3b3"}
                h={"24px"}
                w={"24px"}
                size={"sm"}
                onClick={soundTrack}
              ></IconButton>
              <Flex gap={"10px"}>
                <IconButton
                  bg={"#181818"}
                  as={
                    muted
                      ? BsFillVolumeMuteFill
                      : currentaudio < 1 / 3
                      ? BsVolumeOffFill
                      : currentaudio < 2 / 3
                      ? BsFillVolumeDownFill
                      : BsFillVolumeUpFill
                  }
                  color={"#b3b3b3"}
                  h={"24px"}
                  w={"24px"}
                  size={"sm"}
                  _hover={{ bg: "#181818" }}
                  onClick={() => {
                    setMuted(!muted);
                    if (!muted) {
                      audio.volume = 0;
                    } else {
                      audio.volume = currentaudio;
                    }
                  }}
                ></IconButton>
                <Slider
                  aria-label="slider-ex-1"
                  w={"100px"}
                  defaultValue={100}
                  onChange={(val) => {
                    setCurrentaudio(val / 100);
                    muted ? (audio.volume = 0) : (audio.volume = val / 100);
                  }}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Flex>
              <IconButton
                pl={"10px"}
                bg={"#181818"}
                as={AiOutlineExpandAlt}
                color={"#b3b3b3"}
                h={"24px"}
                w={"24px"}
                size={"sm"}
                _hover={{ bg: "#181818" }}
              ></IconButton>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
