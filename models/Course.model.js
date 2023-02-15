const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String
    },
    leadTeacher:
      [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    ta: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    courseImg: {
      type: String
    },
    description: {
      type: String
    },
    status: {
      type: String,
      enum: ['ON', 'OFF'],
      default: 'ON'
    },
    students: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true
  }
)

module.exports = model('Course', courseSchema)
