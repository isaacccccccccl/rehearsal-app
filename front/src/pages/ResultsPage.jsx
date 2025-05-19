import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { loadSongs } from '../store/actions/song.actions'
import { SongList } from '../cmps/SongList'
import { userService } from '../services/user'
import { socketService } from '../services/socket.service'

export function ResultsPage() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('query') || ''
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const songs = useSelector(state => state.songModule.songs)
    const user = userService.getLoggedinUser()

    useEffect(() => {
        dispatch(loadSongs(query ? { txt: query } : {}))
    }, [dispatch, query])

    const handleSongSelect = (songId) => {
        if (user?.isAdmin) {
            const song = songs.find(s => s._id === songId)
            if (!song) {
                console.error('Song not found for id:', songId)
                return
            }
            console.log('Admin emitting selectRehearsalSong', user._id, song);
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