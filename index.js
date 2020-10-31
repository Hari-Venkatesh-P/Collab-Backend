const mongoose = require('mongoose')
const { ApolloServer} = require('apollo-server');
const dbconfiguration = require('./configuration/dbconfiguration')
const dbdetails = dbconfiguration.dbdetails
const { checkIsValidAuth} = require('./middleware/checkTokenValidation')
const logger = require('./lib/logger')

const URL = ' mongodb://127.0.0.1:27017/collab'
//local 


// const URL = 'mongodb+srv://'+dbdetails.username+':'+dbdetails.password+'@'+dbdetails.host+'/'+dbdetails.database+'?retryWrites=true&w=majority';
//live

mongoose.connect(URL, {useNewUrlParser : true},(err) => {
    if (err) {
      logger.error('Error while Connecting!' +err)
    } else {
      logger.info('Connected to Mongo DB')
    }
  })


const PORT=  process.env.PORT || 4000; 

const typeDefs = require('./graphql/schema/typedefs')
const resolvers = require('./graphql/schema/rootresolver')


const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        formatError: (err) => {
          // logger.error("Error :"+err)
          if (err.message.startsWith("Database Error: ")) {
            return new Error('Internal server error');
          }
          return err;
        },
        context: async ({ req, connection }) => {
          if (connection) {
            return connection.context;
          } else {
            const headerPayload = req.headers.authorization || ""
            const isValidAuth = checkIsValidAuth(headerPayload)
            return { isValidAuth };
          }
        },
});

server.listen(PORT).then(({ url}) => {
     logger.info(`🚀 Server ready at URL :  ${url} in port : ${PORT}`);
});