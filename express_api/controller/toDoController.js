const Mongoose = require('mongoose');
const toDoSchema = require('../model/toDoSchema')
require('dotenv').config()



const getAllTasks = async (req, res) => {
    const host = process.env.DJANGO_HOST
    const token = req.headers.authorization
    const fetchData = await fetch(`${host}/api/auth/me`, { method: 'GET', headers: { Authorization: token } })

    if (fetchData.ok) {
        try {
            const data = await fetchData.json()
            const { id } = data.message
            const tasks = await toDoSchema.find({ author: id })
            return res.status(200).json({ message: tasks })
        } catch (error) {
            return res.status(400).json({ message: 'Somthing went wrong' });
        }
    } else {
        return res.status(400).json({ message: 'Token is invalid or expired' });
    }
}

const addToDo = async (req, res) => {
    const { title, body, isDone } = req.body;
    const host = process.env.DJANGO_HOST
    const token = req.headers.authorization

    if (!title || !body) {
        return res.status(400).json({ message: 'Please check your inputs' });
    }

    if (!token) {
        return res.status(400).json({ message: 'Your token is missing' });
    }

    const fetchData = await fetch(`${host}/api/auth/me`, { method: 'GET', headers: { Authorization: token } })

    if (fetchData.ok) {
        if (fetchData) {
            try {
                const data = await fetchData.json()
                const { id } = data.message
                await toDoSchema.create({ title: title.trim(), body: body.trim(), isDone, author: id });
                return res.status(201).json({ message: 'Task has been created' });
            } catch (error) {
                const errorMessage = error.message
                if (errorMessage.includes('duplicate')) {
                    return res.status(403).json({ message: 'Your task already added before' });
                } else {
                    return res.status(400).json({ message: 'Somthing went wrong' });
                }
            }
        }
    } else {
        return res.status(400).json({ message: 'Token is invalid or expired' });
    }
}

const updateToDo = async (req, res) => {
    const { title, body, isDone } = req.body;
    const host = process.env.DJANGO_HOST
    const token = req.headers.authorization
    const paramId = req.params.id

    if (!title || !body || !token) {
        return res.status(400).json({ message: 'Please check your inputs' });
    }

    const fetchData = await fetch(`${host}/api/auth/me`, { method: 'GET', headers: { Authorization: token } })
    if (fetchData.ok) {
        try {
            const data = await fetchData.json()
            const { id } = data.message
            const taskId = new Mongoose.Types.ObjectId(paramId)
            await toDoSchema.findOneAndUpdate({ _id: taskId, author: id }, { title: title.trim(), body: body.trim(), isDone })
            return res.status(200).json({ message: 'Task has been updated' })
        } catch (error) {
            const errorMessage = error.message
            if (errorMessage.includes('duplicate')) {
                return res.status(403).json({ message: 'Your task already added before' });
            } else {
                return res.status(400).json({ message: 'Somthing went wrong' });
            }
        }
    } else {
        return res.status(400).json({ message: 'Token is invalid or expired' });
    }
}

const deleteToDo = async (req, res) => {
    const paramId = req.params.id
    const host = process.env.DJANGO_HOST
    const token = req.headers.authorization
    const fetchData = await fetch(`${host}/api/auth/me`, { method: 'GET', headers: { Authorization: token } })
    if (fetchData.ok) {
        try {
            const data = await fetchData.json()
            const { id } = data.message
            const taskId = new Mongoose.Types.ObjectId(paramId)
            const task = await toDoSchema.findOneAndDelete({ _id: taskId, author: id })
            if (task) {
                return res.status(200).json({ message: 'Task has been deleted' })
            } else {
                return res.status(404).json({ message: 'Task not found' })
            }
        } catch (error) {
            return res.status(400).json({ message: 'Somthing went wrong' });
        }
    } else {
        return res.status(400).json({ message: 'Token is invalid or expired' });
    }
}

module.exports = { getAllTasks, addToDo, updateToDo, deleteToDo }
