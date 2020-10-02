const Team = require('../../../mongo/models/team')

const { findMemberByIds} = require('../member/memberutils')

const { findProjectByIds} = require('../projects/projectutils')


module.exports = {
    getTeams: async (parent, args) =>{
        try {
            const teamLists = await Team.find()
            return teamLists.map(team=>{
                return{
                    ...team._doc , 
                    team_members:findMemberByIds(team.team_members),
                    assigned_projects:findProjectByIds(team.assigned_projects)
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    },
    getTeamById: async (parent, args) =>{
        try {
            const team = await Team.findOne({_id:args.id})
                return{
                    ...team._doc , 
                    team_members:findMemberByIds(team.team_members)
                }
        } catch (error) {
            throw new Error(error)
        }
    }
}