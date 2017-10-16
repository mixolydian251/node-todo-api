const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});



// '.methods' adds instance methods to Schema

// What properties the api sends back
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    console.log(user);
    console.log(userObject);

    return {
        id: userObject._id,
        email: userObject.email
    }
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access: access
    }, 'abc123').toString();

    user.tokens.push({
        access,
        token
    });

    return user.save().then(() => {
        return token;
    })
};

 // '.statics' adds model methods to schema
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123')
    } catch(err) {
        return new Promise((resolve, reject) => {
            reject('Authentication Error')
        })
    }

    return User.findOne({
        _id: decoded._id,
        // This is how to query nested properties
        'tokens.token': token,
        'tokens.access': 'auth'

    });
};

//Middleware saves passwords as hashed value
UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next()
            })

        })
    } else {
        next();
    }
});

var User = mongoose.model('User', UserSchema );

module.exports = {
    User: User,
};