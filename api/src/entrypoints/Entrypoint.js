class Entrypoint {
    constructor(
        express,
        bodyParser,
        cors,
        { graphqlHTTP },
        graphiql,
        schema
    ) {
        this.app = express();

        console.log(schema);

        this.app.use(bodyParser.json());
        this.app.use(cors());

        const method = graphiql ? 'use' : 'post';
        const options = graphiql
            ? { schema, graphiql }
            : { schema };

        this.app[method](
            '/graphql',
            graphqlHTTP(options)
        );
    }

    start() {
        this.app.listen(3000);
    }
}

module.exports = Entrypoint;
