import { logger } from '../../services/logger.service.js'
import { songService } from './song.service.js'

export async function getSongs(req, res) {
    try {
        const filterBy = { txt: req.query.txt || '' }
        const songs = await songService.query(filterBy)
        res.json(songs)
    } catch (err) {
        logger.error('Failed to get songs', err)
        res.status(400).send({ err: 'Failed to get songs' })
    }
}

export async function getSongById(req, res) {
    try {
        const songId = req.params.id
        const song = await songService.getById(songId)
        res.json(song)
    } catch (err) {
        logger.error('Failed to get song', err)
        res.status(400).send({ err: 'Failed to get song' })
    }
}

export async function addSong(req, res) {
    try {
        const song = req.body
        const addedSong = await songService.add(song)
        res.json(addedSong)
    } catch (err) {
        logger.error('Failed to add song', err)
        res.status(400).send({ err: 'Failed to add song' })
    }
}

export async function updateSong(req, res) {
    try {
        const song = req.body
        const updatedSong = await songService.update(song)
        res.json(updatedSong)
    } catch (err) {
        logger.error('Failed to update song', err)
        res.status(400).send({ err: 'Failed to update song' })
    }
}

export async function removeSong(req, res) {
    try {
        const songId = req.params.id
        const removedId = await songService.remove(songId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove song', err)
        res.status(400).send({ err: 'Failed to remove song' })
    }
} 