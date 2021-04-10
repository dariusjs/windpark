import { DynamoDBClient, CreateTableCommand, PutItemCommand, UpdateTableCommand } from '@aws-sdk/client-dynamodb';
import windfarm from '../windfarm.json';

const REGION = 'REGION';
const dynamoTableName = 'windfarm';
const tableParams = {
  KeySchema: [
    { AttributeName: 'pk', KeyType: 'HASH' },
    { AttributeName: 'sk', KeyType: 'RANGE' }
  ],
  AttributeDefinitions: [
    { AttributeName: 'pk', AttributeType: 'S' },
    { AttributeName: 'sk', AttributeType: 'S' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  GlobalSecondaryIndexUpdates: [
    {
      Create: {
        IndexName: windfarm.DataModel[0].GlobalSecondaryIndexes[0].IndexName,
        KeySchema: [
          { AttributeName: 'gsi1pk1', KeyType: 'HASH' },
          { AttributeName: 'gsi1sk1', KeyType: 'RANGE' }
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1
        }
      }
    }
  ],
  TableName: dynamoTableName,
  StreamSpecification: {
    StreamEnabled: false
  }
};
const gsiParams = {
  TableName: dynamoTableName,
  AttributeDefinitions: [
    {
      AttributeName: windfarm.DataModel[0].GlobalSecondaryIndexes[0].KeyAttributes.PartitionKey.AttributeName,
      AttributeType: 'S'
    },
    {
      AttributeName: windfarm.DataModel[0].GlobalSecondaryIndexes[0].KeyAttributes.SortKey.AttributeName,
      AttributeType: 'S'
    }
  ],
  GlobalSecondaryIndexUpdates: [
    {
      Create: {
        IndexName: windfarm.DataModel[0].GlobalSecondaryIndexes[0].IndexName,
        KeySchema: [
          {
            AttributeName: windfarm.DataModel[0].GlobalSecondaryIndexes[0].KeyAttributes.PartitionKey.AttributeName,
            KeyType: 'HASH'
          },
          {
            AttributeName: windfarm.DataModel[0].GlobalSecondaryIndexes[0].KeyAttributes.SortKey.AttributeName,
            KeyType: 'RANGE'
          }
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1
        }
      }
    }
  ]
};

const dbclient = new DynamoDBClient({
  endpoint: 'http://localhost:8000',
  region: REGION
});

const abc = windfarm.DataModel[0].TableData;
for (const element of abc) {
  console.log({
    TableName: dynamoTableName,
    Item: element
  });
}

const run = async () => {
  try {
    await dbclient.send(new CreateTableCommand(tableParams));
    console.log('Table created.');

    const abc: any = windfarm.DataModel[0].TableData;
    for (const element of abc) {
      await dbclient.send(
        new PutItemCommand({
          TableName: dynamoTableName,
          Item: element
        })
      );
      console.log(element);
    }
    console.log('Data Loaded.');
    console.log('gsiParams', JSON.stringify(gsiParams, null, 2));

    await dbclient.send(new UpdateTableCommand(gsiParams));
  } catch (err) {
    console.log('Error', err);
  }
};
run();
