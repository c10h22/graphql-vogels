import * as typeMapper from './typeMapper';
import { GraphQLNonNull, GraphQLInt } from 'graphql';

export default function (config, opts) {
    let options = opts || {};

    let fields = Object.keys(config.schema).reduce((memo, key) => {
        if (options.exclude && ~options.exclude.indexOf(key)) {
            return memo;
        }

        let attribute = key;
        let type = config.schema[key];
        let description = '';
        if (options.fieldsDescription) {
            description = options.fieldsDescription[key];
        }

        memo[key] = {
            type: typeMapper.toGraphQL(type),
            description: description
        };

        if (attribute === config.hashKey) {
            memo[key].type = new GraphQLNonNull(memo[key].type);
        }

        return memo;
    }, {});
    if (config.timestamps) {
        if(
            config.createdAt === undefined ||
            config.createdAt == true ||
            typeof config.createdAt == 'string'
        ){
            let key = 'createdAt';
            if(typeof config.createdAt == 'string'){
                key = config.createdAt;
            }
            fields[key] = {
                type: GraphQLInt,
                description: 'Creation timestamp'
            };
        }
        if(
            config.updatedAt === undefined ||
            config.updatedAt == true ||
            typeof config.updatedAt == 'string'
        ){
            let key = 'updatedAt';
            if(typeof config.updatedAt == 'string'){
                key = config.updatedAt;
            }
            fields[key] = {
                type: GraphQLInt,
                description: 'Update timestamp'
            };
        }

    }
    return fields;
}
