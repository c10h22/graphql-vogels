import { GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLObjectType } from 'graphql';

export function toGraphQL(vogelsType) {
    if(!vogelsType){
        return new Error(`vogelType can not be null`);
    }
    if (vogelsType._type === 'boolean') {
        return GraphQLBoolean;
    } else if (vogelsType._type === 'number') {
        return GraphQLInt;
    } else if (vogelsType._type === 'array') {
        return GraphQLList;
    } else if (vogelsType._type === 'object') {
        return GraphQLObjectType;
    }else if (
        vogelsType._type === 'string' ||
        vogelsType._type === 'date' ||
        vogelsType._type === 'uuid'
    ) {
        return GraphQLString;
    } else {
        return new Error(`Not handled vogelType ${vogelsType._type}`);
    }
}
