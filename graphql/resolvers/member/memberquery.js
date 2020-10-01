const Member = require('../../../mongo/models/member')

module.exports = {
    getMembers: async (parent, args) =>{
        try {
            const memberLists = await Member.find().populate('team')
            return memberLists
        } catch (error) {
            throw new Error(error)
        }
    }
}