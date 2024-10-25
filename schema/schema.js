import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList } from "graphql";

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLInt },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLInt } },
            resolve(parentValue, args) {
                return User.findById(args.id);
            },
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return User.findAll();
            },
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return User.create(args);
            },
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
