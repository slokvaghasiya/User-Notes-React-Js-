const {model,Schema} = require('mongoose')

const userSchema = new Schema({
    name : {
        type : String,
        require : true
    },
    emailId : {
        type: String,
        require : true,
        unique : true
    },
    password:{
        type: String,
        require:true
    },
    date : {
        type:Date,
        default : Date.now
    }
})

module.exports = model('user',userSchema)