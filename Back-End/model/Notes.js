const {model,Schema, default: mongoose} = require('mongoose')

const noteSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require : true
    },
    tag : {
        type : String,
        default : 'general'
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = model('note',noteSchema)