const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    leadTeacher: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    ta: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    courseImg: {
      type: String,
      required: true
    },
    description: String,
    status: { type: String, enum: ['ON', 'OFF'], default: 'ON' },
    students: [{ type: Schema.Types.ObjectId, ref: 'User', unique: true }]
  },
  {
    timestamps: true
  }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
