# Rehearsal App

A real-time web application for band rehearsals and song management.  
**Frontend:** React + Vite + Redux + SCSS  
**Backend:** Node.js + Express + Socket.io

## Features
- **Role-based access:** Admin and user roles
- **Song management:** Search, filter, and preview songs
- **Real-time rehearsal sessions:**
  - Admin can start/end sessions
  - Users join live sessions with a session code (now via a mobile-friendly modal)
  - Live song/chord/lyric display, auto-scroll, and responsive layout
- **Modern, responsive UI:**
  - Dark/blue theme
  - Music note favicon
  - Mobile-first design
  - Accessible and visually appealing
- **Clean codebase:** Only essential files and logic

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```
2. **Install dependencies for both frontend and backend:**
   ```bash
   cd front
   npm install
   cd ../backend
   npm install
   ```

### Running the App
1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```
2. **Start the frontend dev server:**
   ```bash
   cd ../front
   npm run dev
   ```
3. **Open your browser:**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port Vite shows)

### Environment Variables
- Configure backend and frontend `.env` files as needed (e.g., for API URLs, ports).

## Project Structure
```
front/      # React/Redux frontend
backend/    # Node.js/Express/Socket.io backend
```

## Usage
- **Admin:**
  - Log in as an admin
  - Start a rehearsal session
  - Select and broadcast songs
  - End session for all users
- **User:**
  - Log in as a user
  - Join live sessions (enter session code in modal)
  - View live song/chord/lyric display

## License
MIT

