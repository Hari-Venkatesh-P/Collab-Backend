const Team = require('../../../mongo/models/team')
const { findMemberByIds } = require('../member/memberutils')
const { findProjectByIds } = require('../projects/projectutils')

const findTeamByIds = async (teamIds) =>{
    try {
        const TeamLists = await Team.find({_id:{$in:teamIds}})
        return TeamLists
    } catch (error) {
        throw new Error("Error in find team by ids : "+error)
    }
}

const findTeamById = async (teamId) =>{
    try {
        const team= await Team.findOne({_id:teamId})
        const project_count = await findProjectByIds(team.assigned_projects)
        const team_strength = await findMemberByIds(team.team_members)
        return {
            ...team._doc,
            project_count : project_count.length,
            team_strength : team_strength.length
        }
    } catch (error) {
        throw new Error("Error in find team by id : "+error)
    }
}


exports.findTeamByIds = findTeamByIds ;
exports.findTeamById = findTeamById ;
