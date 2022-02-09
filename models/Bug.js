const {SchemaTypes: SchemaTypes, Schema: Schema, model: model} = require('mongoose')

//const User = require('./User')

const BugSchema = new Schema({
    user:{
        type: SchemaTypes.ObjectId,
        ref: 'user'
    },
    asignee: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const Bug = model('bug', BugSchema);

module.exports = Bug;