import React, { useState, useEffect } from 'react';
import './index.css';

const App: React.FC = () => {
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState(10);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [showCopied, setShowCopied] = useState(false);

  const [isViewerMode, setIsViewerMode] = useState(false);

  // Load from URL (Hash or Params) on mount
  useEffect(() => {
    // Check for Hash (New "Short" format)
    const hash = window.location.hash.slice(1); // Remove '#'
    if (hash) {
      try {
        const decoded = atob(hash);
        const data = JSON.parse(decoded);
        if (data.m && data.t) {
          setMessage(data.m);
          setDuration(Number(data.t));
          setTimeLeft(Number(data.t));
          setIsViewerMode(true);
          return; // Stop here if hash found
        }
      } catch (e) {
        console.error("Invalid hash", e);
      }
    }

    // Fallback support for old Query Params
    const params = new URLSearchParams(window.location.search);
    const msgParam = params.get('m');
    const timeParam = params.get('t');

    if (msgParam && timeParam) {
      setMessage(decodeURIComponent(msgParam));
      setDuration(Number(timeParam));
      setTimeLeft(Number(timeParam));
      setIsViewerMode(true);
    }
  }, []);

  // Countdown logic
  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            setShowSuccess(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setShowSuccess(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleStart = () => {
    if (!message.trim()) {
      alert('Please enter a message!');
      return;
    }
    if (duration <= 0) {
      alert('Please enter a valid duration!');
      return;
    }
    if (!isActive && timeLeft === 0) {
         setTimeLeft(duration);
    }
    setIsActive(true);
    setShowSuccess(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(isViewerMode ? duration : 0);
    setShowSuccess(false);
  };

  const handleShare = () => {
    if (!message.trim()) {
      alert('Please enter a message to share!');
      return;
    }
    
    // Create "Short" URL using Base64
    const data = JSON.stringify({ m: message, t: duration });
    const encoded = btoa(data);
    
    // Construct new URL with Hash
    const baseUrl = window.location.origin + window.location.pathname;
    const shortUrl = `${baseUrl}#${encoded}`;
    
    navigator.clipboard.writeText(shortUrl).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <div className="countdown-card">
        <h1 className="title">
            {isViewerMode ? '🎁 Surprise Countdown' : '⏱️ Countdown Timer'}
        </h1>

        {!showSuccess ? (
          <>
            {!isViewerMode && (
                <>
                    <div className="input-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        id="message"
                        className="message-input"
                        placeholder="Enter your message (e.g., Happy New Year!)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={isActive}
                        rows={3}
                    />
                    </div>

                    <div className="input-group">
                    <label htmlFor="duration">Duration (seconds)</label>
                    <input
                        id="duration"
                        type="number"
                        className="duration-input"
                        min="1"
                        max="3600"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        disabled={isActive}
                    />
                    </div>
                </>
            )}

            <div className="timer-display" style={{ fontSize: isViewerMode ? '6rem' : '4rem' }}>
              {timeLeft > 0 ? formatTime(timeLeft) : isViewerMode ? formatTime(duration) : '00:00'}
            </div>

            <div className="button-group">
              {!isActive ? (
                <>
                  <button className="btn btn-start" onClick={handleStart}>
                    {isViewerMode ? '🎁 Reveal Surprise' : '🚀 Start'}
                  </button>
                  {!isViewerMode && (
                    <button className="btn btn-share" onClick={handleShare} style={{ marginLeft: '10px' }}>
                        {showCopied ? '✅ Copied!' : '🔗 Share Link'}
                    </button>
                  )}
                </>
              ) : (
                <button className="btn btn-reset" onClick={handleReset}>
                  {isViewerMode ? '⏹ Stop' : '🔄 Reset'}
                </button>
              )}
            </div>
            
            {isViewerMode && !isActive && (
                <div style={{ marginTop: '20px', color: '#888', fontSize: '0.9rem' }}>
                    <a href="/" style={{ color: '#667eea', textDecoration: 'none' }}>Create your own countdown</a>
                </div>
            )}
          </>
        ) : (
          <div className="success-state">
            <div className="success-message">{message}</div>
            <button className="btn btn-again" onClick={handleReset}>
              ✨ Go Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;