const mongoose = require('mongoose');
const questionSchema = require('./question.schema.server')
const questionSchema = mongoose.Schema({
  question:[{
    type: mongoose.Schema.Types.ObjectID,
    ref: 'QuestionModel'
  }]
},{collection: 'quizzes'})