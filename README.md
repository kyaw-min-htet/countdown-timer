# ⏱️ Surprise Countdown App

A beautiful, premium-styled countdown timer built with React and Vite. Create a personalized countdown message, set a short duration, and generate a shareable surprise link for your friends.

## ✨ Features

- **Custom Messages**: Type any message for the big reveal.
- **Short Countdown Duration**: Set a countdown in seconds, up to 60 seconds.
- **Premium UI**: Glassmorphism design with 'Outfit' font and smooth animations.
- **🎁 Surprise Mode**:
  - Generate a unique **Share Link**.
  - Message and duration are encoded in the URL hash.
  - Recipients see a "Surprise Countdown" and only see the message when the timer hits zero.
- **Docker Support**: Containerized for easy deployment.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm
- Docker (optional)

### 💻 Local Development

1. **Clone the repository** or navigate to the project folder.
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Start the development server**:
    ```bash
    npm run dev
    ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### 🐳 Running with Docker

You can easily run the application using Docker Compose.

1. **Build and start**:
    ```bash
    docker compose up --build
    ```
2. **Access the app**:
    Open [http://localhost:5173](http://localhost:5173).
3. **Stop the container**:
    Press `Ctrl+C` or run `docker compose down`.

## 🛠️ Tech Stack

- **Framework**: React + Vite
- **Styling**: Vanilla CSS (CSS3 variables, Flexbox, Animations)
- **Font**: Outfit (via Google Fonts)
- **Containerization**: Docker & Docker Compose

## 📝 Usage Guide

1. **Enter a message**: Type "Happy Birthday!", "We are live!", etc.
2. **Set the time**: Enter a duration in seconds, from `1` to `60`.
3. **Share**:
    - Click **"🔗 Share Link"**.
    - Send the generated URL to a friend.
4. **View**:
    - Your friend clicks the link.
    - They see "🎁 Surprise Countdown".
    - They click "Reveal Surprise" → Timer starts → Message revealed! 🎉

---

_Made with ❤️ by Maung Thant_
