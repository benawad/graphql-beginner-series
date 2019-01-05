const { ApolloServer, gql } = require("apollo-server");

// type checking
// query vs. mutation
// objects
// arrays
// arguments

// crud

const typeDefs = gql`
  type Query {
    hello(name: String): String
    user: User
  }

  type User {
    id: ID!
    username: String
    firstLetterOfUsername: String
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
    login(userInfo: UserInfo!): String!
  }
`;

const resolvers = {
  User: {
    firstLetterOfUsername: parent => {
      return parent.username ? parent.username[0] : null;
    }
    // username: parent => { return parent.username;
    // }
  },
  Query: {
    hello: (parent, { name }) => {
      return `hey ${name}`;
    },
    user: () => ({
      id: 1,
      username: "tom"
    })
  },
  Mutation: {
    login: async (parent, { userInfo: { username } }, context) => {
      // check the password
      // await checkPassword(password);
      return username;
    },
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
        id: 1
      }
    })
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res })
});

server.listen().then(({ url }) => console.log(`server started at ${url}`));
