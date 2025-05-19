import { httpService } from './http.service'

export const songService = {
    query,
    getById,
    save,
    remove,
}

function query(filterBy = {}) {
    const params = new URLSearchParams(filterBy).toString()
    return httpService.get(`songs${params ? '?' + params : ''}`)
}

function getById(songId) {
    return httpService.get(`songs/${songId}`)
}

function save(song) {
    if (song._id) {
        return httpService.put(`songs/${song._id}`, song)
    } else {
        return httpService.post('songs', song)
    }
}

function remove(songId) {
    return httpService.delete(`songs/${songId}`)
} 