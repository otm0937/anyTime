const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    startTime: {
        type: String,
        required: true,
        trim: true,
    },
    startMeridiem: {
        type: String,
        required: true,
        trim: true,
    },
    endTime: {
        type: String,
        required: true,
        trim: true,
    },
    endMeridiem: {
        type: String,
        required: true,
        trim: true,
    },
    isOn: {
        type: Boolean,
        default: false,
    },
});

const Schedule = mongoose.model("schedule", ScheduleSchema);
module.exports = Schedule;
