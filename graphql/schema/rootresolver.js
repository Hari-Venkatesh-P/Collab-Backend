const memberMutation = require('../resolvers/member/membermutation')
const memberQuery = require('../resolvers/member/memberquery')
const teamMutation = require('../resolvers/team/teammutation')
const teamQuery = require('../resolvers/team/teamquery')
const projectMutation = require('../resolvers/projects/projectmutation')
const projectQuery = require('../resolvers/projects/projectquery')
const rootSubscription = require('../resolvers/subscription')
const attendanceMutation = require('../resolvers/attendance/attendancemutation')
const attendanceQuery = require('../resolvers/attendance/attendancequery')

const rootResolver = {
    RootQuery:{
        ...memberQuery,
        ...teamQuery,
        ...projectQuery,
        ...attendanceQuery
    },
    RootMutation:{
        ...memberMutation,
        ...teamMutation,
        ...projectMutation,
        ...attendanceMutation,
    },
    RootSubscription:{
        ...rootSubscription.subscriptions
    }
}

module.exports = rootResolver;