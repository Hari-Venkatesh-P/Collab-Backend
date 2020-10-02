const {
    AuthenticationError,
    UserInputError,
  } = require('apollo-server');


const Project = require('../../../mongo/models/project')
const Team = require('../../../mongo/models/team')
const Member = require('../../../mongo/models/member');


const { findMemberById} = require('../member/memberutils')
const { findTeamById} = require('../team/teamutils')


module.exports = {
    createProject: async (parent, args) =>{
        try {
            const existingProject = await Project.find({title:args.title})
            if(existingProject.length==0){
                const requestedteam = await Team.findOne({_id:args.team_assigned})
                const requestedmember = await Member.findOne({_id:args.member_assigned})
                const project = new Project({
                    title : args.title,
                    description: args.description,
                    status:"CREATED",
                    team_assigned:args.team_assigned,
                    member_assigned:args.member_assigned,
                    start_date:args.start_date,
                    end_date : args.end_date,
                })
                const result = await project.save()
                requestedteam.assigned_projects.push(result._id)
                await requestedteam.save()
                requestedmember.assigned_projects.push(result._id)
                await requestedmember.save()
                const returnProject = await Project.findOne({_id:result._id}).populate('team_assigned').populate('member_assigned')
                return{
                    ...returnProject._doc , 
                    team_assigned:findTeamById(returnProject.team_assigned),
                    member_assigned:findMemberById(returnProject.member_assigned)
                }
            }else{
                throw new UserInputError('Project already Exists')
            }
        } catch (error) {
            throw new Error(error)
        }
    },
    updateProjectStatus: async (parent, args) =>{
        try {
            const existingProject = await Project.findOne({_id:args.id})
            if(existingProject!=null){
                if(args.status=="DELAYED" && args.content){
                    existingProject.status = "DELAYED"
                    existingProject.comments.push({content:args.content,created_at: new Date().toISOString()})
                }else{
                    throw new UserInputError('Comment is Mandatory')
                }
                if(args.status=="COMPLETED"){
                    existingProject.status = "COMPLETED"
                }
                const updatedProject = await existingProject.save()
                console.log(updatedProject)
                return updatedProject
            }else{
                throw new UserInputError('No Project Found')
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}