const Members = require('../../../mongo/models/member')

const findMemberByIds = async (memeberIds) =>{
    try {
        const memberList = await Members.find({_id:{$in:memeberIds}})
        return memberList
        // return events.map(event=>{
        //     return {...event._doc}
        // })
    } catch (error) {
        throw new Error("Error in findMemberByIds   :"+error)
    }
}

const findMemberById = async (memberId) =>{
    try {
        const member= await Members.find({_id:memberId})
        return member
    } catch (error) {
        throw new Error("Error in findMemberById    :"+error)
    }
}


exports.findMemberByIds = findMemberByIds ;
exports.findMemberById = findMemberById ;