var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: true, max: 255, trim: true},
    email: {type: String, required:true, unique:true, trim: true},
    password: {type: String, required:true},
    mobile_number: {type:Number, trim: true},
    status: {type: String, enum: ['Active','Inactive']},
},{
    timestamps: true
});

// Export the model
module.exports = mongoose.model('User', userSchema);