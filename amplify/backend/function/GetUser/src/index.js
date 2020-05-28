/* Amplify Params - DO NOT EDIT
	API_FLASHDECKS_GRAPHQLAPIIDOUTPUT
	API_FLASHDECKS_USERTABLE_ARN
	API_FLASHDECKS_USERTABLE_NAME
	AUTH_FLASHDECKS659617F5_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const {
  getEnvVar,
  getProperty,
  isEmpty,
  removeStrings,
  getValueWithSuffix,
} = require('./misc');
const Region = getEnvVar('REGION');
const TableName = getEnvVar('API_FLASHDECKS_USERTABLE_NAME');
const UserPoolId = getEnvVar('AUTH_FLASHDECKS659617F5_USERPOOLID');

const Logging = require('./logging');
const CognitoService = require('./CognitoService');
const DynamoService = require('./DynamoService');
const dynamo = new DynamoService(Region, TableName);
const cognito = new CognitoService(UserPoolId);

/**
 * @typedef {object} Event
 * @param {boolean} event.getLoggedInUser - If we want to get data for the logged in user.
 * @param {string} event.fieldName - The name of the field we're trying to resolve.
 */

/**
 * A resolver for GraphQL that retrieves user data from Cognito.
 * Gets by the Cognito Subscription ID ('sub') because it is unique, while username can be reused.
 * Handles 3 scenarios:
 * 1) If attached to a field Resolver (i.e. has 'fieldName'); get user based on the user ID that already exists on the model.
 * 2) If as a query with an ID argument; get the user from that ID.
 * 3) Otherwise; get the currently logged in user.
 * @param {Event} event
 * @returns {DynamoUser}
 */
exports.handler = async event => {
  Logging.log('GetUser event', event);
  const userId = getUserId(event);
  Logging.log('GetUser ID', {userId, Region, TableName});
  if (!userId) throw new Error('No ID found on GetUser');

  let result = null;
  try {
    result = await dynamo.getUserById(userId); // Get existing user data
    if (isEmpty(result)) result = await addCognitoUserToDynamo(userId);
  } catch (e) {
    Logging.error('GetUser error', userId, e);
    throw e;
  }
  Logging.log('GetUser result', userId, result);
  return result;
};

/**
 * Get the user's ID, from whichever event type.
 * @param event
 * @return {*}
 */
function getUserId(event) {
  const idArgument = getProperty(event, 'arguments', 'id'); // Get ID passed as a Query argument.
  if (idArgument) return idArgument; // If has an ID from arguments, use that.
  if (event.fieldName) return getUserIdFromField(event); // If a resolver for a field, get from ID already present on another field.
  return getProperty(event, 'identity', 'sub'); // Otherwise, use logged in user.
}

/**
 * Get userId from sister field.
 * If this field is "ownerData", sister might be "owner".
 * If this field is "user", sister might be "userID".
 * If this field is "authorObject", sister might be "authorId".
 * @param {object} event
 * @param {string} event.fieldName - The name of the field we're trying to resolve.
 * @param {object} event.source - Initial data on the GraphQL model being resolved.
 */
function getUserIdFromField(event) {
  const {fieldName, source} = event;
  const sourceFieldName = removeStrings(fieldName, ['Data', 'Object']); // For "ownerData", get ID from "owner".
  return getValueWithSuffix(source, sourceFieldName, ['Id', 'ID', 'Sub', '']); // If sourceFieldName is "owner", try getting the ID with a few prefixes first (i.e. "ownerId").
}

/**
 * Add the user to the Table, from Cognito.
 * @param userId
 * @return {Promise<null|{displayName: string, id: string}>}
 */
async function addCognitoUserToDynamo(userId) {
  Logging.log('GetUser Get from Cognito', userId);
  const cognitoUser = await cognito.getUserById(userId); // Get user data from cognito
  if (!isEmpty(cognitoUser)) {
    Logging.log('GetUser Add to Dynamo', userId, cognitoUser.userName);
    return dynamo.addUser(
      cognitoUser.id,
      cognitoUser.userName,
      cognitoUser.createdAt,
    ); // Add user data to database
  }
  Logging.warning('GetUser User does not exist', userId);
  return null;
}
