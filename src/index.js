const express = require('express');
const connect = require('./configs/db');
const app = express();
const {register,login} = require('./controllers/auth.controller');
const todoContoller = require('./controllers/todo.controller');
app.use(express.json());

app.use('/register',register);
app.use('/login',login);
app.use('/todos',todoContoller);



app.listen(5000, async() => {
    try {
        await connect();
        console.log("Listening to port no. 5000");
    } catch (error) {
        console.log(error.message);
    }
});