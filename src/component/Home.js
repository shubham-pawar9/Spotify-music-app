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
  likesList,
  listSelected,
  setListSelected,
  setActiveSong,
  activeSong,
}) => {
  const [recentPlayList, setRecentPlayList] = useState([]);
  const [albumSong, setAlbumSong] = useState("");

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
    setActiveSong(item.id);
    if (document.querySelector(".favSong.active"))
      document.querySelector(".favSong.active").classList.remove("active");
    document.querySelector(`#song${item.id}`).classList.add("active");
    // e.target.closest(".favSong").classList.add("active");
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
    console.log(item);
    setPlayingSong(item);
    setTimeout(() => {
      handlePlayPause();
    }, 10);
    if (document.querySelector(".favSong.active"))
      document.querySelector(".favSong.active").classList.remove("active");
    if (document.querySelector(`#song${item.id}`))
      document.querySelector(`#song${item.id}`).classList.add("active");
  };
  const handleNavSelect = (item, e) => {
    setListSelected(item);
    if (document.querySelector(".nav-list.active"))
      document.querySelector(".nav-list.active").classList.remove("active");
    e.target.classList.add("active");
  };
  const handleSongCover = () => {
    setSongCover(true);
    document.getElementById("root").style.overflow = "hidden";
  };
  const handleAlbumSongShow = (item, e) => {
    if (document.querySelector(".favAlbum.active"))
      document.querySelector(".favAlbum.active").classList.remove("active");
    document.querySelector(`#album${item.id}`).classList.add("active");
    setAlbumSong(item.album);
    console.log(item.album);
  };
  return (
    <>
      <div className="homeMainDiv">
        <div className="nav-bar">
          <ul>
            <li className="nav-list">SP</li>
            <li
              className="nav-list active"
              onClick={(e) => handleNavSelect("All", e)}
            >
              All
            </li>
            <li className="nav-list" onClick={(e) => handleNavSelect("Fav", e)}>
              Fav
            </li>
            <li
              className="nav-list"
              onClick={(e) => handleNavSelect("Album", e)}
            >
              Album
            </li>
          </ul>
        </div>
        <div className="fav-song-list">
          {songList &&
            listSelected == "All" &&
            songList.map((item, index) => {
              return (
                <div
                  key={index}
                  id={`song${item.id}`}
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
          <div className="album-names">
            {songList &&
              listSelected === "Album" &&
              (() => {
                const uniqueAlbums = new Set();
                return songList.map((item, index) => {
                  if (
                    item.album !== undefined &&
                    !uniqueAlbums.has(item.album)
                  ) {
                    uniqueAlbums.add(item.album);
                    return (
                      <>
                        <div
                          key={index}
                          id={`album${item.id}`}
                          className="favAlbum"
                          onClick={(e) => handleAlbumSongShow(item, e)}
                        >
                          <img
                            src={
                              process.env.PUBLIC_URL + `/images/${item.cover}`
                            }
                            alt="song-cover"
                          />
                        </div>
                      </>
                    );
                  } else {
                    return null; // Skip rendering for duplicate albums
                  }
                });
              })()}
          </div>
          <div className="album-songs">
            {songList &&
              listSelected == "Album" &&
              songList.map((item, index) => {
                if (item.album != undefined && item.album == albumSong) {
                  return (
                    <div
                      key={index}
                      id={`song${item.id}`}
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
                }
              })}
          </div>
          {likesList &&
            listSelected == "Fav" &&
            likesList.map((item, index) => {
              return (
                <div
                  key={index}
                  id={`song${item.id}`}
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
              recentPlayList.map((item, index) => {
                return (
                  <div
                    key={index}
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
                  onClick={handleSongCover}
                  src={
                    process.env.PUBLIC_URL + `/images/${playingSong["cover"]}`
                  }
                  alt="song-cover"
                />
                <span onClick={handleSongCover} className="playing-song-name">
                  {playingSong["name"]}
                </span>
                <audio
                  ref={audioPlayerRef}
                  id="audioPlayer"
                  src={
                    playingSong["album"] != undefined
                      ? process.env.PUBLIC_URL +
                        `/media/${playingSong["album"]}/${playingSong["path"]}`
                      : process.env.PUBLIC_URL + `/media/${playingSong["path"]}`
                  }
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
