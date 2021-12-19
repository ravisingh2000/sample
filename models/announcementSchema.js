const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    designation: {
        type: String
    },
    annName: {
        type: String
    },
    annBody: {
        type: String
    },
    date: {
        type: Date
    }
});
const Announcement = new mongoose.model("announcement", announcementSchema);


module.exports = Announcement;