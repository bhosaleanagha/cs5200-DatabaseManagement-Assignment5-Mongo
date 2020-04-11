const mongoose = require('mongoose')
const QuizSchema = require('./quiz.schema.server')
module.exports = mongoose.model('QuizModel',QuizSchema)