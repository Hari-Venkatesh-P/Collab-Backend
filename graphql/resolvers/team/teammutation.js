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
                })
                const result = await team.save()
                return result
            }else{
                throw new UserInputError('Team already Exists')
            }
        } catch (error) {
            throw new Error(error)
        }
    },
}