    const {ObjectID} = require('mongodb');

    const {mongoose} = require('../server/db/mongoose');
    const {Todo} = require('../server/models/todo');
    const{User} = require('../server/models/user');


    var id = '59d51d37ab19791ab63ec83311';

    if (!ObjectID.isValid(id)){
        console.log('ID is not Valid..')
    }

    //Find all by parameter returns array
    Todo.find({
        completed: false
    }).then((todos) => {
        console.log('Todos', todos)
    }).catch((err) => {
        console.log('Unable to computer', err)
    });

    // Find first result by parameter returns obj
    Todo.findOne({
        _id: id
    }).then((todo) => {
        if (!todo) {
            throw new Error('Invalid id value')
        }
        console.log('Todo', todo)
    }).catch((err) => {
        console.log('Unable to computer!  -- ', err)
    });

    //Find by a unique I.D. returns obj
    Todo.findById(id).then((todo) => {
        if (!todo) {
            throw new Error('Invalid id value')
        }
        console.log('Todo', todo)
    }).catch((err) => {
        console.log('Unable to computer..', err)
    });

    User.findById('59d51904c3a2651a4b3e9c9b').then((user) => {
        console.log(`User name: ${user.name}`)
    }).catch((err) => {
        console.log('Sorry bruh.. I couldn\'t do that', err)
    });



