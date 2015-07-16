'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.toGraphQL = toGraphQL;

var _graphql = require('graphql');

function toGraphQL(vogelsType) {
    if (vogelsType._type === 'boolean') {
        return _graphql.GraphQLBoolean;
    } else if (vogelsType._type === 'number') {
        return _graphql.GraphQLInt;
    } else if (vogelsType._type === 'array') {
        return _graphql.GraphQLList;
    } else if (vogelsType._type === 'object') {
        return _graphql.GraphQLObjectType;
    } else if (vogelsType._type === 'string' || vogelsType._type === 'date' || vogelsType._type === 'uuid') {
        return _graphql.GraphQLString;
    } else {
        return new Error('Not handled vogelType ' + vogelsType._type);
    }
}