const {
    AuthenticationError,
    UserInputError,
  } = require('apollo-server');
const bcrypt = require('bcryptjs')

const Member = require('../../../mongo/models/member')
const Team = require('../../../mongo/models/team')


module.exports = {
    createMember: async (parent, args) =>{
        try {
            const existingMembers = await Member.find({email:args.email})
            const requestedteam = await Team.findOne({_id:args.team})
            const hashedPassword = await bcrypt.hash(args.password,10)
            if(existingMembers.length==0){
                const member = new Member({
                    name : args.name,
                    email :  args.email,
                    mobile :   args.mobile,
                    team:args.team,
                    password: hashedPassword,
                    role: "MEMBER"
                })
                const result = await member.save()
                requestedteam.team_members.push(result._id)
                await requestedteam.save()
                const returnMember = await Member.findOne({email:result.email}).populate('team')
                return returnMember
            }else{
                throw new UserInputError('User Email Already Exists')
            }
        } catch (error) {
            throw new Error(error)
        }
    },
    editMember: async (parent, args) =>{
        try {
            const existingMembers = await Member.find({email:args.email})
            if(existingMembers.length!=0){
                const member = await Member.findOneAndUpdate({email:args.email}, {$set:{name:args.name,mobile:args.mobile}}, {new: true});
                return member
            }else{
                throw new UserInputError('No Such User Exists')
            }
        } catch (error) {
            throw new Error(error)
        }
    },
    deleteMember: async (parent, args) =>{
        try {
            const existingMembers = await Member.find({email:args.email})
            if(existingMembers.length!=0){
                const member = await Member.remove({email:args.email})
                return "Deleted Succesfully"
            }else{
                throw new UserInputError('No Such User Exists')
            }
        } catch (error) {
            throw new Error(error)
        }
    },
    resetPassword: async (parent, args) =>{
        try {
            const existingMembers = await Member.find({email:args.email})
            if(existingMembers.length!=0){
                if(existingMembers[0].password == args.currentpassword){
                    const member = await Member.findOneAndUpdate({email:args.email}, {$set:{password:args.newpassword}}, {new: true});
                    return member
                }else{
                    throw new UserInputError('Current Password Mismatch')
                }
            }else{
                throw new UserInputError('No Such User Exists')
            }
        } catch (error) {
            throw new Error(error)
        }
    },
}