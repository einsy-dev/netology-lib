const { Schema, model } = require('mongoose');

const Book = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    authors: { type: String, required: true },
    favorite: { type: Boolean, default: false },
    fileCover: { type: String, required: true },
    fileName: { type: String, required: true },
    fileBook: { type: Array, required: true },
})

export default model('Book', Book);
