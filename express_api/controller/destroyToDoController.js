const toDoSchema = require('../model/toDoSchema')
require('dotenv').config()



const destroyToDoController = async (req, res) => {
    const host = process.env.DJANGO_HOST
    const token = req.headers.authorization
    const fetchData = await fetch(`${host}/api/auth/me`, { method: 'GET', headers: { Authorization: token } })
    if (fetchData.ok) {
        try {
            const data = await fetchData.json()
            const { id } = data.message
            const task = await toDoSchema.find({ author: id }).deleteMany()
            if (task) {
                return res.status(200).json({ message: 'Tasks has been destroyed' })
            } else {
                return res.status(404).json({ message: 'Tasks not found' })
            }
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    } else {
        return res.status(400).json({ message: 'Token is invalid or expired' });
    }
}


module.exports = { destroyToDoController }