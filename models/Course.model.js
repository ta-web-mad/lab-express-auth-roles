const { Schema, model } = require('mongoose');

const courseSchema = new Schema(
  {
    title: String,
    leadTeacher: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    startDate: Date,
    endDate: Date,
    ta: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    courseImg: String,
    description: String,
    status: { type: String, enum: ['ON', 'OFF'], default: 'ON' },
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true
  }
);



module.exports = model('Course', courseSchema);
