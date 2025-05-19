import express from 'express'
import { log } from '../../middlewares/logger.middleware.js'
import { getSongs, getSongById, addSong, updateSong, removeSong } from './song.controller.js'

const router = express.Router()

router.get('/', log, getSongs)
router.get('/:id', log, getSongById)
router.post('/', log, addSong)
router.put('/:id', updateSong)
router.delete('/:id', removeSong)

export const songRoutes = router 