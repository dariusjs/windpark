"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.windTurbineReadingsQuery = exports.windFarmQuery = exports.windTurbineQuery = void 0;
const dynamo_1 = require("./dynamo");
async function windTurbineQuery() {
    const data = await dynamo_1.execute({
        TableName: 'windfarm',
        IndexName: 'assets',
        KeyConditionExpression: '#bef90 = :bef90',
        ExpressionAttributeNames: { '#bef90': 'gsi1pk1' },
        ExpressionAttributeValues: { ':bef90': 'turbine' }
    });
    return data;
}
exports.windTurbineQuery = windTurbineQuery;
async function windFarmQuery() {
    const data = await dynamo_1.execute({
        TableName: 'windfarm',
        IndexName: 'assets',
        KeyConditionExpression: '#bef90 = :bef90',
        ExpressionAttributeNames: { '#bef90': 'gsi1pk1' },
        ExpressionAttributeValues: { ':bef90': 'windfarm' }
    });
    return data;
}
exports.windFarmQuery = windFarmQuery;
async function windTurbineReadingsQuery(pk) {
    const data = await dynamo_1.execute({
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
exports.windTurbineReadingsQuery = windTurbineReadingsQuery;
