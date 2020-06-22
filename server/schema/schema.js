const graphql = require('graphql');
const _ = require('lodash');

const Books = [
    {name: 'abc' , genre: 'action', id:'1',authorId:'4'},
    {name: 'def' , genre: 'comedy', id:'2',authorId:'5'},
    {name: 'ghi' , genre: 'drama', id:'3', authorId:'6'},
    {name: 'pqr' , genre: 'action', id:'4',authorId:'4'},
    {name: 'stu' , genre: 'comedy', id:'5',authorId:'5'},
    {name: 'vxf' , genre: 'drama', id:'6', authorId:'6'}
]

const Authors = [
    {name: 'test' , age: 32, id:'4'},
    {name: 'Sai' , age: 31, id:'5'},
    {name: 'Aveer' , age: 06, id:'6'}
]

const {GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
    GraphQLList} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        authorId: {type: GraphQLID},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                return _.find(Authors, {id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:() => ({
        id: {type: GraphQLID},
        age:{type: GraphQLInt},
        name: {type: GraphQLString},
        books:{
            type: new GraphQLList(BookType),
            resolve (parent, args) {
                
                return _.filter(Books,{authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book:{
            type: BookType,
            args:{id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(Books, {id: args.id})
            }
        },
        author:{
            type: AuthorType,
            args:{id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(Authors, {id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve (parent, args) {
                return Books
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})