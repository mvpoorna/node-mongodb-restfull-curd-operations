var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SupplierSchema = new Schema({
    supplier_name: {type: String, required: true, max: 255, trim: true},
    company_name: {type: String, required: true, max: 255, trim: true},
    address_1: {type: Text},
    address_2: {type: Text},
    city: {type: String, trim: true},
    state: {type: String, trim: true},
    country: {type: String, default: "India"},
    phone_number: {type: Number, trim: true},
    status: {type: String, enum: ['Active','Inactive']}
},{
    timestamps: true
});


// Export the model
module.exports = mongoose.model('Supplier', SupplierSchema);