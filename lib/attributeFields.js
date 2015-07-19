'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _typeMapper = require('./typeMapper');

var typeMapper = _interopRequireWildcard(_typeMapper);

var _graphql = require('graphql');

exports['default'] = function (config, opts) {
    var options = opts || {};

    var fields = _Object$keys(config.schema).reduce(function (memo, key) {
        if (options.exclude && ~options.exclude.indexOf(key)) {
            return memo;
        }

        var attribute = key;
        var type = config.schema[key];
        var description = '';
        if (options.fieldsDescription) {
            description = options.fieldsDescription[key];
        }

        memo[key] = {
            type: typeMapper.toGraphQL(type),
            description: description
        };

        if (attribute === config.hashKey) {
            memo[key].type = new _graphql.GraphQLNonNull(memo[key].type);
        }

        return memo;
    }, {});
    if (config.timestamps) {
        if (config.createdAt === undefined || config.createdAt === true || typeof config.createdAt === 'string') {
            var key = 'createdAt';
            if (typeof config.createdAt === 'string') {
                key = config.createdAt;
            }
            fields[key] = {
                type: _graphql.GraphQLInt,
                description: 'Creation timestamp'
            };
        }
        if (config.updatedAt === undefined || config.updatedAt === true || typeof config.updatedAt === 'string') {
            var key = 'updatedAt';
            if (typeof config.updatedAt === 'string') {
                key = config.updatedAt;
            }
            fields[key] = {
                type: _graphql.GraphQLInt,
                description: 'Update timestamp'
            };
        }
    }
    return fields;
};

module.exports = exports['default'];