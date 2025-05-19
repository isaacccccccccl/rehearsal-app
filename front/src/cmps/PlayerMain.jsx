import { useState, useEffect } from 'react'
import { userService } from '../services/user'
import { socketService, SOCKET_EVENT_REHEARSAL_SONG_UPDATE } from '../services/socket.service'
import { useNavigate } from 'react-router'

export function PlayerMain() {
    const [connected, setConnected] = useState(false)
    const user = userService.getLoggedinUser()
    const navigate = useNavigate()

    function onConnectRehearsal() {
        if (!user) return
        // For now, assume sessionId is admin's userId (could be passed in real app)
        // You may want to get the sessionId from the server or UI
        const sessionId = prompt('Enter session code (admin userId):')
        if (!sessionId) return
        socketService.joinRehearsal(sessionId, user._id)
        socketService.on('rehearsal-joined', () => setConnected(true))
        socketService.on('rehearsal-not-found', () => alert('Rehearsal not found!'))
    }

    useEffect(() => {
        function onSongUpdate({ song }) {
            console.log('Received rehearsal-song-update', song); // Debug log
            navigate(`/live/${song._id}`)
        }
        socketService.on(SOCKET_EVENT_REHEARSAL_SONG_UPDATE, onSongUpdate)
        return () => socketService.off(SOCKET_EVENT_REHEARSAL_SONG_UPDATE, onSongUpdate)
    }, [navigate])

    return (
        <section className="player-main">
            {!connected ? (
                <button className="main-blue-btn" onClick={onConnectRehearsal}>Connect to Rehearsal</button>
            ) : (
                <h1>Waiting for next song</h1>
            )}
        </section>
    )
} 