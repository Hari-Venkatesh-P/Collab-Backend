const Team = require('../../../mongo/models/team')

const { findMemberByIds} = require('../member/memberutils')

const { findProjectByIds} = require('../projects/projectutils')


module.exports = {
    getTeams: async (parent, args) =>{
        try {
            const teamLists = await Team.find()
            return teamLists.map(async team=>{
                const team_strength = await findMemberByIds(team.team_members)
                const project_count = await findProjectByIds(team.assigned_projects)
                return{
                    ...team._doc , 
                    team_members : team_strength,
                    assigned_projects : project_count,
                    team_strength: team_strength.length ,
                    project_count:project_count.length
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    },
    getTeamsAndMembers: async (parent, args) =>{
        try {
            const teamLists = await Team.find()
            return teamLists.map(async team=>{
                const team_members = await findMemberByIds(team.team_members)
                return{
                    ...team._doc , 
                    team_members: team_members ,
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    },
    getTeamById: async (parent, args) =>{
        try {
            const team = await Team.findOne({_id:args.id})
            const  team_strength = await findMemberByIds(team.team_members)
            const  project_count = await findProjectByIds(team.assigned_projects)
                return{
                    ...team._doc , 
                    team_members:findMemberByIds(team.team_members),
                    assigned_projects:findProjectByIds(team.assigned_projects),
                    team_strength:team_strength.length,
                    project_count:project_count.length
                }
        } catch (error) {
            throw new Error(error)
        }
    }
}