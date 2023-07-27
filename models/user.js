const { Schema, model } = require('mongoose');

const users = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxLength: 17,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            // regex for checking the most common email types
            match: [/.+@.+\..+/, 'Please enter a valid email address'],
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },

    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false, 
    }
);


users.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', user);

module.exports = User;