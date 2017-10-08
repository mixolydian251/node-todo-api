    const {ObjectID} = require('mongodb');

    const {mongoose} = require('../server/db/mongoose');
    const {Todo} = require('../server/models/todo');
    const{User} = require('../server/models/user');


    // Todo.remove({}).then((res) => {
    //     console.log(res)
    // });

    // Todo.findOneAndRemove({_id: '59da9029b52bd7578cabc02f'}).then((res) => {
    //     console.log(res)
    // });

    Todo.removeOne({}).then((res) => {
       console.log(res)
    });