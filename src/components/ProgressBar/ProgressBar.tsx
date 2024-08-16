import React, { useEffect, useState } from "react";
import "./ProgressBar.css"; 
interface ProgressBarProps {
  duration: number;
  onComplete: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ duration, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 1;
      setProgress(progressValue);
      if (progressValue >= 100) {
        clearInterval(interval);
        onComplete();
      }
    }, duration / 100);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return <progress value={progress} max="100"></progress>;
};

export default ProgressBar;
