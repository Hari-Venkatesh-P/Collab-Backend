const mongoose = require('mongoose')


const TeamSchema = mongoose.Schema({
    name: {
      type: String,
    },
    team_members:{
        type: [mongoose.Types.ObjectId],
        ref:'member',
        default:[],
    },
    assigned_projects:{
      type: [mongoose.Types.ObjectId],
      ref:'project',
      default:[],
  }
  })

  module.exports = mongoose.model('team', TeamSchema);