const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err){
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Successfully connected to MongoDB server');


    db.collection('Users').updateMany({age: 25}, {
        $inc: {
            age: 1
        },
    }, {
        returnOriginal: true
    }).toArray().then((results) => {
        console.log('Updated Documents', results)
    }, (err) => {
        console.log('Unable to delete document', err)
    });

    db.close();
});