# Rehearsal App

A real-time web application for band rehearsals and song management. Built with React/Redux (frontend) and Node.js/Express/Socket.io (backend).

## Features
- **Role-based access:** Admin and user roles
- **Song management:** Search, filter, and preview songs
- **Real-time rehearsal sessions:**
  - Admin can start/end sessions
  - Users join live sessions
  - Live song/chord/lyric display
- **Responsive, modern UI:**
  - Dark/blue theme
  - Role-based navigation
  - Copy session code
- **Clean codebase:** Only essential files and logic

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

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
   npm start
   ```
3. **Open your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

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
  - Join live sessions
  - View live song/chord/lyric display

## License
MIT

---
*Created by Isaac Levy* 