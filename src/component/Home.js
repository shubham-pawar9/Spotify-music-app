import React, { useState, useRef, useEffect } from "react";

const Home = ({
  songList,
  setSongCover,
  playingSong,
  setPlayingSong,
  isPlaying,
  setIsPlaying,
  audioPlayerRef,
  handlePlayPause,
  handleTimeUpdate,
  handleDurationChange,
  handleSliderChange,
  currentTime,
  duration,
}) => {
  const [recentPlayList, setRecentPlayList] = useState([]);

  useEffect(() => {
    if (playingSong.name !== undefined) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.addEventListener("timeupdate", handleTimeUpdate);
        audioPlayerRef.current.addEventListener(
          "durationchange",
          handleDurationChange
        );
      }
    }

    return () => {
      if (playingSong.name !== undefined && audioPlayerRef.current) {
        audioPlayerRef.current.removeEventListener(
          "timeupdate",
          handleTimeUpdate
        );
        audioPlayerRef.current.removeEventListener(
          "durationchange",
          handleDurationChange
        );
      }
    };
  }, [playingSong]);

  const handleSongPlay = (item, e) => {
    if (document.querySelector(".favSong.active"))
      document.querySelector(".favSong.active").classList.remove("active");
    e.target.closest(".favSong").classList.add("active");
    const isSongInRecentList = recentPlayList.some(
      (song) => song.name === item.name
    );
    setPlayingSong(item);
    if (!isSongInRecentList) {
      setRecentPlayList((prevList) => {
        const newList = [item, ...prevList.slice(0, 4)];
        return newList;
      });
    }
    setTimeout(() => {
      handlePlayPause();
    }, 10);
  };
  const handleRecentSongPlay = (item) => {
    setPlayingSong(item);
    setTimeout(() => {
      handlePlayPause();
    }, 10);
  };
  return (
    <>
      <div className="homeMainDiv">
        <div className="nav-bar">
          <ul>
            <li className="nav-list">SP</li>
            <li className="nav-list active">All</li>
            <li className="nav-list">Fav</li>
            <li className="nav-list">Podcasts</li>
          </ul>
        </div>
        <div className="fav-song-list">
          {songList &&
            songList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="favSong"
                  onClick={(e) => handleSongPlay(item, e)}
                >
                  <img
                    src={process.env.PUBLIC_URL + `/images/${item.cover}`}
                    alt="song-cover"
                  />
                  <span className="song-name">{item.name}</span>
                </div>
              );
            })}
        </div>
        <div className="recent-played-list">
          {recentPlayList.length > 0 && <span>Recently played</span>}
          <div className="recent-song-list">
            {recentPlayList &&
              recentPlayList.map((item) => {
                return (
                  <div
                    className="recentSong"
                    onClick={() => handleRecentSongPlay(item)}
                  >
                    <img
                      src={process.env.PUBLIC_URL + `/images/${item.cover}`}
                      alt="song-cover"
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="add-img">
          <img
            src={process.env.PUBLIC_URL + "/images/add-cover.jpg"}
            alt="add-banner"
          />
        </div>
        {playingSong.name != undefined && (
          <div className="footer-bar">
            {
              <div className="playing-song-div">
                <img
                  onClick={() => setSongCover(true)}
                  src={
                    process.env.PUBLIC_URL + `/images/${playingSong["cover"]}`
                  }
                  alt="song-cover"
                />
                <span
                  onClick={() => setSongCover(true)}
                  className="playing-song-name"
                >
                  {playingSong["name"]}
                </span>
                <audio
                  ref={audioPlayerRef}
                  id="audioPlayer"
                  src={process.env.PUBLIC_URL + `/media/${playingSong["path"]}`}
                ></audio>
                <button
                  id="playPauseButton"
                  className={isPlaying ? "pause" : "play"}
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <img
                      src={process.env.PUBLIC_URL + "/images/pause.png"}
                      alt="song-cover"
                    />
                  ) : (
                    <img
                      src={process.env.PUBLIC_URL + "/images/play.png"}
                      alt="song-cover"
                    />
                  )}
                </button>
                <input
                  type="range"
                  id="songSlider"
                  value={currentTime}
                  max={duration}
                  onChange={handleSliderChange}
                />
              </div>
            }
          </div>
        )}
      </div>
    </>
  );
};

export default Home;