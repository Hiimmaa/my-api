const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: false
        },
        gender: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false
        }
    });

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;