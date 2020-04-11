const mongoose = require('mongoose')
const TrueFalseSchema = require('./true-false.schema.server')
const MultipleChoiceSchema = require('./multiple-choice.schema.server')
module.exports = mongoose.Schema({
  _id : Number,
  question : String,
  point : Number,
  questionType : String,
  multipleChoice : MultipleChoiceSchema,
  trueFalse: TrueFalseSchema
},{collection: 'questions'})

