const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err){
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Successfully connected to MongoDB server');


    db.collection('Users').find().toArray().then((res) => {
        var names = [];
        var duplicates = [];
        res.forEach((item) => {
            if (names.includes(item.name)){
                duplicates.push(item.name)
            } else {
                names.push(item.name)
            }
        });
        return duplicates
    }).then((duplicates) => {
        duplicates.forEach((dup) => {
            db.collection('Users').findOneAndDelete({name: dup}).catch()
        });
        console.log(`Removed ${duplicates.length} duplicate files from the database`, duplicates)
    }).catch();

    //db.close();
});