import Joi from 'joi';
import { expect } from 'chai';
import betterLog from 'better-log/index';

betterLog.install({depth: 2});

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
            nullField: null,
            invalidFieldType: {_type: 'type'},
            emptyFieldType: {}

        }
    };
    let options = {
        description: 'User Model',
        fieldsDescription: {
            email: 'email description',
            salt: 'salt description',
            hash: 'hash description',
            first_name: 'firstname description'
        }
    };

    it('should return fields for a simple model', () => {

        let fields = attributeFields(config, options);
        expect(fields).to.contain.keys(Object.keys(config.schema));
        expect(fields.hash.type).to.be.an.instanceOf(GraphQLNonNull);
        expect(fields.nullField.type).to.be.an.instanceOf(Error);
        expect(fields.invalidFieldType.type).to.be.an.instanceOf(Error);
        expect(fields.emptyFieldType.type).to.be.an.instanceOf(Error);
        expect(fields.hash.type.ofType).to.equal(GraphQLString);
        expect(fields.first_name.type).to.equal(GraphQLString);
        expect(fields.count.type).to.equal(GraphQLInt);
        expect(fields.first_time.type).to.equal(GraphQLBoolean);
        expect(fields.friends.type).to.equal(GraphQLList);
        expect(fields.address.type).to.equal(GraphQLObjectType);
        expect(fields.email).to.contain.key('description');

    });

    it('should be possible to exclude fields', function () {
        let opt = {
            exclude: ['email', 'salt', 'count', 'address', 'nullField',
                'emptyFieldType', 'invalidFieldType']
        };
        let fields = attributeFields(config, opt);
        expect(fields).to.not.have.keys(options.exclude);
    });

    it('should be possible to use timestamps in config', () => {
        config = {
            tableName: 'table',
            hashKey: 'hash',
            timestamps: true,
            schema: {
                hash: Joi.string(),
            }
        };
        let fields = attributeFields(config);
        if (config.timestamps) {
            expect(fields).to.contain.keys(['createdAt', 'updatedAt']);
            expect(fields.createdAt).to.contain.keys(['type', 'description']);
            expect(fields.createdAt).to.contain.keys(['type', 'description']);
            expect(fields.createdAt.type).to.equal(GraphQLInt);
            expect(fields.updatedAt.type).to.equal(GraphQLInt);
        }
    });

    it('should be possible to use custom timestamps in config', () => {
        config = {
            tableName: 'table',
            hashKey: 'hash',
            timestamps: true,
            createdAt: false,
            schema: {
                hash: Joi.string(),
            }
        };
        let fields = attributeFields(config);
        expect(fields).to.contain.key('updatedAt').and.not.contain.key('createdAt');
        expect(fields.updatedAt).to.contain.keys(['type', 'description']);
        expect(fields.updatedAt.type).to.equal(GraphQLInt);

        config = {
            tableName: 'table',
            hashKey: 'hash',
            timestamps: true,
            updatedAt: false,
            schema: {
                hash: Joi.string(),
            }
        };
        fields = attributeFields(config);
        expect(fields).to.contain.key('createdAt').and.not.contain.key('updatedAt');
        expect(fields.createdAt).to.contain.keys(['type', 'description']);
        expect(fields.createdAt.type).to.equal(GraphQLInt);

        config = {
            tableName: 'table',
            hashKey: 'hash',
            timestamps: true,
            updatedAt: 'updateTime',
            createdAt: 'creationTime',
            schema: {
                hash: Joi.string(),
            }
        };
        fields = attributeFields(config);
        expect(fields).to.contain.keys(['creationTime', 'updateTime']);
        expect(fields.creationTime).to.contain.keys(['type', 'description']);
        expect(fields.updateTime).to.contain.keys(['type', 'description']);
        expect(fields.creationTime.type).to.equal(GraphQLInt);
        expect(fields.updateTime.type).to.equal(GraphQLInt);

    });
});
