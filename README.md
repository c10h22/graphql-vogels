[![GitHub version](https://badge.fury.io/gh/c10h22%2Fgraphql-vogels.svg)](http://badge.fury.io/gh/c10h22%2Fgraphql-vogels)
[![Stories in Ready](https://badge.waffle.io/c10h22/graphql-vogels.png?label=ready&title=Ready)](https://waffle.io/c10h22/graphql-vogels)
[![Build Status](https://travis-ci.org/c10h22/graphql-vogels.svg?branch=master)](https://travis-ci.org/c10h22/graphql-vogels)
[![Coverage Status](https://coveralls.io/repos/c10h22/graphql-vogels/badge.svg?branch=master&service=github)](https://coveralls.io/github/c10h22/graphql-vogels?branch=master)
[![Dependency Status](https://www.versioneye.com/user/projects/55aba34b30653500230003f9/badge.svg?style=flat)](https://www.versioneye.com/user/projects/55aba34b30653500230003f9)
# Graphql-Vogels

> Vogels helper for graphql inspired by graphql-sequelize

## Table of Contents

Installation
------------
    $ npm install --save graphql-vogels
graphql and vogels must be installed in order to use graphql-vogels

Features
--------

 - Using Vogels model config to generate Graphql Object Type fields
 - TODO:
 - TODO:
 
Usage
--------

 -Generating Vogels model and Graphql object type fields

```javascript
let config = {
    tableName : 'hopnpop_users',
    hashKey : 'email',
    timestamps : true,
    schema : {
        email : Joi.string(),
        salt : Joi.string(),
        hash : Joi.string(),
        first_name : Joi.string(),
        last_name : Joi.string(),
        phone_number : Joi.string(),
    }
};
let options = {
    description: 'User model',
    fieldsDescription: {
        email: 'User email',
        salt: 'Password encryption salt',
        hash: 'Dynamodb hash',
        first_name: 'User first name',
        last_name: 'User last name',
        phone_number: 'User phone number'
    }
}
export var userModel = vogels.define('User',config);

export var userType = new GraphQLObjectType({
    name: 'User',
    description: 'User type',
    fields: () => attributeFields(config, options)

});
```





	

    


