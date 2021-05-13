import { DynamoDBClient, Put } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: Math.random().toString(), // Only for Demo purposes these should come from a safe place and not from a static config file
    secretAccessKey: Math.random().toString() // Only for Demo purposes these should come from a safe place and not from a static config file
  },
  region: 'eu-west-1',
  endpoint: 'http://localhost:8000'
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export async function query(queryInput: QueryCommandInput): Promise<QueryCommandOutput> {
  try {
    return await ddbDocClient.send(new QueryCommand(queryInput));
  } catch (err) {
    console.log(err);
    handleGetItemError(err);
    return err;
  }
}

export async function documentClientPut(putInput: PutCommandInput) {
  console.log(putInput);
  try {
    const results = await ddbDocClient.send(new PutCommand(putInput));
    return results;
  } catch (err) {
    console.log(err);
    handleGetItemError(err);
    return err;
  }
}

export async function execute(queryInput: QueryCommandInput | PutCommandInput) {
  const data = await query(queryInput);
  return data;
}

function handleGetItemError(err: any) {
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

function handleCommonErrors(err: any) {
  switch (err.code) {
    case 'InternalServerError':
      console.error(`Internal Server Error, generally safe to retry with exponential back-off. Error: ${err.message}`);
      return;
    case 'ProvisionedThroughputExceededException':
      console.error(
        `Request rate is too high. If you're using a custom retry strategy make sure to retry with exponential back-off.` +
          `Otherwise consider reducing frequency of requests or increasing provisioned capacity for your table or secondary index. Error: ${err.message}`
      );
      return;
    case 'ResourceNotFoundException':
      console.error(`One of the tables was not found, verify table exists before retrying. Error: ${err.message}`);
      return;
    case 'ServiceUnavailable':
      console.error(
        `Had trouble reaching DynamoDB. generally safe to retry with exponential back-off. Error: ${err.message}`
      );
      return;
    case 'ThrottlingException':
      console.error(
        `Request denied due to throttling, generally safe to retry with exponential back-off. Error: ${err.message}`
      );
      return;
    case 'UnrecognizedClientException':
      console.error(
        `The request signature is incorrect most likely due to an invalid AWS access key ID or secret key, fix before retrying.` +
          `Error: ${err.message}`
      );
      return;
    case 'ValidationException':
      console.error(
        `The input fails to satisfy the constraints specified by DynamoDB, ` +
          `fix input before retrying. Error: ${err.message}`
      );
      return;
    case 'RequestLimitExceeded':
      console.error(
        `Throughput exceeds the current throughput limit for your account, ` +
          `increase account level throughput before retrying. Error: ${err.message}`
      );
      return;
    default:
      console.error(`An exception occurred, investigate and configure retry strategy. Error: ${err.message}`);
      return;
  }
}
