const {
    AuthenticationError,
    UserInputError,
  } = require('apollo-server');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const Member = require('../../../mongo/models/member')
const Team = require('../../../mongo/models/team')

const {findTeamById} = require('../team/teamutils')
const {findProjectByIds} = require('../projects/projectutils')


const {pubsub,topics} = require('../subscription')

module.exports = {
    createMember: async (parent, args) =>{
        try {
            const existingMembers = await Member.find({email:args.email})
            const existingMembersWithSameMobile = await Member.find({mobile:args.mobile})
            if(existingMembersWithSameMobile.length !==0){
                throw new UserInputError('Mobile Number Already registrered')
            }
            const requestedteam = await Team.findOne({_id:args.team})
            const hashedPassword = await bcrypt.hash(args.password,10)
            if(existingMembers.length==0){
                const member = new Member({
                    name : args.name,
                    email :  args.email,
                    mobile :   args.mobile,
                    dob : args.dob,
                    address : args.address,
                    gender : args.gender,
                    team:args.team,
                    password: hashedPassword,
                    role: "MEMBER"
                })
                const result = await member.save()
                requestedteam.team_members.push(result._id)
                await requestedteam.save()
                await pubsub.publish(topics.MEMBER_ADDED, { memberAdded: args.name+" has joined us ..!" })
                return {
                    ...result._doc,
                    team  : findTeamById(result.team),
                    project_count :  0
                }
            }else{
                throw new UserInputError('User Email Already Exists')
            }
        } catch (error) {
            throw new Error(error)
        }
    },
    editMember: async (parent, args) =>{
        try {
            const existingMobile = await Member.findOne({mobile:args.mobile})
            if(existingMobile && existingMobile._id != args.id){
                throw new UserInputError('Mobile Already Exists')
            }
            const existingMembers = await Member.find({_id:args.id})
            if(existingMembers.length!=0){
                const member = await Member.findOneAndUpdate({_id:args.id}, {$set:{name:args.name,mobile:args.mobile,address:args.address}}, {new: true});
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
            const existingMembers = await Member.find({_id:args.id})
            if(existingMembers.length!=0){
                const member = await Member.remove({_id:args.id})
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
            const existingMembers = await Member.findOne({_id:args.id})
            if(existingMembers!=null){
                if(existingMembers.password == args.currentpassword){
                    const hashedPassword = await bcrypt.hash(args.newpassword,10)
                    const member = await Member.findOneAndUpdate({_id:args.id}, {$set:{password:args.hashedPassword}}, {new: true});
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
    login: async (parent, args) =>{
        try {
            const existingMember = await Member.findOne({email:args.email})
            if(existingMember!=null){
                if(existingMember.password == args.password){
                    const  token = await jwt.sign({name:existingMember.name,id:existingMember._id,role:existingMember.role}, 'collabs-encryption')
                    const team = findTeamById(existingMember.team)
                    return {
                        ...existingMember._doc, 
                        team : team,
                        token:token
                    }
                }else{
                    throw new AuthenticationError('Password Mismatch')
                }
            }else{
                throw new AuthenticationError('No Such User Email Exists')
            }
        } catch (error) {
            throw new Error(error)
        }
    },
}