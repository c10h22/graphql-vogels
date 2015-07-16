import * as typeMapper from './typeMapper';
import { GraphQLNonNull } from 'graphql';

export default function (config, opts) {
    let options = opts || {};

    return Object.keys(config.schema).reduce((memo, key) => {
        if (options.exclude && ~options.exclude.indexOf(key)) {
            return memo;
        }

        let attribute = key;
        let type = config.schema[key];

        memo[key] = {
            type: typeMapper.toGraphQL(type)
        };

        if (attribute === config.hashKey) {
            memo[key].type = new GraphQLNonNull(memo[key].type);
        }

        return memo;
    }, {});
}
