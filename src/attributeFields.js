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
        if(options.description){
            description = options.description[key];
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
    if(config.timestamps){
        fields['createdAt'] = {
            type: GraphQLInt,
            description: 'Creation timestamp'
        };
        fields['updatedAt'] = {
            type: GraphQLInt,
            description: 'Update timestamp'
        };
    }
    return fields;
}
