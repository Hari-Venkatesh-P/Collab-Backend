const mongoose = require('mongoose')

const MemberSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email:{
    type: String,
  },
  mobile:{
    type: String,
  },
  team:{
    type: mongoose.Types.ObjectId,
    ref:'team',
  },
  assigned_projects:{
    type: [mongoose.Types.ObjectId],
    ref:'project',
    default:[],
  },
  password:{
    type: String
  },
  role :{
    type:String,
  }
})


module.exports = mongoose.model('member', MemberSchema);