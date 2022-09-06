const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: String,
    leadTeacher: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    startDate: Date,
    endDate: Date,
    ta: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    courseImg: { type: String, default: 'https://i.stack.imgur.com/l60Hf.png' },
    description: String,
    status: { type: String, enum: ['ON', 'OFF'], default: 'ON' },
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;
