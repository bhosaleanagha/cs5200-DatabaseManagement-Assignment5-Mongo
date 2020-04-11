const mongoose = require('mongoose');
const studentSchema = require('../models/student.schema.server')
module.exports = mongoose.model('StudentModel',studentSchema)