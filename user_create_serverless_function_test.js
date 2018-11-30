'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const ts = new Date().getTime();
  const data = JSON.parse(event.body);

  //validation
  if (
      typeof data.user.full_name !== 'string' || 
      typeof data.user.role !== 'string'
      ) {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the user, validation failed.',
    });
    return;
  }

  // Item content is everything coming from the request
  var params = {
    TableName: 'Nomit_Users',
    Item: data.user,
  };

  // add to the user predefined values
  params.Item.id = uuid.v1();
  params.Item.createdAt = ts;
  params.Item.updatedAt = ts;
  params.Item.status = 'toApprove';

  // write the user to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the user.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};