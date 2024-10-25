import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from '../schema/schema.js';
import sequelize from '../config/database.js';


const app = express();


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

sequelize.sync({force: true}).then(()=>{
    app.listen(4000, () => {
        console.log("Listening on port 4000/graphql");
    });
})