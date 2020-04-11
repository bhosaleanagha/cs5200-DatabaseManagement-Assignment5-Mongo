const mongoose = require('mongoose')

//Student
const studentModel = require('../models/student.model.server')
createStudent = student =>studentModel.create(student);

//Question
const questionModel = require('../models/question.model.server')
createQuestion = question => questionModel.create(question);

//Answer
const answerModel = require('../models/answer.model.server')
createAnswer = answer => answerModel.create(answer)


//truncateDatabase
async function truncateDatabase(){
  await this.deleteAllAnswers();
  await this.deleteAllQuestions();
  await this.deleteAllStudents();
}

//populateDatabase
async function populateDatabase(){
  await this.createStudent(
      { _id: '123',
        firstName: 'Alice',
        lastName: 'Wonderland',
        userName: 'alice',
        password: 'alice',
        gradYear: '2020',
        scholarship: '15000'}
  );

  await this.createStudent( {
    _id: '234',
    firstName: 'Bob',
    lastName: 'Hope',
    userName: 'bob',
    password: 'bob',
    gradYear: '2021',
    scholarship: '12000'});

  await this.createQuestion({
    _id: 321,
    question : 'Is the following schema valid?',
    point : 10,
    questionType : 'TRUE_FALSE',
    trueFalse: {isTrue : false}
  })

  await this.createQuestion({
    _id: 432,
    question : 'DAO stands for Dynamic Access Object.',
    point : 10,
    questionType : 'TRUE_FALSE',
    trueFalse: {isTrue : false}
  })

  await this.createQuestion({
    _id: 543,
    question : 'What does JPA stand for?',
    point : 10,
    questionType : 'MULTIPLE_CHOICE',
    multipleChoice : {
      choices: "Java Persistence API,Java Persisted Application,JavaScript "
          + "Persistence API,JSON Persistent Associations",
      correct: 1}
  })

  await this.createQuestion({
    _id: 654,
    question : 'What does ORM stand for?',
    point : 10,
    questionType : 'MULTIPLE_CHOICE',
    multipleChoice : {
      choices: "Object Relational Model,Object Relative Markup,Object "
          + "Reflexive Model,Object Relational Mapping",
      correct: 4}
  })

  await this.createAnswer({
    _id : 123,
    trueFalseAnswer: true,
    student:123,
    question:321
  })

  await this.createAnswer({
    _id : 234,
    trueFalseAnswer: false,
    student: 123,
    question:432
  })

  await this.createAnswer({
    _id : 345,
    multipleChoiceAnswer: 1,
    student:123,
    question:543
  })

  await this.createAnswer({
    _id : 456,
    multipleChoiceAnswer: 2,
    student:123,
    question:654
  })

  await this.createAnswer({
    _id : 567,
    trueFalseAnswer: false ,
    student:234,
    question:321
  })

  await this.createAnswer({
    _id : 678,
    trueFalseAnswer: true,
    student:234,
    question:432
  })

  await this.createAnswer({
    _id : 789,
    multipleChoiceAnswer: 2,
    student:234,
    question:543
  })

  await this.createAnswer({
    _id : 890,
    multipleChoiceAnswer: 2,
    student:234,
    question:654
  })
}

//DeleteById
deleteStudent = userId =>{studentModel.deleteOne({_id : userId})}
deleteQuestions = questionId => {questionModel.deleteOne({_id :questionId})}
deleteAnswers = answerId => {answerModel.deleteOne({_id: answerId})}

//DeleteAll
deleteAllAnswers = () => {answerModel.deleteMany({}).then(status=>{console.log(status)});}
deleteAllQuestions = () => {questionModel.deleteMany({}).then(status=>{console.log(status)});}
deleteAllStudents =() => {studentModel.deleteMany({}).then(status=>{console.log(status)});}

//findAll
findAllStudents = () => studentModel.find();
findAllQuestions = () => questionModel.find();
findAllAnswers = () => answerModel.find();

//findById
findStudentById = userId => {studentModel.findById(userId)}
findQuestionById = questionId => {questionModel.findById(questionId)}
findAnswerById = answerId => {answerModel.findById(answerId)}

//findAnswersByStudentId
findAnswersByStudent = studentId => {answerModel.find({student: studentId})}

//findAnswerByQuestion
findAnswersByQuestion = questionId => {answerModel.find({question: questionId})}

//For Test 3 studencount
async function studentCount(){
  return await studentModel.countDocuments();
}

//For Test 4
async function questionCount(){
  return await questionModel.countDocuments();
}

//For Test 5
async function answerCount(){
  return await answerModel.countDocuments();
}

//For test8
async function deleteStudentByFirstName(firstName){
  await studentModel.deleteOne({firstName: firstName});
  await this.studentCount().then(count => console.log("Student count after deletion: "+ count))
}

//For test7
async function deleteQuestionByQuestion(question){
  await questionModel.deleteOne({question: question});
  await  this.questionCount().then(count => console.log("Question count after deleteion: "+count))
}

//For test6
async function deleteAnswerByStudentQuestion(firstname,question){
  let  StudentId = await studentModel.findOne({firstName: firstname},{_id:1})
  let QuestionId = await questionModel.findOne({question: question},{_id:1})
  await answerModel.deleteOne({question:QuestionId._id, student:StudentId._id})
  //await this.answerCount().then(count => console.log("Answer count after delete"))
}

//helper
async function countAnswerPerStudent(firstname){
  let  StudentId = await studentModel.findOne({firstName: firstname},{_id:1})
  await  answerModel.countDocuments({student : StudentId._id}).then((count)=>console.log("The answers count for " +count))
}

//Answerquestion
async function answerQuestion(studentid,questionid,answer){
  let answer1 = await answerModel.findById(answer._id)
  if(answer1){
    answer1['student'] = studentid;
    answer1['question'] = questionid;
    answer1.save();
    answerModel.update({_id:answer1._id},{$set:{answer1}})
  }
  else{
    answer['student'] = studentid;
    answer['question'] = questionid;
    await this.createAnswer(answer);
  }
}


module.exports = {createQuestion,createStudent,createAnswer,populateDatabase,
  truncateDatabase, deleteAllAnswers,deleteAllQuestions,deleteAllStudents,findAllStudents,
findAllQuestions,findAllAnswers,studentCount,questionCount,answerCount, deleteStudentByFirstName,
deleteQuestionByQuestion,deleteAnswerByStudentQuestion,countAnswerPerStudent,
  answerQuestion}