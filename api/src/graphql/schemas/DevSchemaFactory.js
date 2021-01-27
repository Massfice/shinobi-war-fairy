class DevSchemaFactory {
    static create({
        GraphQLSchema,
        GraphQLObjectType,
        GraphQLString
    }) {
        const UserType = new GraphQLObjectType({
            name: 'UserType',
            fields: {
                nick: {
                    type: GraphQLString
                },
                email: {
                    type: GraphQLString
                }
            }
        });

        const AddUserType = new GraphQLObjectType(
            {
                name: 'AddUserType',
                fields: {
                    user: {
                        type: UserType
                    },
                    status: {
                        type: GraphQLString
                    }
                }
            }
        );

        return new GraphQLSchema({
            query: new GraphQLObjectType({
                name: 'RootQueryType',
                fields: {
                    user: {
                        type: UserType,
                        resolve: () => ({
                            nick: 'Iwaru',
                            email:
                                'adrian.marian.tomasz.larysz@gmail.com'
                        })
                    }
                }
            }),

            mutation: new GraphQLObjectType({
                name: 'RootMutationType',
                fields: {
                    addUser: {
                        type: AddUserType,
                        args: {
                            nick: {
                                type: GraphQLString
                            },
                            email: {
                                type: GraphQLString
                            }
                        },
                        resolve: (
                            root,
                            { nick, email }
                        ) => {
                            return {
                                user: {
                                    nick,
                                    email
                                },
                                status: 'created'
                            };
                        }
                    }
                }
            })
        });
    }
}

module.exports = DevSchemaFactory;
