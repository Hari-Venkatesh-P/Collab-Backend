const Member = require('../../../mongo/models/member')

const { findProjectByIds} = require('../projects/projectutils')
const { findMemberById} = require('../member/memberutils')
const {findTeamById} = require('../team/teamutils')

module.exports = {
    getMembers: async (parent, args) =>{
        try {
            const memberList = await Member.find()
            return memberList.map(member=>{
                return {
                    ...member._doc,
                    assigned_projects: findProjectByIds(member.assigned_projects),
                    team: findTeamById(member.team)
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    },
    getMemberById: async (parent, args) =>{
        try {
            const member = await  findMemberById(args.id)
            return member
        } catch (error) {
            throw new Error(error)
        }
    }
}