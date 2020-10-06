const Member = require('../../../mongo/models/member')

const { findProjectByIds} = require('../projects/projectutils')
const { findMemberById} = require('../member/memberutils')
const {findTeamById} = require('../team/teamutils')

module.exports = {
    getMembers: async (parent, args) =>{
        try {
            const memberList = await Member.find()
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
    getMemberById: async (parent, args) =>{
        try {
            const member = await  Member.findOne({_id:args.id})
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