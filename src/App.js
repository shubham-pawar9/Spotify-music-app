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

  const audioPlayerRef = useRef(null);

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
    console.log(likedSong);
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
        />
      )}
    </>
  );
};

export default App;
