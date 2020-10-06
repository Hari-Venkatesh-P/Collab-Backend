const mongoose = require('mongoose')

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
    type: [mongoose.Types.ObjectId],
    ref:'team',
    default:[],
  },
  member_assigned:{
    type: [mongoose.Types.ObjectId],
    ref:'member',
    default:[],
  },
  start_date :{
    type:String,
  },
  end_date :{
    type:String,
  },
  comments :{
    type: [mongoose.Types.ObjectId],
    ref:'comment',
    default:[],
  },
  created_at : {
    type: String,
    default : new Date().toDateString()
  }
})

module.exports = mongoose.model('project', ProjectSchema);