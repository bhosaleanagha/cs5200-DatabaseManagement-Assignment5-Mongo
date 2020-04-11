const mongoose = require('mongoose');
const questionSchema = require('../models/question.schema.server')
module.exports = mongoose.model('QuestionModel',questionSchema)
