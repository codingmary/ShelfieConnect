import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    bookTitle: {
        type: String,
        required: [true, "Please add a title"]
    },
    bookAuthor: {
        type: String,
        required: [true, "Please add an author"]
    },
    bookImage: String,

    isLent: {
        type: Boolean,
        default: false
    },
    lentTo: {
        type: String,
        default: ""
    },
    lentWhen: Date,

    isBack: {
        type: Boolean,
        default: false
    },
    isRead: {
        type: Boolean,
        default: false
    }

})