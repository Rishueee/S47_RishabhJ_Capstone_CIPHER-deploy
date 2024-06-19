const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    imageurl: {
        type: String,
    },
    user_id: {
        type: String,
    },
    email_verified: {
        type: Boolean,
    },
    ph_number: {
        type: String,
    },
    likedSongs: {
        type: Array,
    },
    role: {
        type: String,
        required: true,
    },
    subscription: {
        type: Boolean,
    },
    auth_time: {
        type: String,
        required: true,
    }
}, 
{timestamps: true}
);

module.exports = mongoose.model("users", userschema);