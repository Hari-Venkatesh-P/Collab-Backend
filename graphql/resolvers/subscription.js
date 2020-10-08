  
const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

const topics = {
    TEAM_ADDED : 'TEAM_ADDED',
    MEMBER_ADDED : 'MEMBER_ADDED',
    PROJECT_ADDED : 'PROJECT_ADDED'
} 

const subscriptions = {
    teamAdded: {
        subscribe: () => pubsub.asyncIterator([topics.TEAM_ADDED])
    },
    memberAdded : {
        subscribe: () => pubsub.asyncIterator([topics.MEMBER_ADDED])
    },
    projectAdded : {
        subscribe: () => pubsub.asyncIterator([topics.PROJECT_ADDED])
    }
}

module.exports={
    pubsub,
    topics,
    subscriptions,
}