const mongoose = require('mongoose');

// creates a Mongoose schema for the Contact form
const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    subscription: { type: Boolean, default: false },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model("contactus", ContactSchema);

module.exports = ContactModel;
