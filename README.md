# ⏱️ Surprise Countdown App

A beautiful, premium-styled countdown timer built with React. Create a personalized countdown message, set the duration, and generate a shareable "surprise" link for your friends!

![Countdown App Screenshot](https://via.placeholder.com/800x400?text=Premium+Countdown+App)

## ✨ Features

- **Custom Messages**: Type any message for the big reveal.
- **Flexible Duration**: Set hours, minutes, or seconds.
- **Premium UI**: Glassmorphism design with 'Outfit' font and smooth animations.
- **🎁 Surprise Mode**:
  - Generate a unique **Share Link**.
  - Message is **hidden** in the URL (Base64 encoded).
  - Recipient sees a "Surprise Countdown" and only sees the message when the timer hits zero!
- **Docker Support**: Containerized for easy deployment.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm
- Docker (optional)

### 💻 Local Development

1.  **Clone the repository** (if applicable) or navigate to project folder.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

### 🐳 Running with Docker

You can easily run the application using Docker Compose.

1.  **Build and Start**:
    ```bash
    docker compose up --build
    ```
2.  **Access the App**:
    Open [http://localhost:5173](http://localhost:5173).
3.  **Stop**:
    Press `Ctrl+C` or run `docker compose down`.

## 🛠️ Tech Stack

- **Framework**: React + Vite
- **Styling**: Vanilla CSS (CSS3 variables, Flexbox, Animations)
- **Font**: Outfit (via Google Fonts)
- **Containerization**: Docker & Docker Compose

## 📝 Usage Guide

1.  **Enter Message**: Type "Happy Birthday!", "We are Live!", etc.
2.  **Set Time**: Enter duration in seconds (e.g., `10` for 10 seconds).
3.  **Share**:
    - Click **"🔗 Share Link"**.
    - Send the copied URL to a friend.
4.  **View**:
    - Your friend clicks the link.
    - They see "🎁 Surprise Countdown".
    - They click "Reveal Surprise" → Timer starts → Message revealed! 🎉

---

_Made with ❤️ by Maung Thant_
