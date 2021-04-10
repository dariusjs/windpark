"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
let documentClient = new aws_sdk_1.default.DynamoDB.DocumentClient({
    credentials: {
        accessKeyId: '1234',
        secretAccessKey: '1234'
    },
    region: 'eu-west-1',
    endpoint: 'http://localhost:8000',
    convertEmptyValues: true
});
async function execute(getItemInput) {
    const data = await executeQuery(documentClient, getItemInput);
    return data;
}
exports.execute = execute;
async function executeQuery(documentClient, getItemInput) {
    try {
        const params = Object.assign({}, getItemInput);
        console.log(JSON.stringify(params, null, 2));
        const results = [];
        let items;
        do {
            items = await documentClient.query(getItemInput).promise();
            if (items.Items) {
                items.Items.forEach((item) => results.push(item));
                params.ExclusiveStartKey = items.LastEvaluatedKey;
            }
        } while (typeof items.LastEvaluatedKey !== 'undefined');
        console.log(JSON.stringify(results, null, 2));
        // const getItemOutput = await documentClient.query(getItemInput).promise();
        console.info('GetItem executed successfully.');
        return results;
    }
    catch (err) {
        console.log(err);
        handleGetItemError(err);
        return err;
    }
}
function handleGetItemError(err) {
    if (!err) {
        console.error('Encountered error object was empty');
        return;
    }
    if (!err.code) {
        console.error(`An exception occurred, investigate and configure retry strategy. Error: ${JSON.stringify(err)}`);
        return;
    }
    // here are no API specific errors to handle for GetItem, common DynamoDB API errors are handled below
    handleCommonErrors(err);
}
function handleCommonErrors(err) {
    switch (err.code) {
        case 'InternalServerError':
            console.error(`Internal Server Error, generally safe to retry with exponential back-off. Error: ${err.message}`);
            return;
        case 'ProvisionedThroughputExceededException':
            console.error(`Request rate is too high. If you're using a custom retry strategy make sure to retry with exponential back-off.` +
                `Otherwise consider reducing frequency of requests or increasing provisioned capacity for your table or secondary index. Error: ${err.message}`);
            return;
        case 'ResourceNotFoundException':
            console.error(`One of the tables was not found, verify table exists before retrying. Error: ${err.message}`);
            return;
        case 'ServiceUnavailable':
            console.error(`Had trouble reaching DynamoDB. generally safe to retry with exponential back-off. Error: ${err.message}`);
            return;
        case 'ThrottlingException':
            console.error(`Request denied due to throttling, generally safe to retry with exponential back-off. Error: ${err.message}`);
            return;
        case 'UnrecognizedClientException':
            console.error(`The request signature is incorrect most likely due to an invalid AWS access key ID or secret key, fix before retrying.` +
                `Error: ${err.message}`);
            return;
        case 'ValidationException':
            console.error(`The input fails to satisfy the constraints specified by DynamoDB, ` +
                `fix input before retrying. Error: ${err.message}`);
            return;
        case 'RequestLimitExceeded':
            console.error(`Throughput exceeds the current throughput limit for your account, ` +
                `increase account level throughput before retrying. Error: ${err.message}`);
            return;
        default:
            console.error(`An exception occurred, investigate and configure retry strategy. Error: ${err.message}`);
            return;
    }
}
