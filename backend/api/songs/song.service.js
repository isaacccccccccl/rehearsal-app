import { ObjectId } from 'mongodb'
import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'

export const songService = {
    query,
    getById,
    add,
    update,
    remove,
}

async function query(filterBy = { txt: '' }) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('songs')
        return await collection.find(criteria).toArray()
    } catch (err) {
        logger.error('cannot find songs', err)
        throw err
    }
}

async function getById(songId) {
    try {
        const collection = await dbService.getCollection('songs')
        return await collection.findOne({ _id: ObjectId.createFromHexString(songId) })
    } catch (err) {
        logger.error(`while finding song ${songId}`, err)
        throw err
    }
}

async function add(song) {
    try {
        const collection = await dbService.getCollection('songs')
        await collection.insertOne(song)
        return song
    } catch (err) {
        logger.error('cannot insert song', err)
        throw err
    }
}

async function update(song) {
    try {
        const collection = await dbService.getCollection('songs')
        await collection.updateOne({ _id: ObjectId.createFromHexString(song._id) }, { $set: song })
        return song
    } catch (err) {
        logger.error(`cannot update song ${song._id}`, err)
        throw err
    }
}

async function remove(songId) {
    try {
        const collection = await dbService.getCollection('songs')
        await collection.deleteOne({ _id: ObjectId.createFromHexString(songId) })
        return songId
    } catch (err) {
        logger.error(`cannot remove song ${songId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        criteria.$or = [
            { title: { $regex: filterBy.txt, $options: 'i' } },
            { artist: { $regex: filterBy.txt, $options: 'i' } }
        ]
    }
    return criteria
} 