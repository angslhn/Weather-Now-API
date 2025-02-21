const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    src: Object
})

const image = mongoose.model('image', imageSchema)

module.exports = image