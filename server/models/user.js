// require mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;
// create the schema
const userSchema = new Schema({
  name: {
  	type: String,
  	required: true,
  	minlength: 3,
  	trim: true
  },
  email: { type: String, required: true, minlength: 3, unique: true,
    validate: {
        validator: function( value ) {
          console.log("checking email here");
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( value );
      },
      message: "Email needs to be in the correct format"
    }
  },
	password_hash: { type: String, required: true, minlength: 3},
  surveys:[{ type: Schema.Types.ObjectId, ref: 'Survey' }]},
  {timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema);