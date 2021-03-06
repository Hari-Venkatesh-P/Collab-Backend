const {
    UserInputError,
    AuthenticationError,
  } = require('apollo-server');

const bcrypt = require('bcryptjs')

const Team = require('../../../mongo/models/team')
const {pubsub,topics} = require('../subscription')

const { findMemberByIds} = require('../member/memberutils')
const { findProjectByIds} = require('../projects/projectutils')

const logger = require('../../../lib/logger')


module.exports = {
    createTeam: async (parent, args,context) =>{
        try {
            if(!context.isValidAuth){
                throw new AuthenticationError("Forbidden Access")
            }
            const existingTeam = await Team.find({name:args.name})
            if(existingTeam.length==0){
                const team = new Team({
                    name : args.name,
                    description:args.description,
                    speciality:args.speciality,
                    created_at : new Date().toISOString()
                })
                const result = await team.save()
                await pubsub.publish(topics.TEAM_ADDED, { teamAdded: args.name+" has been created !" })
                logger.info("New Team is created")
                return {
                    ...result._doc,
                    team_strength: 0,
                    project_count: 0 
                }
            }else{
                throw new UserInputError('Team already Exists')
            }
        } catch (error) {
            throw new Error(error)
        }
    },
}