var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: true, max: 255},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    mobile_number: {type:Number},
    status: {type: String, enum: ['Active','Inactive']},
    created: [Date],
    updated: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model('User', userSchema);