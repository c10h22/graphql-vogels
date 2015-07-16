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

    return _Object$keys(config.schema).reduce(function (memo, key) {
        if (options.exclude && ~options.exclude.indexOf(key)) {
            return memo;
        }

        var attribute = key;
        var type = config.schema[key];

        memo[key] = {
            type: typeMapper.toGraphQL(type)
        };

        if (attribute === config.hashKey) {
            memo[key].type = new _graphql.GraphQLNonNull(memo[key].type);
        }

        return memo;
    }, {});
};

module.exports = exports['default'];