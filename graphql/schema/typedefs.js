const { gql } = require('apollo-server');

module.exports = gql`
        type Member{
            _id:ID!
            name:String!
            email:String!
            mobile:String!
            address : String!
            dob : String!
            gender : String!
            role:String!
            password:String!
            team:Team!
            assigned_projects :[Project]!
            created_at : String
            project_count : Int
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
            created_at : String
            status:String!
            team_assigned:[Team]
            member_assigned:[Member]
            start_date:String!
            end_date:String!
            comments:[Comment]
        }
        type RootQuery{
            getMembers(staus:String): [Member],
            getMemberById(id:ID!) : Member,
            getTeams:[Team],
            getTeamsAndMembers : [Team],
            getTeamById(id:ID!):Team
            getProjects:[Project],
            getProjectById(id:ID!):Project
            getProjectsByMember(member:ID!):[Project],
            getProjectsByTeam(team:ID!):[Project],
        }
        type RootMutation {
            createMember(name:String!,email:String!,mobile:String!,address:String!,gender:String!,dob:String!,password:String!,team:ID!): Member!
            editMember(id:ID!,name:String!,mobile:String!,address:String!): Member!
            deleteMember(id:ID!): String!
            resetPassword(id:ID!,currentpassword:String!,newpassword:String!): Member!
            createTeam(name:String!,description:String!,speciality:String!): Team!
            createProject(title:String!,description:String!,start_date:String!,end_date:String!): Project!
            editProject(id:ID!,description:String!,start_date:String!,end_date:String!) : Project!
            deleteProject(id:ID!) : String!
            assignProjectToMember(projectId:ID!,teamId:ID!,memberId:ID):Project!
            deleteMemberFromProject(id:ID!,memberId:ID!):String!
            updateProjectStatus(id:ID!,status:String!,content:String,created_by:ID!):Project!
        }
        
        schema{
            query:RootQuery
            mutation:RootMutation
        }
    `;