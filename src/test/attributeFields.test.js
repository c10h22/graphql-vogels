import Joi from 'joi';
import { expect } from 'chai';

import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLList
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
            phone_number: Joi.string(),
            first_time: Joi.Boolean(),
            friends: Joi.Array()
        }
    };
    // let Model = vogels.define('Model', config);

    it('should return fields for a simple model', () => {

        let fields = attributeFields(config);

        expect(fields).to.have.keys(Object.keys(config.schema));
        expect(fields.hash.type).to.be.an.instanceOf(GraphQLNonNull);
        expect(fields.hash.type.ofType).to.equal(GraphQLString);
        expect(fields.first_name.type).to.equal(GraphQLString);
        expect(fields.last_name.type).to.equal(GraphQLString);
        expect(fields.first_time.type).to.equal(GraphQLBoolean);
        expect(fields.friends.type).to.equal(GraphQLList);
    });

    it('should be possible to exclude fields', function () {
        let options = {
            exclude: ['email', 'salt','phone_number']
        };
        let fields = attributeFields(config, options);
        expect(fields).to.have.keys(['first_name', 'last_name', 'hash'])
            .and.not.have.keys(options.exclude);
    });
});
