import { PutCommandInput, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { documentClientPut, execute } from './dynamo';
import { WindFarmType, WindTurbineType } from './types/storage';

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

export async function createAsset<AssetType>(items: AssetType) {
  const data: PutCommandInput = await documentClientPut({
    TableName: 'windfarm',
    Item: items,
    ConditionExpression: 'attribute_not_exists(pk)'
  });
  return data;
}

// export async function createWindTurbine(items: WindTurbineType) {
//   const data: PutCommandInput = await documentClientPut({
//     TableName: 'windfarm',
//     Item: items,
//     ConditionExpression: 'attribute_not_exists(pk)'
//   });
//   return data;
// }
