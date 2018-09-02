export const typeDefs = `
type Channel {
   id: ID!             
   name: String
}

type Query {
   channels: [Channel]    # "[]" means this is a list of channels
}
`;