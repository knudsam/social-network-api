const { Schema, model } = require('mongoose');
const reactionModel = require('./reaction');
const dateFormat = require('../utils/dateUtil');


const thoughts = new Schema(

  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 1000
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp, 'yyyy-MM-dd HH:mm:ss')
    },

    username: {
      type: String,
      required: true
    },

    reactions: [reactionModel]
  },

  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false 
  }
);

thoughts.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughts);

module.exports = Thought;