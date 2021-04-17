// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html
const {CognitoIdentityServiceProvider} = require('aws-sdk');

/**
 * The user object from Cognito.
 * @typedef {object} CognitoUser
 * @property {string} Username
 * @property {CognitoUserAttribute[]} Attributes
 * @property {Date} UserCreateDate
 * @property {Date} UserLastModifiedDate
 * @property {boolean} Enabled
 * @property {string} UserStatus - i.e. [CONFIRMED]
 */

/**
 * Attributes on a CognitoUser object.
 * @typedef {object} CognitoUserAttribute
 * @property {string} Name - i.e. [sub/email_verified/name/email]
 * @property {string} Value
 */

/**
 * The User object returned by the service.
 * @typedef {object} User
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
     * @returns {User|null}
     */
    async getUserById(userId) {
        // https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_ListUsers.html
        const result = await this.cognitoIdentityServiceProvider.listUsers({
            UserPoolId: this.userPoolId,
            Filter: `sub="${userId}"`,
            Limit: 1,
        }).promise();
        return parseUser(result.Users.pop(), userId);
    }

};

/**
 *
 * @param {CognitoUser|null|undefined} user
 * @param {string} userId
 * @return {User|null}
 */
function parseUser(user, userId) {
    return user ? {
        id: userId,
        userName: user.Username,
        displayName: getUserAttribute(user, 'name'),
        createdAt: user.UserCreateDate && user.UserCreateDate.toISOString(),
        modifiedAt: user.UserLastModifiedDate && user.UserLastModifiedDate.toISOString(),
    } : null;
}

/**
 * @param {CognitoUser} user
 * @param {string} attrName
 * @return {string|undefined}
 */
function getUserAttribute(user, attrName) {
    if (user && user.Attributes) {
        const attr = user.Attributes.find(current => current.Name === attrName);
        if (attr) return attr.Value;
    }
    return undefined;
}
