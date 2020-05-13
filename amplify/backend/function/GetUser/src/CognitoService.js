// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html
const {CognitoIdentityServiceProvider} = require('aws-sdk');

/**
 * @typedef {object} CognitoUser
 * @property {string} id
 * @property {string} userName
 * @property {string} createdAt
 */

module.exports = class CognitoService {
  constructor(userPoolId) {
    this.cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
    this.userPoolId = userPoolId;
  }
  /**
   * Get a user from Cognito
   * @param {string} userId
   * @returns {CognitoUser}
   */
  async getUserById(userId) {
    // https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_ListUsers.html
    const result = await this.cognitoIdentityServiceProvider
      .listUsers({
        UserPoolId: this.userPoolId,
        Filter: `sub="${userId}"`,
        Limit: 1,
      })
      .promise();
    /* {
      Attributes: [
        {Name: "sub", Value: "00001111-aaaa-bbbb-cccc-111122223333"},
        {Name: "email", Value: "user1@example.com"}
      ],
      Enabled: true,
      UserCreateDate: "2020-01-00T00:00:00.000Z",
      UserLastModifiedDate: "2020-01-00T00:00:00.000Z",
      UserStatus: "CONFIRMED",
      Username: "user1"
    } */
    const user = result.Users.pop();
    if (user) {
      return {
        id: userId,
        userName: user.Username,
        createdAt: user.UserCreateDate.toISOString(),
      };
    }
    return null;
  }
};
