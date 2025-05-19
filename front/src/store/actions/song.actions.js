import { songService } from '../../services/song.service'

export function loadSongs(filterBy) {
    return async dispatch => {
        try {
            const songs = await songService.query(filterBy)
            dispatch({ type: 'SET_SONGS', songs })
        } catch (err) {
            // Optionally handle error
        }
    }
}

export function saveSong(song) {
    return async dispatch => {
        try {
            const savedSong = await songService.save(song)
            if (song._id) {
                dispatch({ type: 'UPDATE_SONG', song: savedSong })
            } else {
                dispatch({ type: 'ADD_SONG', song: savedSong })
            }
        } catch (err) {
            // Optionally handle error
        }
    }
}

export function removeSong(songId) {
    return async dispatch => {
        try {
            await songService.remove(songId)
            dispatch({ type: 'REMOVE_SONG', songId })
        } catch (err) {
            // Optionally handle error
        }
    }
} 