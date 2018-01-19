// require mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;
// create the schema
const surveySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true 
  },
  question: {
  	type: String,
  	required: true,
    minlength: 3,
  	trim: true
  },
  pollOptions: [{answer: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  vote: {
    type: Number,
    required: true,
    trim: true
  }}]
  },
  {timestamps: true
  }
)

module.exports = mongoose.model('Survey', surveySchema);