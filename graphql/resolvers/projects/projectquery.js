const Project = require('../../../mongo/models/project')

const {findTeamByIds} = require('../team/teamutils')
const {findMemberByIds} = require('../member/memberutils')
const {getCommentByIds} = require('../projects/commentutils')

module.exports = {
    getProjects: async (parent, args) =>{
        try {
            const projectLists = await Project.find()
            return projectLists.map(project=>{
                return{
                    ...project._doc , 
                    team_assigned:findTeamByIds(project.team_assigned),
                    member_assigned:findMemberByIds(project.member_assigned),
                    comments : getCommentByIds(project.comments)
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    },
    getProjectsByMember: async (parent, args) =>{
        try {
            const projectLists = await Project.find({member_assigned:args.member})
            return projectLists.map(project=>{
                return{
                    ...project._doc , 
                    team_assigned:findTeamByIds(project.team_assigned),
                    member_assigned:findMemberByIds(project.member_assigned),
                    comments : getCommentByIds(project.comments)
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    },
    getProjectsByTeam: async (parent, args) =>{
        try {
            const projectLists = await Project.find({team_assigned:args.team}).populate('team_assigned').populate('member_assigned')
            return projectLists
        } catch (error) {
            throw new Error(error)
        }
    },
    getProjectById: async (parent, args) =>{
        try {
            const project = await Project.findOne({_id:args.id}).populate('team_assigned').populate('member_assigned')
            return project
        } catch (error) {
            throw new Error(error)
        }
    },
}