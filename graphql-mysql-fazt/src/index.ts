





/*  */
import express from 'express';
/* con graphqlHTTP puedo crear una interfaz gráfica */
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema/schema';


const app = express();
/* un schema define qué es lo que puede ejecutar,lo que se puede consultar */
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema
}));

app.listen(3000, () => {
  console.clear();
  console.log('Listening on port 3000');
});