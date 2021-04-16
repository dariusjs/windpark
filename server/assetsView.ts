import { QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { execute } from './dynamo';

export async function windTurbineQuery(sk: string) {
  const data: QueryCommandInput = await execute({
    TableName: 'windfarm',
    IndexName: 'assets',
    KeyConditionExpression: '#pk = :pk And begins_with(#sk, :sk)',
    ExpressionAttributeNames: { '#pk': 'gsi1pk1', '#sk': 'gsi1sk1' },
    ExpressionAttributeValues: { ':pk': 'turbine', ':sk': `windfarm#${sk}` },
    ReturnConsumedCapacity: 'TOTAL'
  });
  return data;
}

export async function windFarmQuery() {
  const data: QueryCommandInput = await execute({
    TableName: 'windfarm',
    IndexName: 'assets',
    KeyConditionExpression: '#pk = :pk',
    ExpressionAttributeNames: { '#pk': 'gsi1pk1' },
    ExpressionAttributeValues: { ':pk': 'windfarm' },
    ReturnConsumedCapacity: 'TOTAL'
  });
  return data;
}

export async function windTurbineReadingsQuery(pk: string) {
  const data: QueryCommandInput = await execute({
    TableName: 'windfarm',
    KeyConditionExpression: '#pk = :pk And begins_with(#sk, :sk)',
    ExpressionAttributeNames: {
      '#pk': 'pk',
      '#sk': 'sk'
    },
    ExpressionAttributeValues: {
      ':pk': pk,
      ':sk': 'reading'
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'TOTAL'
    // Limit: 10
  });
  return data;
}
