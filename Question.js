const mongoose = require('mongoose')

const QuestionSchema = mongoose.Schema({
    question: {type: String, required: true},
    answers: {type: Array, required: true},
    rightIndex: {type: Number, required: true},
})

module.exports = mongoose.model("Questions", QuestionSchema)