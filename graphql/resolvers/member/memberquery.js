const Member = require('../../../mongo/models/member')
const {
    AuthenticationError,
  } = require('apollo-server');
const { findProjectByIds} = require('../projects/projectutils')
const {findTeamById} = require('../team/teamutils')

module.exports = {
    getMembers: async (parent, args,context) =>{
        try {
            if(!context.isValidAuth){
                throw new AuthenticationError("Forbidden Access")
            }
            const memberList = await Member.find({ _id: { $ne: args.id },role:"MEMBER" })
            var project_count
            return memberList.map(async member =>{
                project_count = await findProjectByIds(member.assigned_projects)
                return {
                    ...member._doc,
                    assigned_projects : project_count,
                    project_count: project_count.length,
                    team: findTeamById(member.team)
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    },
    getMemberById: async (parent, args,context) =>{
        try {
            if(!context.isValidAuth){
                throw new AuthenticationError("Forbidden Access")
            }
            const member = await  Member.findOne({_id:args.id,role:"MEMBER"})
            const assigned_projects = await findProjectByIds(member.assigned_projects)
            return {
                ...member._doc,
                project_count: assigned_projects.length,
                assigned_projects : assigned_projects,
                team: findTeamById(member.team)
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}