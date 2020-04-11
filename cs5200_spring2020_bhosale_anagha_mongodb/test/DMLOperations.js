const universityDao = require('../data/dao/university.dao.server')
//let truncateDatabase = require('../data/dao/university.dao.server')

require('../data/db')();

// truncate
async function truncateDatabase() {
  await universityDao.truncateDatabase()
}

//populate
async function populateDatabase() {
  await universityDao.populateDatabase();
}

//student count
async function testStudentInitialCount() {
  await universityDao.studentCount().then(
      (count) => console.log("The student count is " + count))
}

//question count
async function testQuestionInitialCount() {
  await universityDao.questionCount().then(
      (count) => console.log("The Question count is " + count))
}

//answer count
async function testAnswerInitialCount() {
  await universityDao.answerCount().then(
      (count) => console.log("The Answer count is " + count))
}

//delete answer
async function testDeleteAnswer(firstname, question) {
  await universityDao.deleteAnswerByStudentQuestion(firstname, question)
  await universityDao.answerCount().then(
      (count) => console.log("The Answer count is " + count))
  await universityDao.countAnswerPerStudent(firstname);
}

//delete question
async function testDeleteQuestion(question) {
  await universityDao.deleteQuestionByQuestion(
      "Is the following schema valid?");
}

//delete student
async function testDeleteStudent(firstName) {
  await universityDao.deleteStudentByFirstName(firstName)
}

//answerquestion
async function testAnswerQuestion(studentId, questionId, answer) {
  await universityDao.answerQuestion(studentId, questionId, answer)
}

//Centralised function
async function run() {
  await truncateDatabase();
  await populateDatabase();
  await testStudentInitialCount();
  await testQuestionInitialCount();
  await testAnswerInitialCount();
  await testDeleteStudent("Bob");
  await testDeleteQuestion("Is the following schema valid?");
  await testDeleteAnswer("Bob", "What does ORM stand for?");
  await testAnswerQuestion(123, 321, {_id: 479, trueFalseAnswer: 'true'})
}

run();



