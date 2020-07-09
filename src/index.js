import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import Query from './Routes/UsersPostsComments/Resolver/Query';
import Mutation from './Routes/UsersPostsComments/Resolver/Mutation'
import Subscription from './Routes/UsersPostsComments/Resolver/Subscription'
import User from './Routes/UsersPostsComments/Resolver/User'
import Post from './Routes/UsersPostsComments/Resolver/Post'
import Comment from './Routes/UsersPostsComments/Resolver/Comment'

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/Routes/UsersPostsComments/Schema/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment
    },
    context: {
        db,
        pubsub
    }
})

server.start(() => {
    console.log('The server is up!')
})