import { useEffect, useState } from "react";

const SongCover = ({
  playingSong,
  isPlaying,
  handlePlayPause,
  currentTime,
  duration,
  handleSliderChange,
  setSongCover,
  handleHitLike,
  handlePlayPrevious,
  handlePlayNext,
  likesList,
}) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const handleLikeSongUpdate = () => {
    if (!likeStatus) {
      handleHitLike(playingSong);
      setLikeStatus(true);
    }
  };
  useEffect(() => {
    likesList.map((item) => {
      if (item.id == playingSong.id) {
        setLikeStatus(true);
      }
    });
  }, [playingSong]);
  return (
    <>
      <div className="song-cover-div">
        <button
          className="close-cover"
          onClick={() => {
            setSongCover(false);
            document.getElementById("root").style.overflow = "auto";
          }}
        >
          <img
            className="song-cover-img"
            src={process.env.PUBLIC_URL + "/images/close.png"}
            alt="song-cover"
          />
        </button>
        <div className="song-cover">
          <div className="cover-first-div">
            <span className="playing-song-name">{playingSong["name"]}</span>
            <img
              className="hit-like-btn"
              src={
                !likeStatus
                  ? process.env.PUBLIC_URL + "/images/like.png"
                  : process.env.PUBLIC_URL + "/images/like-heart.png"
              }
              alt="song-cover"
              onClick={handleLikeSongUpdate}
            />
          </div>
          <img
            className="song-cover-img"
            src={process.env.PUBLIC_URL + `/images/${playingSong["cover"]}`}
            alt="song-cover"
          />

          <input
            type="range"
            id="songSlider"
            value={currentTime}
            max={duration}
            onChange={handleSliderChange}
          />
          <div className="song-controls">
            <button
              id="previousSongBtn"
              className="controls-btn"
              onClick={handlePlayPrevious}
            >
              <img
                src={process.env.PUBLIC_URL + "/images/previous.png"}
                alt="song-cover"
              />
            </button>
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
            <button
              id="nextSongBtn"
              className="controls-btn"
              onClick={handlePlayNext}
            >
              <img
                src={process.env.PUBLIC_URL + "/images/next.png"}
                alt="song-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SongCover;
