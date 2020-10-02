const mongoose = require('mongoose')
const { ApolloServer} = require('apollo-server');
// const express = require('express');
// const bodyparser = require('body-parser');
// const graphqlHttp = require('express-graphql').graphqlHTTP;
// const app = express();
// app.use(bodyparser.json());


const URL = ' mongodb://127.0.0.1:27017/collab'
//local 

// const URL = 'mongodb+srv://admin:admin123@hari-mongoatlas.xssfv.mongodb.net/Hari-MongoAtlas?retryWrites=true&w=majority'
//live

mongoose.connect(URL, {useNewUrlParser : true},(err) => {
    if (err) {
      console.log(err)
      console.log('Error while Connecting!')
    } else {
      console.log('Connected to Mongo DB')
    }
  })


  const PORT=  process.env.PORT ||4000; 

const typeDefs = require('./graphql/schema/typedefs')
const resolvers = require('./graphql/schema/rootresolver')


const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        formatError: (err) => {
          if (err.message.startsWith("Database Error: ")) {
            return new Error('Internal server error');
          }
          return err;
        },
});

server.listen(PORT).then(({ url}) => {
    console.log(`🚀 Server ready at URL :  ${url} in port : ${PORT}`);
});