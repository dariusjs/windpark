import { execute } from './dynamo';

export async function windTurbineQuery() {
  const data = await execute({
    TableName: 'windfarm',
    IndexName: 'assets',
    KeyConditionExpression: '#bef90 = :bef90',
    ExpressionAttributeNames: { '#bef90': 'gsi1pk1' },
    ExpressionAttributeValues: { ':bef90': 'turbine' }
  });
  return data;
}

export async function windFarmQuery() {
  const data = await execute({
    TableName: 'windfarm',
    IndexName: 'assets',
    KeyConditionExpression: '#bef90 = :bef90',
    ExpressionAttributeNames: { '#bef90': 'gsi1pk1' },
    ExpressionAttributeValues: { ':bef90': 'windfarm' }
  });
  return data;
}

export async function windTurbineReadingsQuery(pk: string) {
  const data = await execute({
    TableName: 'windfarm',
    KeyConditionExpression: '#bef90 = :bef90 And begins_with(#bef91, :bef91)',
    ExpressionAttributeValues: {
      ':bef90': pk,
      ':bef91': 'reading'
    },
    ExpressionAttributeNames: {
      '#bef90': 'pk',
      '#bef91': 'sk'
    }
  });
  return data;
}
