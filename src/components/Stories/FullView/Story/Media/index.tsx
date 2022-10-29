import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

interface MediaProps {
  type: string;
  url: string;
  onEnd?: () => void;
  imgDuration?: number
}

const Media = ({ type, url, onEnd, imgDuration = 3000 }: MediaProps) => {

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const eventRef = useRef<HTMLDivElement | null>(null);

  const isVideo = type === 'video';
  const [ duration, setDuration ] = useState(imgDuration)
  const [ progress, setProgress ] = useState(0);
  const [ paused, setPaused ] = useState(false);

  const event = new CustomEvent('story-progress', {bubbles: true, detail: { progress }})

  const fps = 30;
  const ifps = 1000 / fps; //inversed fps = 1s (1000ms) / fps
  function getProgress(videoEl: HTMLVideoElement) {
    return (videoEl.currentTime / videoEl.duration) * 100
  }

  function handlePause() {
    // for video
    if (videoRef?.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
    //for images
    setPaused(!paused);
  }

  useEffect(() => {
    const progressTimer = setInterval(() => {
      if (isVideo && videoRef?.current) {
        setProgress(getProgress(videoRef.current))
      } else {
        if (!paused) {
          if (progress + (ifps * 100) / duration > 100) {
            onEnd();
            setProgress(0);
          } else {
            setProgress(progress + (ifps * 100) / duration);
          }
        }
      }
    }, ifps);
    return () => clearInterval(progressTimer);
  }, [ progress, paused ]);

  useEffect(() => {
    if(eventRef?.current) {
      eventRef.current.dispatchEvent(event)
    }
  }, [ progress, paused ]);

  useEffect(() => {
    // if new url, start from 0
    setProgress(0);
    // and play img timer if it paused before
    setPaused(false);
    //if video => start it
    if (videoRef?.current) {
      videoRef.current.play()
    }
    return () => {
      if (videoRef?.current) {
        videoRef.current.pause()
      }
    }

  }, [ url ])

  return (
    <Box onClick={() => handlePause()} ref={eventRef}>
      {isVideo
        ? <video ref={videoRef} src={url} muted autoPlay onEnded={() => onEnd()} />
        : <img src={url} alt={'...'} />
      }
    </Box>
  );
};

export default Media;
