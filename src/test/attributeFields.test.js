import Joi from 'joi';
import { expect } from 'chai';

import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInt,
    GraphQLObjectType
    } from 'graphql';
import { attributeFields } from '../lib/index.js';

describe('attributeFields', () => {
    'user strict';

    let config = {
        tableName: 'table',
        hashKey: 'hash',
        timestamps: true,
        schema: {
            email: Joi.string(),
            salt: Joi.string(),
            hash: Joi.string(),
            first_name: Joi.string(),
            last_name: Joi.string(),
            count: Joi.number(),
            first_time: Joi.boolean(),
            friends: Joi.array(),
            address: Joi.object(),
            nullField: null
        }
    };
    // let Model = vogels.define('Model', config);

    it('should return fields for a simple model', () => {

        let fields = attributeFields(config);

        expect(fields).to.have.keys(Object.keys(config.schema));
        expect(fields.hash.type).to.be.an.instanceOf(GraphQLNonNull);
        expect(fields.nullField.type).to.be.an.instanceOf(Error);
        expect(fields.hash.type.ofType).to.equal(GraphQLString);
        expect(fields.first_name.type).to.equal(GraphQLString);
        expect(fields.count.type).to.equal(GraphQLInt);
        expect(fields.first_time.type).to.equal(GraphQLBoolean);
        expect(fields.friends.type).to.equal(GraphQLList);
        expect(fields.address.type).to.equal(GraphQLObjectType)
    });

    it('should be possible to exclude fields', function () {
        let options = {
            exclude: ['email', 'salt', 'count', 'address', 'nullField']
        };
        let fields = attributeFields(config, options);
        expect(fields).to.have.keys(['first_name', 'last_name', 'hash', 'friends', 'first_time'])
            .and.not.have.keys(options.exclude);
    });
});
