const mongoose = require("mongoose");

const connect = ()=>{
    return mongoose.connect("mongodb+srv://sam7789:XN0ynbM9n8KmXqZL@cluster0.omfqq.mongodb.net/Authentication?retryWrites=true&w=majority");
}
module.exports = connect;