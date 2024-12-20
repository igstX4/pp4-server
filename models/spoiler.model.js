const mongoose = require('mongoose')

const SpoilerSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Spoiler', SpoilerSchema) 