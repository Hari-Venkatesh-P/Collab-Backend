const Project = require('../../../mongo/models/project')

module.exports = {
    getProjects: async (parent, args) =>{
        try {
            const projectLists = await Project.find().populate('team_assigned').populate('member_assigned')
            return projectLists
        } catch (error) {
            throw new Error(error)
        }
    },
    getProjectsByMember: async (parent, args) =>{
        try {
            const projectLists = await Project.find({member_assigned:args.member}).populate('team_assigned').populate('member_assigned')
            return projectLists
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