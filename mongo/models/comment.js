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
      type: String,
      default : new Date().toDateString()
    },
  })

module.exports = mongoose.model('comment', CommentSchema);
