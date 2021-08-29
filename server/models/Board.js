const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    contents: String,
    author: String,
    createdAt: {type: Date, default: Date.now()}
})

const boardSchema = mongoose.Schema({
    contents: String,
    author: String,
    createdAt: {type: Date, default: Date.now()},
    comments: [commentSchema]
})

const Board = mongoose.model('Board', boardSchema)

module.exports = { Board }