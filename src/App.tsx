import { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import './index.css';

type SharedCountdown = {
  m: string;
  t: number;
};

type InitialAppState = {
  message: string;
  duration: number;
  isViewerMode: boolean;
};

const DEFAULT_DURATION_SECONDS = 10;
const MAX_DURATION_SECONDS = 60;

const createExpiryTimestamp = (secondsFromNow: number): Date => {
  const expiry = new Date();
  expiry.setSeconds(expiry.getSeconds() + secondsFromNow);
  return expiry;
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const clampDuration = (value: number): number => {
  return Math.min(Math.max(Math.floor(value), 1), MAX_DURATION_SECONDS);
};

const parseDuration = (value: unknown): number | null => {
  const duration = Number(value);

  if (!Number.isFinite(duration) || duration <= 0) {
    return null;
  }

  return clampDuration(duration);
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const encodeSharedCountdown = (countdown: SharedCountdown): string => {
  const bytes = new TextEncoder().encode(JSON.stringify(countdown));
  let binary = '';

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
};

const decodeSharedCountdown = (encoded: string): SharedCountdown | null => {
  try {
    const binary = atob(encoded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));

    if (!isRecord(parsed) || typeof parsed.m !== 'string') {
      return null;
    }

    const duration = parseDuration(parsed.t);

    if (!parsed.m || duration === null) {
      return null;
    }

    return { m: parsed.m, t: duration };
  } catch (error) {
    console.error('Invalid countdown link', error);
    return null;
  }
};

const createInitialAppState = (): InitialAppState => {
  const defaultState: InitialAppState = {
    message: '',
    duration: DEFAULT_DURATION_SECONDS,
    isViewerMode: false,
  };

  if (typeof window === 'undefined') {
    return defaultState;
  }

  const hash = window.location.hash.slice(1);
  const sharedCountdown = hash ? decodeSharedCountdown(hash) : null;

  if (sharedCountdown) {
    return {
      message: sharedCountdown.m,
      duration: sharedCountdown.t,
      isViewerMode: true,
    };
  }

  const params = new URLSearchParams(window.location.search);
  const message = params.get('m');
  const duration = parseDuration(params.get('t'));

  if (message && duration !== null) {
    return {
      message,
      duration,
      isViewerMode: true,
    };
  }

  return defaultState;
};

const App = () => {
  const [initialState] = useState(createInitialAppState);
  const [message, setMessage] = useState(initialState.message);
  const [duration, setDuration] = useState(initialState.duration);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const isViewerMode = initialState.isViewerMode;

  const { totalSeconds, restart, isRunning } = useTimer({
    expiryTimestamp: createExpiryTimestamp(isViewerMode ? duration : 0),
    autoStart: false,
    onExpire: () => setShowSuccess(true),
  });

  const handleStart = () => {
    if (!message.trim()) {
      alert('Please enter a message!');
      return;
    }

    if (duration <= 0) {
      alert('Please enter a valid duration!');
      return;
    }

    setShowSuccess(false);
    restart(createExpiryTimestamp(duration), true);
  };

  const handleReset = () => {
    setShowSuccess(false);
    restart(createExpiryTimestamp(isViewerMode ? duration : 0), false);
  };

  const handleShare = () => {
    if (!message.trim()) {
      alert('Please enter a message to share!');
      return;
    }

    const encoded = encodeSharedCountdown({ m: message, t: duration });
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const shortUrl = `${baseUrl}#${encoded}`;

    if (navigator.share) {
      navigator
        .share({
          title: 'Surprise Countdown',
          text: 'Check out this surprise countdown!',
          url: shortUrl,
        })
        .catch(console.error);
      return;
    }

    navigator.clipboard.writeText(shortUrl).then(() => {
      setShowCopied(true);
      window.setTimeout(() => setShowCopied(false), 2000);
    });
  };

  const handleDurationChange = (value: string) => {
    const nextDuration = Number(value);

    if (!Number.isFinite(nextDuration) || nextDuration <= 0) {
      setDuration(0);
      return;
    }

    setDuration(clampDuration(nextDuration));
  };

  const timerSeconds = isViewerMode || isRunning ? totalSeconds : 0;

  return (
    <div className="container">
      <div className="countdown-card">
        <h1 className="title">
          {isViewerMode ? '🎁 Surprise Countdown' : '⏱️ Countdown Timer'}
        </h1>

        {!showSuccess ? (
          <>
            {!isViewerMode && !isRunning && (
              <>
                <div className="input-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    className="message-input"
                    placeholder="Enter your message (e.g., Happy New Year!)"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    disabled={isRunning}
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
                    max="60"
                    value={duration}
                    onChange={(event) => handleDurationChange(event.target.value)}
                    disabled={isRunning}
                  />
                </div>
              </>
            )}

            <div className={`timer-display ${isViewerMode || isRunning ? 'viewer-mode' : ''}`}>
              {formatTime(timerSeconds)}
            </div>

            <div className="button-group">
              {!isRunning ? (
                <>
                  <button className="btn btn-start" onClick={handleStart}>
                    {isViewerMode ? '🎁 Reveal Surprise' : '🚀 Start'}
                  </button>
                  <button className="btn btn-share" onClick={handleShare}>
                    {showCopied ? '✅ Copied!' : '🔗 Share Link'}
                  </button>
                </>
              ) : (
                <button className="btn btn-reset" onClick={handleReset}>
                  {isViewerMode ? '⏹ Stop' : '🔄 Reset'}
                </button>
              )}
            </div>

            {isViewerMode && !isRunning && (
              <div style={{ marginTop: '20px', color: '#888', fontSize: '0.9rem' }}>
                <a href="/" style={{ color: '#667eea', textDecoration: 'none' }}>
                  Create your own countdown
                </a>
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
