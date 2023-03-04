const Project = require("../models/Project");
const Client = require("../models/Client");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

//Client Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    //function that returns an object
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
        // return clients.find((client) => client.id === parent.clientId);
      },
    },
  }),
});

//Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    //function that returns an object
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: GraphQLList(ProjectType),
      resolve(parents, args) {
        return Project.find();
      },
    },

    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },

    clients: {
      type: GraphQLList(ClientType),
      resolve(parents, args) {
        // return clients;
        return Client.find();
      },
    },

    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return clients.find((client) => client.id === args.id);
        return Client.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
