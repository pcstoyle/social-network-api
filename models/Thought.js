const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
      reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId(),
      },
      reactionBody:
      {
          type: String,
          required: true,
          maxlength: 280,
      },
      user: {
        type: String,
        required: true,
      },
      createdAt: {
          type: Date,
          default: Date.now,
      },
  }
);

const thoughtSchema = new Schema(
  {
    thought: {
      type: String,
      required: true,
      minLength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: [ 
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
    ],
    reactions: [reactionSchema]
  },
  
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);



reactionSchema
.virtual('reaction')
.get(function () {
  return `${this.reactionId} ${this.reactionBody} ${this.username} ${this.createdAt}`
});

const Thought = model('thought', thoughtSchema)

module.exports = Thought; 


