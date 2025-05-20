import 'dotenv/config'
import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'

import { authRoutes } from './api/auth/auth.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { songRoutes } from './api/songs/song.routes.js'
import { setupSocketAPI } from './services/socket.service.js'
import { logger } from './services/logger.service.js'

const app = express()
const server = http.createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json())

// CORS configuration
const corsOptions = {
    origin: [   
        'http://127.0.0.1:3000',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'http://localhost:5173',
        'https://rehearsal-app.onrender.com'
    ],
    credentials: true
}
app.use(cors(corsOptions))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('public')))
}

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/songs', songRoutes)

setupSocketAPI(server)

app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})

const port = process.env.PORT || 3030

server.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})