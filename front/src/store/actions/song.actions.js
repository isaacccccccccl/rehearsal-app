import { songService } from '../../services/song.service'
import { store } from '../store'

export async function loadSongs(filterBy) {
    try {
        const songs = await songService.query(filterBy)
        store.dispatch({ type: 'SET_SONGS', songs })
    } catch (err) {
        console.log('SongActions: err in loadSongs', err)
        store.dispatch({ type: 'SET_SONGS', songs: [] })
    }
}

export async function saveSong(song) {
    try {
        const savedSong = await songService.save(song)
        if (song._id) {
            store.dispatch({ type: 'UPDATE_SONG', song: savedSong })
        } else {
            store.dispatch({ type: 'ADD_SONG', song: savedSong })
        }
    } catch (err) {
        console.log('SongActions: err in saveSong', err)
        throw err
    }
}

export async function removeSong(songId) {
    try {
        await songService.remove(songId)
        store.dispatch({ type: 'REMOVE_SONG', songId })
    } catch (err) {
        console.log('SongActions: err in removeSong', err)
        throw err
    }
} 