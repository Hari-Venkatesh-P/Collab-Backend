const Team = require('../../../mongo/models/team')

module.exports = {
    getTeams: async (parent, args) =>{
        try {
            const teamLists = await Team.find()
            return teamLists
        } catch (error) {
            throw new Error(error)
        }
    }
}