const memberMutation = require('../resolvers/member/membermutation')
const memberQuery = require('../resolvers/member/memberquery')
const teamMutation = require('../resolvers/team/teammutation')
const teamQuery = require('../resolvers/team/teamquery')
const projectMutation = require('../resolvers/projects/projectmutation')
const projectQuery = require('../resolvers/projects/projectquery')

const rootResolver = {
    RootQuery:{
        ...memberQuery,
        ...teamQuery,
        ...projectQuery
    },
    RootMutation:{
        ...memberMutation,
        ...teamMutation,
        ...projectMutation,
    },
}

module.exports = rootResolver;