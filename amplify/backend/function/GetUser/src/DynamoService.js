// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html
const {DynamoDB} = require('aws-sdk');
const {getProperty, isEmpty} = require('./misc');

/**
 * @typedef {object} DynamoUser
 * @property {string} id
 * @property {string} displayName
 */

module.exports = class DynamoService {
  constructor(region, tableName) {
    this.dynamoDb = new DynamoDB({region, apiVersion: '2012-08-10'});
    this.tableName = tableName;
  }

  /**
   * Transform a DynamoDB User Item to a response object.
   * @param {object} user
   * @returns {DynamoUser}
   */
  transformUser(user) {
    if (user) {
      return {
        id: getProperty(user, 'id', 'S'),
        displayName: getProperty(user, 'displayName', 'S'),
      };
    }
    return null;
  }

  /**
   * Get a user from Dynamo
   * @param {string} userId
   * @returns {DynamoUser}
   */
  async getUserById(userId) {
    // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html
    const params = {
      TableName: this.tableName,
      Key: {
        id: {S: userId},
      },
    };
    const result = await this.dynamoDb.getItem(params).promise();
    const user = isEmpty(result && result.Item) ? null : result.Item;
    return this.transformUser(user);
  }

  /**
   * Add a user to Dynamo and return them
   * @param {string} userId
   * @param {string} userName
   * @param {string} createdAt
   * @returns {DynamoUser}
   */
  async addUser(userId, userName, createdAt) {
    const now = new Date();
    const result = await this.dynamoDb
      .updateItem({
        TableName: this.tableName,
        ReturnValues: 'ALL_NEW',
        Key: {
          id: {S: userId},
        },
        // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html#DDB-UpdateItem-request-UpdateExpression
        // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.UpdateExpressions.html#Expressions.UpdateExpressions.SET.PreventingAttributeOverwrites
        UpdateExpression:
          'SET ' +
          [
            'displayName = if_not_exists(displayName, :displayName)',
            'createdAt = if_not_exists(createdAt, :createdAt)',
            'modifiedAt = :now',
          ].join(', '),
        ExpressionAttributeValues: {
          ':displayName': {S: userName},
          ':createdAt': {S: createdAt},
          ':now': {S: now.toISOString()},
        },
      })
      .promise();
    const user = isEmpty(result && result.Attributes) ? null : result.Attributes;
    return this.transformUser(user);
  }
};
