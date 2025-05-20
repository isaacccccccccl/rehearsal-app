import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { userService } from '../services/user'
import { socketService } from '../services/socket.service'
import { loadSongs } from '../store/actions/song.actions'

export function AdminMain() {
    const [query, setQuery] = useState('')
    const [rehearsalStarted, setRehearsalStarted] = useState(false)
    const navigate = useNavigate()
    const user = userService.getLoggedinUser()

    useEffect(() => {
        const onStarted = () => setRehearsalStarted(true)
        socketService.on('rehearsal-started', onStarted)
        return () => socketService.off('rehearsal-started', onStarted)
    }, [])

    function handleChange(ev) {
        setQuery(ev.target.value)
    }

    async function onSearch(ev) {
        ev.preventDefault()
        await loadSongs({ txt: query })
        navigate(`/results?query=${encodeURIComponent(query)}`)
    }

    function onStartRehearsal() {
        if (!user) return
        setRehearsalStarted(true)
        socketService.startRehearsal(user._id, user._id)
    }

    return (
        <section className="admin-main">
            <h1>Search any song...</h1>
            <form onSubmit={onSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Type song name or artist..."
                    autoFocus
                />
                <button type="submit">Search</button>
            </form>
            <div >
                <button className="main-blue-btn" onClick={onStartRehearsal} disabled={rehearsalStarted}>
                    {rehearsalStarted ? 'Rehearsal Started' : 'Start Rehearsal'}
                </button>
                {rehearsalStarted && (
                    <span>
                        <strong>Session code:</strong> <span style={{ userSelect: 'all' }}>{user._id}</span>
                        <button className="main-blue-btn" onClick={() => navigator.clipboard.writeText(user._id)}>Copy</button>
                    </span>
                )}
            </div>
        </section>
    )
} 