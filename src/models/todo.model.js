/*title ( String, required )
createdAt
updatedAt*/

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;