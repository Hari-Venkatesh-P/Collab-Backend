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
            assigned_projects :[Project]!
            project_count : Int!
        }
        type Comment{
            _id:ID!
            content:String!
            created_by : Member!
            created_at:String!
        }
        type Team{
            _id:ID!
            name:String!
            description:String!
            speciality:String!
            team_members:[Member]
            assigned_projects :[Project]
            created_at : String!,
            team_strength:Int
            project_count:Int
        }
        type Project{
            _id:ID!
            title:String!
            description:String!
            status:String!
            team_assigned:[Team]
            member_assigned:[Member]
            start_date:String!
            end_date:String!
            comments:[Comment]
        }
        type RootQuery{
            getMembers: [Member],
            getMemberById(id:ID!) : Member,
            getTeams:[Team],
            getTeamById(id:ID!):Team
            getProjects:[Project],
            getProjectById(id:ID!):Project
            getProjectsByMember(member:ID!):[Project],
            getProjectsByTeam(team:ID!):[Project],
        }
        type RootMutation {
            createMember(name:String!,email:String!,mobile:String!,team:ID!,password:String!): Member!
            editMember(name:String!,email:String!,mobile:String!): Member!
            deleteMember(email:String!): String!
            resetPassword(email:String!,currentpassword:String!,newpassword:String!): Member!
            createTeam(name:String!,description:String!,speciality:String!): Team!
            createProject(title:String!,description:String!,start_date:String!,end_date:String!): Project!
            editProject(id:ID!,description:String!,start_date:String!,end_date:String!) : Project!
            deleteProject(id:ID!) : String!
            assignProjectToMember(projectId:ID!,teamId:ID!,memberId:ID):Project!
            updateProjectStatus(id:ID!,status:String!,content:String,created_by:ID!):Project!
        }
        
        schema{
            query:RootQuery
            mutation:RootMutation
        }
    `;