const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        name: {
            type: String,
            requierd: true,
        },
        author: {
            type: String,
            requierd: true,
        },
        genre: {
            type: String,
            requierd: true,
        },
        price: {
            type: String,
            requierd: true,
        },
        publisher: {
            type: String,
            requierd: true,
        },
    },
    {
        timestamps : true,
    }
);

// Collection will be having a name called "Books"

module.exports = mongoose.model("Books", bookSchema);
