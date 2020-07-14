const mongoose = require("mongoose");

const AlarmSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    time: {
        type: String,
        required: true,
        trim: true,
    },
    meridiem: {
        type: String,
        required: true,
        trim: true,
    },
    isOn: {
        type: Boolean,
        default: false,
    },
});

const Alarm = mongoose.model("alarm", AlarmSchema);
module.exports = Alarm;
