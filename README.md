# ⏱️ Surprise Countdown App

A React + Vite countdown app for creating short surprise messages. Enter a message, choose a duration, start the timer, or generate a shareable link that reveals the message only after the countdown finishes.

## ✨ Features

- **Custom messages**: Write the message that appears after the timer ends.
- **Short countdowns**: Choose a duration from `1` to `60` seconds.
- **Shareable surprise links**: Message and duration are encoded in the URL hash.
- **Viewer mode**: Recipients open the shared link, click **Reveal Surprise**, and see the message after the countdown.
- **Responsive UI**: Glassmorphism card layout with the Outfit font and mobile-friendly controls.
- **Docker support**: Run the Vite dev server inside Docker Compose.

## 🚀 Getting Started

### Prerequisites

- Node.js `20.19+` or `22.12+` recommended for Vite 7
- npm
- Docker Desktop, optional for Docker-based development

### Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Useful Scripts

```bash
npm run dev      # Start the local Vite dev server
npm run build    # Type-check and build for production
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

### Docker Development

Build and start the app:

```bash
docker compose up --build
```

Then open [http://localhost:5173](http://localhost:5173).

Stop the container with `Ctrl+C`, or run:

```bash
docker compose down
```

## 📝 Usage Guide

1. Enter a message, for example `Happy Birthday!`.
2. Set a countdown duration between `1` and `60` seconds.
3. Click **🚀 Start** to run the countdown locally.
4. Click **🔗 Share Link** to create a surprise link.
5. When someone opens the link, they see **🎁 Surprise Countdown**.
6. They click **🎁 Reveal Surprise** and the message appears when the timer reaches zero.

## 🛠️ Tech Stack

- **React 19**
- **Vite 7**
- **TypeScript**
- **react-timer-hook**
- **Vanilla CSS**
- **Vercel Analytics**
- **Docker + Docker Compose**

## 🔗 Share Link Format

Shared countdown data is encoded into the URL hash:

```text
https://your-domain.com/#encoded-countdown-data
```

Because the message is stored in the URL, do not use shared links for sensitive or private information.

---

_Made with ❤️ by Maung Thant_
