const mongoose = require('mongoose')


const leaveSchemaJson = {
    leave_type : {
        type : String,
    },
    reason : {
        type: String,
    },
    start_time : {
        type: String,
        default : new Date().toDateString()
    },
    end_time : {
        type: String,
        default : new Date().toDateString()
    },
    start_date :{
        type: String,
        default : new Date().toDateString()
    },
    end_date :{
        type: String,
        default : new Date().toDateString()
    },
}
const AttendanceSchema = mongoose.Schema({
    member_id :{
        type: mongoose.Types.ObjectId,
        ref:'member',
    },
    attendance:{
        type : [leaveSchemaJson],
        default:[],
    },
  })

module.exports = mongoose.model('attendance', AttendanceSchema);
