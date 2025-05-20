import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { loadSongs } from '../store/actions/song.actions'
import { SongList } from '../cmps/SongList'
import { userService } from '../services/user'
import { socketService } from '../services/socket.service'

export function ResultsPage() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('query') || ''
    const navigate = useNavigate()
    const songs = useSelector(state => state.songModule.songs)
    const user = userService.getLoggedinUser()


    useEffect(() => {
        // Always load songs when query changes
        loadSongs(query ? { txt: query } : {})
    }, [query])

    function handleSongSelect(songId) {
        if (user?.isAdmin) {
            const song = songs.find(s => s._id === songId)
            if (!song) {
                console.error('Song not found for id:', songId)
                return
            }
            socketService.selectRehearsalSong(user._id, song);
            setTimeout(() => navigate(`/live/${songId}`), 200); // Add a small delay
        }
    }

    return (
        <section className="results-page">
            <h2>Results for: {query}</h2>
            {songs.length === 0 ? (
                <div className="no-matches">
                    <p>No matches found</p>
                    <button className="main-blue-btn" onClick={() => navigate('/')}>Back</button>
                </div>
            ) : (
                <SongList 
                    songs={songs} 
                    onSelectSong={handleSongSelect}
                    isSelectable={user?.isAdmin}
                />
            )}
        </section>
    )
} 