const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err){
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Successfully connected to MongoDB server');

    db.collection('Users').find({
        location: {
            city: 'Raleigh',
            state: 'NC'
        }
    }).toArray().then( (docs) => {
        for (i = 0; i < docs.length; i ++){
            console.log(`${i}.) ${docs[i].name} `)
        }
    }, (err) => {
        console.log('Unable to fetch database query', err)
    });
    db.close();
});

