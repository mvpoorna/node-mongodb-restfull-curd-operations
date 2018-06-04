var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: true, max: 255},
    email: {type: String, required:true, unique:true, lowercase: true},
    password: {type: String, required:true},
    mobile_number: {type:Number, min:10, max:10},
    status: {type: String, enum: ['Active','Inactive']},
    created: [Date],
    updated: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model('User', userSchema);