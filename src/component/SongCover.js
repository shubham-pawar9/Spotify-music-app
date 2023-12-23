import { useState } from "react";

const SongCover = ({
  playingSong,
  isPlaying,
  handlePlayPause,
  currentTime,
  duration,
  handleSliderChange,
  setSongCover,
  handleHitLike,
}) => {
  const [likeStatus, setLikeStatus] = useState(false);
  return (
    <>
      <div className="song-cover-div">
        <button className="close-cover" onClick={() => setSongCover(false)}>
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
              onClick={() => {
                if (!likeStatus) handleHitLike(playingSong);
                setLikeStatus(true);
              }}
            />
          </div>
          <img
            className="song-cover-img"
            src={process.env.PUBLIC_URL + `/images/${playingSong["cover"]}`}
            alt="song-cover"
          />
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
      </div>
    </>
  );
};
export default SongCover;
