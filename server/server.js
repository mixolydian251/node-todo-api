    const express = require('express');
    const bodyParser = require('body-parser');
    const {ObjectID} = require('mongodb');
    const hbs = require('hbs');

    const port = process.env.PORT || 3000;

    var {mongoose} = require('./db/mongoose');
    var {Todo} = require('./models/todo');
    var {User} = require('./models/user');

    var app = express();

    app.use(bodyParser.json());

    // hbs.registerPartials(__dirname + '/views/partials');
    app.set('view engine', 'hbs');
    app.use(express.static(__dirname + '/public'));

    app.get('/', (req, res) => {
        res.render('home.hbs')
    });

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

    app.get('/todos/:id', (req, res) => {
        var id = req.params.id;
        if (!ObjectID.isValid(id)){
            res.status(404).send('Invalid id')
        } else {

            Todo.findById(id).then((todo) => {
                if (!todo){
                    throw new Error('No matching item was found');
                } else {
                    res.send(todo);
                    console.log('Item was found')}
            }).catch((error) => {
                res.status(400).send();
                console.log(error)
            })
        }
    });

    app.get('/users', (req, res) => {
        User.find().then((users) => {
            res.send({users});
        }).catch((error) => {
            res.status(400).send(error);
        })
    });

    app.listen(port, () => {
        console.log(`server is up on port ${port}`);
    });

    module.exports = {app};




