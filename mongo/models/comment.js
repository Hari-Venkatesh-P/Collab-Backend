const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    content: {
      type: String,
    },
    created_by:{
        type:mongoose.Types.ObjectId,
        ref:'member',
    },
    created_at :{
      type: Date,
      default: new Date()
    },
  })

module.exports = mongoose.model('comment', CommentSchema);
