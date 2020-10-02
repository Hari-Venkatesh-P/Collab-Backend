const Members = require('../../../mongo/models/member')

const {findProjectByIds} = require('../projects/projectutils')
const { findTeamById } = require('../team/teamutils')


const findMemberByIds = async (memeberIds) =>{
    try {
        const memberList = await Members.find({_id:{$in:memeberIds}})
        return memberList.map(member=>{
            return {
                ...member._doc,
                assigned_projects: findProjectByIds(member.assigned_projects),
                team: findTeamById(member.team)
            }
        })
    } catch (error) {
        throw new Error("Error in findMemberByIds   :"+error)
    }
}

const findMemberById = async (memberId) =>{
    try {
        const member= await Members.findOne({_id:memberId}).populate('team')
        return {
            ...member._doc,
            assigned_projects: findProjectByIds(member.assigned_projects)
        }
    } catch (error) {
        throw new Error("Error in findMemberById    :"+error)
    }
}


exports.findMemberByIds = findMemberByIds ;
exports.findMemberById = findMemberById ;