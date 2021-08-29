const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    id: String,
    password: String,
    token: String
})

userSchema.methods.generateToken = function(cb){
    var user = this
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    jwt.verify(token, 'secretToken', function(err, decoded){
        user.findOne({_id: decoded, token: token}, function(err,user){
            if(err) return cb(err)
            cb(null, user)
        })
    })
}


const User = mongoose.model('User', userSchema)

module.exports = { User }