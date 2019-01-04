const { ApolloServer, gql } = require("apollo-server");

// type checking
// query vs. mutation
// objects
// arrays
// arguments

// crud

const typeDefs = gql`
  type Query {
    hello: String
    user: User
  }

  type User {
    id: ID!
    username: String!
  }

  type Error {
    field: String!
    message: String!
  }

  type RegisterResponse {
    errors: [Error!]!
    user: User
  }

  input UserInfo {
    username: String!
    password: String!
    age: Int
  }

  type Mutation {
    register(userInfo: UserInfo!): RegisterResponse!
    login(userInfo: UserInfo!): Boolean!
  }
`;

const resolvers = {
  Query: {
    hello: () => null,
    user: () => ({
      id: 1,
      username: "bob"
    })
  },
  Mutation: {
    login: () => true,
    register: () => ({
      errors: [
        {
          field: "username",
          message: "bad"
        },
        {
          field: "username2",
          message: "bad2"
        }
      ],
      user: {
        id: 1,
        username: "bob"
      }
    })
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`server started at ${url}`));
