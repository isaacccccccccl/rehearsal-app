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

    const handleSongSelect = (songId) => {
        if (user.isAdmin) {
            navigate(`/live/${songId}`)
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