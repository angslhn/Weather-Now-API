const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

const location = mongoose.model('location', locationSchema)

module.exports = location