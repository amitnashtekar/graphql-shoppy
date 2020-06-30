const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema=  require('./schema/schema');
const mongoose = require('mongoose');




const app = express();

mongoose.connect('mongodb://amit:amit123@ds233895.mlab.com:33895/gql-shoppy');
mongoose.connection.once('open', () => {
    console.log('connected to DB.!!')
})

app.use('/graphql',graphqlHTTP({
    schema: schema,
    graphiql: true
}) )

app.listen(4000, () => {
    console.log("now listening for requests on port 4000")
});