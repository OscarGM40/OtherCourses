import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/AudioPlayer.module.css";

import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

export const AudioPlayer = () => {
  /* state */
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [ currentTime, setCurrentTime ] = useState(0);

  /* references */
  const audioPlayer = useRef(); // reference our audio component
  const progressBar = useRef(); // reference our progress bar
  const animationRef = useRef(); // reference our animation
  
  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);
    progressBar.current.max = seconds;
  },[audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])


  const calculateTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const returnedMinutes = minutes < 10 
      ? `0${minutes}` 
      : minutes;
    const secondsLeft = Math.floor(seconds % 60);
    const returnedSeconds = secondsLeft < 10 
      ? `0${secondsLeft}` 
      : secondsLeft;
    return `${returnedMinutes}:${returnedSeconds}`;
  }
  
  const togglePlayPause = () => {
    const prevValue = isPlaying;

    setIsPlaying(!prevValue);

    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();    
    
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

const handleRange = (e) => {
  audioPlayer.current.currentTime = progressBar.current.value;
  changePlayerCurrentTime();
}

const changePlayerCurrentTime = () => {
  progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value/duration*100}%`);
  setCurrentTime(progressBar.current.value);

}

  const backThirty = () => {
    // progressBar.current.value = Number(currentTime - 30);

    if(audioPlayer.current.duration - currentTime > 30) {
      audioPlayer.current.currentTime -= 30;
    } else {
      audioPlayer.current.currentTime = 0;
    }
    changePlayerCurrentTime();
  }

  const forwardThirty = () => {
    // progressBar.current.value = Number(currentTime + 30);
    if(audioPlayer.current.currentTime + 30 < audioPlayer.current.duration) {
      audioPlayer.current.currentTime += 30;
    } else {
      audioPlayer.current.currentTime = audioPlayer.current.duration;
    }
    changePlayerCurrentTime();
  }
    

  return (
    <div className={styles.audioPlayer}>
      <audio
        ref={audioPlayer}
        src="//katiebaca.com/tutorial/odd-look.mp3"
        preload="metadata"
      ></audio>

      <button
        onClick={backThirty}
        className={styles.forwardBackward}>
        <BsArrowLeftShort /> 30
      </button>

      <button 
        onClick={togglePlayPause}
        className={styles.playPause}>
        {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
      </button>

      <button
        onClick={forwardThirty}
        className={styles.forwardBackward}>
        30
        <BsArrowRightShort />
      </button>

      {/* current time */}
      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <div>
        <input type="range" 
          className={styles.progressBar} 
          ref={progressBar}
          step="0.05"
          onChange={handleRange}
          defaultValue={0}/>
      </div>

      {/* duration */}
      <div className={styles.duration}>{
      (duration && !isNaN(duration)) && calculateTime(duration)}</div>
    </div>
  );
};
