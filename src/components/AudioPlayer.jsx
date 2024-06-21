import React, { useRef, useEffect, useState } from 'react';

const AudioPlayer = ({ src, isPlaying, onPlay, onPause, episodeId }) => {
  const audioRef = useRef(new Audio(src));
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const savedProgress = localStorage.getItem(`playback-progress-${episodeId}`);
    if (savedProgress) {
      setCurrentTime(parseFloat(savedProgress));
    }

    const audioElement = audioRef.current;

    const handleLoadedData = () => {
      setDuration(audioElement.duration);
      audioElement.currentTime = currentTime;
      if (isPlaying) {
        audioElement.play().catch((error) => {
          console.error('Play interrupted:', error);
        });
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
      localStorage.setItem(`playback-progress-${episodeId}`, audioElement.currentTime);
    };

    const handleError = (e) => {
      console.error('Audio error:', e);
    };

    audioElement.addEventListener('loadeddata', handleLoadedData);
    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('error', handleError);

    return () => {
      audioElement.removeEventListener('loadeddata', handleLoadedData);
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('error', handleError);
    };
  }, [src, isPlaying, currentTime, episodeId]);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (isPlaying && audioElement.paused) {
      audioElement.play().catch((error) => {
        console.error('Play interrupted:', error);
      });
    } else if (!isPlaying && !audioElement.paused) {
      audioElement.pause();
    }
  }, [isPlaying]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${formattedSeconds}`;
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={src} />
      <div className="audio-controls">
        {isPlaying ? (
          <button onClick={onPause}>Pause</button>
        ) : (
          <button onClick={onPlay}>Play</button>
        )}
        <input
          type="range"
          value={currentTime}
          max={duration}
          onChange={handleSeek}
        />
        <div className="time-display">
          <span>{formatTime(currentTime)}</span> / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
