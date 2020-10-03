const {
    AuthenticationError,
    UserInputError,
  } = require('apollo-server');
const bcrypt = require('bcryptjs')

const Team = require('../../../mongo/models/team')

module.exports = {
    createTeam: async (parent, args) =>{
        try {
            const existingTeam = await Team.find({name:args.name})
            if(existingTeam.length==0){
                const team = new Team({
                    name : args.name,
                    description:args.description,
                    speciality:args.speciality,
                    created_at : new Date().toISOString()
                })
                const result = await team.save()
                return {
                    ...result._doc,
                    team_strength:result.team_members.length,
                    project_count:result.assigned_projects.length
                }
            }else{
                throw new UserInputError('Team already Exists')
            }
        } catch (error) {
            throw new Error(error)
        }
    },
}