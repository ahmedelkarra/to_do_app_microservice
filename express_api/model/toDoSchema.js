const Mongoose = require('mongoose')


const toDo = new Mongoose.Schema({
    title: { type: String, unique: true, maxLength: 30, minLength: 3, required: true },
    body: { type: String, maxLength: 2000, minLength: 3, required: true },
    isDone: { type: Boolean, default: false },
    author: { type: Number, required: true },
}, { timestamps: true }
)

const toDoSchema = Mongoose.model('to_do', toDo)

module.exports = toDoSchema