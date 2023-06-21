import { PutCommandInput, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { documentClientPut, query } from './dynamo';
import { TurbineReadingsType, WindFarmType, WindTurbineType } from './types/storage';

export async function windTurbineQuery(sk: string): Promise<
  {
    [key: string]: WindFarmType[];
  }[]
> {
  const data = await query({
    TableName: 'windfarm',
    IndexName: 'assets',
    KeyConditionExpression: '#pk = :pk And begins_with(#sk, :sk)',
    ExpressionAttributeNames: { '#pk': 'gsi1pk1', '#sk': 'gsi1sk1' },
    ExpressionAttributeValues: { ':pk': 'turbine', ':sk': `windfarm#${sk}` },
    ReturnConsumedCapacity: 'TOTAL'
  });
  return data.Items!;
}

export async function windFarmQuery(): Promise<
  {
    [key: string]: WindFarmType[];
  }[]
> {
  const data = await query({
    TableName: 'windfarm',
    IndexName: 'assets',
    KeyConditionExpression: '#pk = :pk',
    ExpressionAttributeNames: { '#pk': 'gsi1pk1' },
    ExpressionAttributeValues: { ':pk': 'windfarm' },
    ReturnConsumedCapacity: 'TOTAL'
  });
  return data.Items!;
}

export async function windTurbineReadingsQuery(pk: string): Promise<
  {
    [key: string]: TurbineReadingsType[];
  }[]
> {
  const data = await query({
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
  return data.Items!;
}

export async function createAsset<AssetType>(items: AssetType) {
  const data: PutCommandInput = await documentClientPut({
    TableName: 'windfarm',
    Item: items,
    ConditionExpression: 'attribute_not_exists(pk)'
  });
  return data;
}
