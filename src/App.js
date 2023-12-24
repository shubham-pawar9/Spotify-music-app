import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Home from "./component/Home";
import SongCover from "./component/SongCover";
const App = () => {
  const [songList, setSongList] = useState([]);
  const [songCover, setSongCover] = useState(false);
  const [playingSong, setPlayingSong] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [likesList, setLikedList] = useState([]);
  const audioPlayerRef = useRef(null);
  const [listSelected, setListSelected] = useState("All");
  const fetchData = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const apiData = await fetch("list.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = apiData.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
  useEffect(() => {
    fetchData().then((res) => {
      setSongList(res);
    });
  }, []);

  const handlePlayPause = () => {
    if (audioPlayerRef.current && audioPlayerRef.current.paused) {
      audioPlayerRef.current.play();
      setIsPlaying(true);
    } else if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(
      audioPlayerRef.current ? audioPlayerRef.current.currentTime : 0
    );
  };

  const handleDurationChange = () => {
    setDuration(audioPlayerRef.current ? audioPlayerRef.current.duration : 0);
  };

  const handleSliderChange = (event) => {
    const time = parseFloat(event.target.value);
    setCurrentTime(time);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = time;
    }
  };
  const handleHitLike = (likedSong) => {
    setLikedList((prev) =>
      prev === undefined ? [likedSong] : [...prev, likedSong]
    );
  };
  const handlePlayNext = () => {
    songList.map((item) => {
      if (item.id == playingSong.id + 1) {
        setPlayingSong(item);
        if (document.querySelector(".favSong.active"))
          document.querySelector(".favSong.active").classList.remove("active");
        if (document.querySelector(`#song${item.id}`))
          document.querySelector(`#song${item.id}`).classList.add("active");
      }
    });
    setTimeout(() => {
      handlePlayPause();
    }, 100);
  };
  const handlePlayPrevious = () => {
    songList.map((item) => {
      if (item.id == playingSong.id - 1) {
        setPlayingSong(item);
        document.querySelector(".favSong.active").classList.remove("active");
        document.querySelector(`#song${item.id}`).classList.add("active");
      }
    });
    setTimeout(() => {
      handlePlayPause();
    }, 100);
  };
  return (
    <>
      <Home
        songList={songList}
        setSongCover={setSongCover}
        playingSong={playingSong}
        setPlayingSong={setPlayingSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioPlayerRef={audioPlayerRef}
        currentTime={currentTime}
        handlePlayPause={handlePlayPause}
        handleTimeUpdate={handleTimeUpdate}
        handleDurationChange={handleDurationChange}
        handleSliderChange={handleSliderChange}
        duration={duration}
        likesList={likesList}
        listSelected={listSelected}
        setListSelected={setListSelected}
      />
      {songCover && (
        <SongCover
          playingSong={playingSong}
          isPlaying={isPlaying}
          handlePlayPause={handlePlayPause}
          handleSliderChange={handleSliderChange}
          currentTime={currentTime}
          duration={duration}
          setSongCover={setSongCover}
          handleHitLike={handleHitLike}
          handlePlayNext={handlePlayNext}
          handlePlayPrevious={handlePlayPrevious}
          likesList={likesList}
        />
      )}
    </>
  );
};

export default App;
