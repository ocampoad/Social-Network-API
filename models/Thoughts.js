const { Schema, model, default: mongoose } = require('mongoose');

const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
});

const reactionSchema =  new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

const Thoughts = mongoose.model('Thoughts', thoughtsSchema);

module.exports = {Thoughts}
