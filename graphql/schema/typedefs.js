const { gql } = require('apollo-server');

module.exports = gql`
        type Member{
            _id:ID!
            name:String!
            email:String!
            mobile:String!
            role:String!
            password:String!
            team:Team!
        }
        type Team{
            _id:ID!
            name:String!
            team_members:[Member]!
        }
        type RootQuery{
            getMembers: [Member],
            getTeams:[Team]
        }
        type RootMutation {
            createMember(name:String!,email:String!,mobile:String!,team:ID!,password:String!,role:String!): Member!
            editMember(name:String!,email:String!,mobile:String!): Member!
            deleteMember(email:String!): String!
            resetPassword(email:String!,currentpassword:String!,newpassword:String!): Member!
            createTeam(name:String!): Team!
        }
        
        schema{
            query:RootQuery
            mutation:RootMutation
        }
    `;