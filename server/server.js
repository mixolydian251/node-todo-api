
    const express = require('express');
    const bodyParser = require('body-parser');
    const {ObjectID} = require('mongodb');
    const hbs = require('hbs');

    const port = process.env.PORT || 3000;

    var config = require('./config/config');
    var {mongoose} = require('./db/mongoose');
    var {Todo} = require('./models/todo');
    var {User} = require('./models/user');
    var {authenticate} = require('./middleware/authenticate');

    var app = express();

    app.use(bodyParser.json());

    // hbs.registerPartials(__dirname + '/views/partials');
    app.set('view engine', 'hbs');
    app.use(express.static(__dirname + '/public'));

    app.get('/', (req, res) => {
        res.render('home.hbs')
    });

/////////////////////Todos////////////////////////////

 // Get all
    app.get('/todos', (req, res) => {
        Todo.find().then((todos) => {
            res.send({todos});
        }).catch((error) => {
            res.status(400).send(error);
        })
    });
 // Get by Id
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
                    console.log('Item was found', JSON.stringify(todo, undefined, 4))}

            }).catch((error) => {
                res.status(400).send();
                console.log(error)
            })
        }
    });

    app.post('/todos', (req, res) => {
        var todo = new Todo({
            text: req.body.text
        });
        console.log(req.body.toArray());

        todo.save().then((doc) => {
            res.send(doc);
        }).catch((error) => {
            res.status(400).send(error);
        })
    });

    app.delete('/todos/:id', (req, res) => {
        var id = req.params.id;
        if (!ObjectID.isValid(id)){
            res.status(404).send('Invalid id')
        } else {

            Todo.findOneAndRemove(id).then((todo) => {
                if (!todo){
                    throw new Error('No matching item was found');
                } else {
                    res.send(todo);
                    console.log('Item was removed')}
            }).catch((error) => {
                res.status(400).send();
                console.log(error)
            })
        }
    });

    app.patch('/todos/:id', (req, res) => {
        var id = req.params.id;
        var body = req.body;
        if (!ObjectID.isValid(id)){
            return res.status(404).send('Invalid id')
        } if (body.completed && body.completed === 'true'){
            body.completedAt = new Date().getTime();
            body.completed = true;
        } else {
            body.completed = false;
            body.completedAt = null
        }
        Todo.findByIdAndUpdate(id, {
            $set: {
                completedAt: body.completedAt,
                completed: body.completed
            }
        }).then((todo) => {
            res.send({todo});
        }).catch((err) => {
            res.status(400).send(err)
        })
    });

/////////////////////////Users///////////////////////////

    app.get('/users', (req, res) => {
        User.find().then((users) => {
            res.send({users});
        }).catch((error) => {
            res.status(400).send(error);
        })
    });


    app.get('/users/me', authenticate, (req, res) => {
        res.send(req.user);
    });

    app.post('/users', (req, res) => {
        var user = new User({
            email: req.body.email,
            password: req.body.password,
        });
        user.save().then(() => {
            return user.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send(user)
        }).catch((error) => {
            res.status(400).send(error);
        })
    });

    app.delete('/users/:email', (req, res) => {
        var email_address = req.params.email;

        User.findOneAndRemove({email: email_address}).then((user) => {
            if (!user){
                throw new Error(`There was no entry matching the email address \"${email_address}\".`)
            } else {
                res.send(user);
                console.log('Removed the following entry: \n', user)
            }
        }).catch((error) => {
            res.status(404).send();
            console.log(error)
        })
    });



    app.listen(port, () => {
        console.log(`server is up on port ${port}`);
    });

    module.exports = {app};




