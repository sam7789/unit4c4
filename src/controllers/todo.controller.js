
const express = require('express');
const authenticate = require('../middlewares/authenticate');
const Todo = require('../models/todo.model');

const router = express.Router();

router.get('/',authenticate, async (req,res)=>{
    try {
        const todos = await Todo.find({userId: req.userId}).lean().exec();
        return res.status(200).send(todos);
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
});

router.post('/',authenticate, async (req,res)=>{
    req.body.userId = req.userId;
    try {
        let toodo = await Todo.create(req.body);
        return res.status(200).send(toodo);
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
});

router.get('/:id',authenticate, async (req,res)=>{
    try {
        let todo = await Todo.findById(req.params.id).lean().exec();
        if(req.userId == todo.userId){
            return res.status(200).send(todo);
        }
        else{
            return res.status(401).send("You are not authorise");
        }
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
});

router.patch('/:id',authenticate, async (req,res)=>{

    try {
        let todo = await Todo.findById(req.params.id).lean().exec();
        if(req.userId == todo.userId){
            todo = await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true});
            return res.status(200).send(todo);
        }
        else{
            return res.status(401).send("You are not authorise");
        }
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
});

router.delete('/:id',authenticate, async (req,res)=>{

    try {
        let todo = await Todo.findById(req.params.id).lean().exec();
        if(req.userId == todo.userId){
            todo = await Todo.findByIdAndDelete(req.params.id);
            return res.status(200).send(todo);
        }
        else{
            return res.status(401).send("You are not authorise");
        }
        
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
});

module.exports = router;