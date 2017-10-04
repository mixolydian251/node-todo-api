    const express = require('express');
    const bodyParser = require('body-parser');

    var {mongoose} = require('./db/mongoose');
    var {Todo} = require('./models/todo');
    var {User} = require('./models/user');

    var app = express();

    app.use(bodyParser.json());

    app.post('/users', (req, res) => {
        var user = new User({
            name: req.body.name,
            email: req.body.email
        });

        user.save().then((doc) => {
            res.status(201).send(doc)
        }).catch((error) => {
            res.status(418).send(error);
        })
    });

    app.post('/todos', (req, res) => {
        var todo = new Todo({
            text: req.body.text
        });

        todo.save().then((doc) => {
            res.send(doc);
        }).catch((error) => {
            res.status(400).send(error);
        })
    });

    app.get('/todos', (req, res) => {
        Todo.find().then((todos) => {
            res.send({todos});
        }).catch((error) => {
            res.status(400).send(error);
        })
    });

    app.get('/users', (req, res) => {
        User.find().then((users) => {
            res.send({users});
        }).catch((error) => {
            res.status(400).send(error);
        })
    });

    app.listen(3000, () => {
        console.log('Started on port 3000');
    });

    module.exports = {app};




