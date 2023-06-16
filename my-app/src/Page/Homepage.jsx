import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../component/Content";
import Navbar from "../component/Navbar";
import Playbar from "../component/Playbar";
import Sidebar from "../component/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
export default function HomePage() {
  const [playlist, setPlaylist] = useState({});
  const [home_playlist, setHome_playlist] = useState(["lol"]);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    await axios.get("http://localhost:2000/musics").then((res) => {
      console.log(res.data);
      setPlaylist(res.data);
    });
    await axios.get("http://localhost:2000/Playlist").then((res) => {
      console.log(res.data);
      setHome_playlist(res.data);
      console.log(home_playlist);
    });
  }
  const nav = useNavigate();

  return (
    <Box>
      <Flex flexDir={"column"} color={"black"}>
        <Flex>
          <Sidebar />
          <Flex flexDir={"column"}>
            <Navbar data={home_playlist} setPlaylist={setPlaylist} />
            <Content data={home_playlist} setPlaylist={setPlaylist} />
          </Flex>
        </Flex>
        <Playbar playlist={playlist} />
      </Flex>
    </Box>
  );
}
