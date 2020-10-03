const mongoose = require('mongoose')


const TeamSchema = mongoose.Schema({
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    speciality: {
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
    },created_at : {
      type : String,
      default : new Date().toISOString()
    }
  })

  module.exports = mongoose.model('team', TeamSchema);