const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
  content: {
    type: String,
  },
  created_at :{
    type: Date,
    default: new Date()
  }
})

const ProjectSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description:{
    type: String,
  },
  status:{
    type: String,
  },
  team_assigned:{
    type: mongoose.Types.ObjectId,
    ref:'team',
  },
  member_assigned:{
    type: mongoose.Types.ObjectId,
    ref:'member',
  },
  start_date :{
    type:String,
  },
  end_date :{
    type:String,
  },
  comments :{
    type:[CommentSchema],
    default:[]
  }
})


module.exports = mongoose.model('project', ProjectSchema);