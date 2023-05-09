import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({

    bookTitle: {
        type: String,
        required: [true, "Please add a title"]
    },
    bookAuthor: {
        type: String,
        required: [true, "Please add an author"]
    },

    bookImage: String

})