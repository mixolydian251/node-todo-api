    // const {ObjectID} = require('mongodb');
    //
    // const {mongoose} = require('../server/db/mongoose');
    // const {Todo} = require('../server/models/todo');
    // const{User} = require('../server/models/user');
    //
    // User.find({_id: '59d2851348a3b6125d48c86f'}).then((res) => {
    //     console.log(res)
    // });

    obj = {
        text: 'do something',
        completed: false,
        time: null,
        unrelated: 15
    };

    patch = () => {
        arr = [];
        for(var key in obj){
            if(key === 'text' || key === 'completed'){
                arr.push([key, obj[key]])
            }
        }
        return arr
    };

    function doStuff() {
        if(patch()[1][1] === false){
            obj.completed = true
        } else if (patch()[1][1] === true){
            obj.completed = false
        }
        obj.time = new Date().getTime()
    }




    body = {
        text: patch()[0][1],
        completed: patch()[1][1],
        completedAt: new Date().getTime()
    };

    doStuff();
    console.log(obj);
    console.log(body);








