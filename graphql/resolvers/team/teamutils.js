const Team = require('../../../mongo/models/team')

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
        const team= await Team.find({_id:teamId})
        return team
    } catch (error) {
        throw new Error("Error in find team by id : "+error)
    }
}


exports.findTeamByIds = findTeamByIds ;
exports.findTeamById = findTeamById ;
