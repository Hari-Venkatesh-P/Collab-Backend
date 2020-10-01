const memberMutation = require('../resolvers/member/membermutation')
const memberQuery = require('../resolvers/member/memberquery')
const teamMutation = require('../resolvers/team/teammutation')
const teamQuery = require('../resolvers/team/teamquery')

const rootResolver = {
    RootQuery:{
        ...memberQuery,
        ...teamQuery
    },
    RootMutation:{
        ...memberMutation,
        ...teamMutation
    },
}

module.exports = rootResolver;