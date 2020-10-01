const mongoose = require('mongoose')


const TeamSchema = mongoose.Schema({
    name: {
      type: String,
    },
    team_members:{
        type: [mongoose.Types.ObjectId],
        ref:'member',
        default:[],
    }
  })

  module.exports = mongoose.model('team', TeamSchema);