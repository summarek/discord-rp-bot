const mongoose = require('mongoose')

const QuestionSchema = mongoose.Schema({
    question: {type: String, required: false},
    answers: {type: Array, required: false},
    rightIndex: {type: Number, required: false},
})

module.exports = mongoose.model("Question", QuestionSchema)
