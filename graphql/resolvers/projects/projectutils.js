const Project = require('../../../mongo/models/project')

const findProjectByIds = async (projectIds) =>{
    try {
        const projectLists = await Project.find({_id:{$in:projectIds}})
        return projectLists
    } catch (error) {
        throw new Error("Error in find project by ids : "+error)
    }
}

const findProjectById = async (projectId) =>{
    try {
        const project= await Project.find({_id:projectId})
        return project
    } catch (error) {
        throw new Error("Error in find project by id : "+error)
    }
}

const findProjectAlreadyAssigned = async (newProjectId,existingProjects) =>{
    try {
       for(i=0;i<existingProjects.length;i++){
          if(existingProjects[i].toString()==newProjectId.toString()){
              return true
          }
       }
       return false
    } catch (error) {
        throw new Error("Error while finding project already assigned to Member : "+error)
    }
}

exports.findProjectByIds = findProjectByIds ;
exports.findProjectById = findProjectById ;
exports.findProjectAlreadyAssigned = findProjectAlreadyAssigned;