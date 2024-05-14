import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publicationYear: {
        type: Number,
        required: true,
    },
});

const bookModel = mongoose.model("book", bookSchema);
export default bookModel;