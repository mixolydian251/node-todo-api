//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err){
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Successfully connected to MongoDB server');

    var entries = () => {
        var entries = [];
        for (i=0; i < 10; i++) {
            entries.push({
                name: 'joe',
                age: 23,
                location: {
                    city: 'Raleigh',
                    state: 'NC'
                }
            })
        }
        return entries
    };

    db.collection('Users').insertMany(entries()).catch();

    console.log('Insert successful!');
    //console.log(JSON.stringify(result.ops, undefined, 4))

    db.close();
});

