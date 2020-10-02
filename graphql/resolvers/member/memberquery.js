const Member = require('../../../mongo/models/member')


const { findProjectByIds} = require('../projects/projectutils')

module.exports = {
    getMembers: async (parent, args) =>{
        try {
            const memberLists = await Member.find().populate('team')
            return memberLists
        } catch (error) {
            throw new Error(error)
        }
    },
    getMemberById: async (parent, args) =>{
        try {
            const member = await Member.findOne({_id:args.id})
            return {
                ...member._doc , 
                assigned_projects:findProjectByIds(member.assigned_projects)
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}