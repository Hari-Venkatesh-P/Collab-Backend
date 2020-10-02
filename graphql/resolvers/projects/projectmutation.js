const {
    AuthenticationError,
    UserInputError,
  } = require('apollo-server');

const Project = require('../../../mongo/models/project')
const Team = require('../../../mongo/models/team')
const Member = require('../../../mongo/models/member');


const { findMemberById,findMemberByIds} = require('../member/memberutils')
const { findTeamById,findTeamByIds} = require('../team/teamutils')
const {findProjectAlreadyAssigned} = require('../projects/projectutils')
const {createComment , getComment , getCommentByIds} = require('../projects/commentutils')

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
                    start_date:args.start_date,
                    end_date : args.end_date,
                })
                const result = await project.save()
                return result
            }else{
                throw new UserInputError('Project already Exists')
            }
        } catch (error) {
            throw new Error(error)
        }
    },
    assignProjectToMember: async (parent, args) =>{
        try {
            const projectToBeAssigned = await Project.findOne({_id:args.projectId})
            const teamToBeAssigned = await Team.findOne({_id:args.teamId})
            const memberToBeAssigned = await Member.findOne({_id:args.memberId})
            if(projectToBeAssigned!=null){
                var isProjectAlreadyAssignedToMember = await findProjectAlreadyAssigned(projectToBeAssigned._id,memberToBeAssigned.assigned_projects)
                if(isProjectAlreadyAssignedToMember){
                    throw new UserInputError('Project already assigned to the same member')
                }else{
                    var isProjectAlreadyAssignedToTeam = await findProjectAlreadyAssigned(projectToBeAssigned._id,teamToBeAssigned.assigned_projects)
                    if(!isProjectAlreadyAssignedToTeam){
                        console.log('Project assigned to the team')
                        teamToBeAssigned.assigned_projects.push(projectToBeAssigned._id)
                        await teamToBeAssigned.save()
                    }
                    console.log('Project assigned to the member')
                    memberToBeAssigned.assigned_projects.push(projectToBeAssigned._id)
                    await memberToBeAssigned.save()
                    projectToBeAssigned.member_assigned.push(memberToBeAssigned._id)
                    await projectToBeAssigned.save()
                    return {
                        ...projectToBeAssigned._doc , 
                        member_assigned:findMemberByIds(projectToBeAssigned.member_assigned),
                        team_assigned:findTeamByIds(projectToBeAssigned.team_assigned)
                    }
                }
            }else{
                throw new UserInputError('No Such Project Found')
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
                    const comment_id = await createComment(args.content,args.created_by)
                    existingProject.comments.push(comment_id)
                }else{
                    throw new UserInputError('Comment is Mandatory')
                }
                if(args.status=="COMPLETED"){
                    existingProject.status = "COMPLETED"
                }
                const updatedProject = await existingProject.save()
                return {
                    ...updatedProject._doc , 
                    team_assigned : findTeamByIds(updatedProject.team_assigned),
                    member_assigned : findMemberByIds(updatedProject.member_assigned),
                    comments : getCommentByIds(updatedProject.comments),
                }
            }else{
                throw new UserInputError('No Project Found')
            }
        } catch (error) {
            throw new Error(error)
        }
    },
    editProject: async (parent, args) =>{
        try {
            const existingProject = await Project.findOne({_id:args.id})
            if(existingProject!=null){
                existingProject.description = args.description,
                existingProject.start_date = args.start_date,
                existingProject.end_date = args.end_date
                await existingProject.save()
                return {
                    ...existingProject._doc , 
                    team_assigned : findTeamByIds(existingProject.team_assigned),
                    member_assigned : findMemberByIds(existingProject.member_assigned),
                    comments : getCommentByIds(existingProject.comments),
                }
            }else{
                throw new UserInputError('No Project Found')
            }
        } catch (error) {
            throw new Error(error)
        }
    },
    deleteProject: async (parent, args) =>{
        try {
            const projectPresent = await Project.find({_id:args.id})
            if(projectPresent.length!=0){
                const project = await Project.remove({_id:args.id})
                return "Deleted Succesfully"
            }else{
                throw new UserInputError('No Such Project Exists')
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}