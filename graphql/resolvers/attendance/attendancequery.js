  const Attendance = require('../../../mongo/models/attendance')

  const { findMemberById} = require('../member/memberutils')


  module.exports = {
    getMemberAttendance: async (parent, args,context) =>{
        try {
            // if(!context.isValidAuth){
            //     throw new AuthenticationError("Forbidden Access")
            // }
            const existingAttendanceRecord = await Attendance.findOne({member_id:args.memberid})
            console.log(existingAttendanceRecord)
            return {
                ...existingAttendanceRecord._doc,
                member : findMemberById(existingAttendanceRecord.member_id)
            }
        } catch (error) {
            throw new Error(error)
        }
    },
    getAllMembersAttendance: async (parent, args,context) =>{
        try {
            // if(!context.isValidAuth){
            //     throw new AuthenticationError("Forbidden Access")
            // }
            const allMembersAttendanceRecord = await Attendance.find()
            return allMembersAttendanceRecord.map(async attendance =>{
                return {
                    ...attendance._doc,
                    member : findMemberById(attendance.member_id)
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    },

}