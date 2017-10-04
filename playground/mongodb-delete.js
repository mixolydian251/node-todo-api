const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err){
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Successfully connected to MongoDB server');

    //deleteMany - deletes all matching queries


    //deleteOne - deletes first matching query

    //findOneAndDelete
    db.collection('Users').findOneAndDelete({text: 'Take a shower', completed: false}, {
        completed: true
    }).then((results) => {
        console.log('Deleted the following documents', results)
    }, (err) => {
        console.log('Unable to delete document', err)
    });

    db.close();
});