/* Amplify Params - DO NOT EDIT
	AUTH_FLASHDECKSAMPLIFYAUTH_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const CognitoService = require('./helpers/CognitoService');
const userPoolId = getEnvVar('AUTH_FLASHDECKSAMPLIFYAUTH_USERPOOLID');
const cognito = new CognitoService(userPoolId);

/**
 * @typedef {object} LambdaEvent
 * @property {object} [identity]            - Data on the logged in CognitoUser.
 * @property {string} [identity.sub]        - The logged in user's sub.
 * @property {string} [identity.username]   - The logged in user's username.
 * @property {string} [typeName]            - Name of the entity, if it was on one in a GraphQL query.
 * @property {string} [fieldName]           - Name of the field on an entity, if it was on one in a GraphQL query.
 * @property {object} [source]              - Current entity data, if it was on one in a GraphQL query.
 */

/**
 * Get a user from Cognito.
 * Either get the user specified on the passed entity's field, or the logged in user.
 * @param {LambdaEvent} event
 * @return {Promise<User|null>}
 */
exports.handler = async (event) => {
    const entity = event.source;
    if (entity) {
        const fieldName = event.fieldName;
        const itemOwnerSub = (entity && fieldName && entity[fieldName+'Id']) || undefined; // fieldName+'Id' => 'owner'+'Id' => 'ownerId'
        if (itemOwnerSub) return cognito.getUserById(itemOwnerSub);
    } else {
        const loggedInSub = event.identity && event.identity.sub;
        if (loggedInSub) return cognito.getUserById(loggedInSub);
    }
    return null;
};

/**
 * Get a required environment variable.
 * @param {string} name
 * @returns {string}
 * @throws {Error} If var not found.
 */
function getEnvVar(name) {
    const variable = process.env[name];
    if (!variable) throw new Error(`Function requires environment variable: '${name}'.`);
    return variable;
}
