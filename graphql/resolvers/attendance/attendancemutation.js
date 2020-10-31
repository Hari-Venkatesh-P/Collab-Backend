const {
    AuthenticationError,
    UserInputError,
  } = require('apollo-server');

  const Attendance = require('../../../mongo/models/attendance')

  const { findMemberById} = require('../member/memberutils')


  module.exports = {
    createAttendance: async (parent, args,context) =>{
        try {
            // if(!context.isValidAuth){
            //     throw new AuthenticationError("Forbidden Access")
            // }
            var leave = {
                reason : args.reason,
                start_time:args.reason,
                end_time : args.end_time,
                start_date : args.start_date,
                end_date: args.end_date,
                leave_type : args.type,
            }
            var result
            const existingAttendanceRecord = await Attendance.findOne({member_id:args.memberid})
            if(existingAttendanceRecord!=null){
                existingAttendanceRecord.attendance.push(leave);
                result = await existingAttendanceRecord.save();
            }else{
                result = new Attendance({
                    member_id:args.memberid,
                    attendance : [leave]
                })
                result = await result.save();
            }
            return {
                ...result._doc,
                member : findMemberById(result.member_id)
            }
        } catch (error) {
            throw new Error(error)
        }
    },

}