import { useState, useEffect } from 'react'
import { userService } from '../services/user'
import { socketService, SOCKET_EVENT_REHEARSAL_SONG_UPDATE } from '../services/socket.service'
import { useNavigate } from 'react-router'

export function PlayerMain() {
    const [connected, setConnected] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [sessionCode, setSessionCode] = useState('')
    const user = userService.getLoggedinUser()
    const navigate = useNavigate()

    function onConnectRehearsal() {
        if (!user) return
        setShowModal(true)
    }

    function handleModalSubmit(e) {
        e.preventDefault()
        if (!sessionCode) return
        socketService.joinRehearsal(sessionCode, user._id)
        socketService.on('rehearsal-joined', () => setConnected(true))
        socketService.on('rehearsal-not-found', () => alert('Rehearsal not found!'))
        setShowModal(false)
    }

    useEffect(() => {
        function onSongUpdate({ song }) {
            navigate(`/live/${song._id}`)
        }
        socketService.on(SOCKET_EVENT_REHEARSAL_SONG_UPDATE, onSongUpdate)
        return () => socketService.off(SOCKET_EVENT_REHEARSAL_SONG_UPDATE, onSongUpdate)
    }, [navigate])

    return (
        <section className="player-main">
            {!connected ? (
                <>
                    <button className="main-blue-btn" onClick={onConnectRehearsal}>Connect to Rehearsal</button>
                    {showModal && (
                        <div className="modal-backdrop">
                            <div className="modal">
                                <form onSubmit={handleModalSubmit}>
                                    <label>
                                        Enter session code (admin userId):
                                        <input
                                            type="text"
                                            value={sessionCode}
                                            onChange={e => setSessionCode(e.target.value)}
                                            autoFocus
                                        />
                                    </label>
                                    <div className="modal-actions">
                                        <button type="submit" className="main-blue-btn">OK</button>
                                        <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <h1>Waiting for next song</h1>
            )}
        </section>
    )
} 