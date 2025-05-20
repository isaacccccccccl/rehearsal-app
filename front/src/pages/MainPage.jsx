import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { loadSongs } from '../store/actions/song.actions'
import { userService } from '../services/user'
import { PlayerMain } from '../cmps/PlayerMain'
import { AdminMain } from '../cmps/AdminMain'
import { SongList } from '../cmps/SongList'

export function MainPage() {
    const [user, setUser] = useState(null)
    const songs = useSelector(state => state.songModule.songs)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const loggedInUser = userService.getLoggedinUser()
        if (!loggedInUser) navigate('/login')
        setUser(loggedInUser)
    }, [navigate])

    useEffect(() => {
        dispatch(loadSongs())
    }, [dispatch])

    if (!user) return null

    function handleSongSelect(songId) {
        if (user?.isAdmin) {
            const song = songs.find(s => s._id === songId)
            if (!song) {
                console.error('Song not found for id:', songId)
                return
            }
            socketService.selectRehearsalSong(user._id, song)
            setTimeout(() => navigate(`/live/${songId}`), 200) // small delay for socket
        }
    }

    return (
        <div className="main-page">
            {user.isAdmin ? <AdminMain /> : <PlayerMain />}
            <div className="songs-section">
                <SongList 
                    songs={songs} 
                    onSelectSong={handleSongSelect}
                    isSelectable={user.isAdmin}
                />
            </div>
        </div>
    )
} 