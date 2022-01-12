





/* con GraphQLSchema puedo crear un schema */
/* con la clase GraphQLObjectType puedo crear un Object */
import { GraphQLSchema,GraphQLObjectType } from 'graphql';
import { GREETING } from './Queries/Greeting';

/* un GraphQLObjectType recibe un name y unos fields */
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    greeting:GREETING
  }
}); 

/* un schema siempre va a tener dos propiedades,query(consultar datos,sin alterar) y mutation(alterar datos). */
export const schema = new GraphQLSchema({
  query: RootQuery,
  // mutation: {}
});

