import * as t from 'io-ts';

const WindTurbine = t.type({
  pk: t.string,
  sk: t.string,
  manufacturer: t.string,
  model: t.string,
  location: t.string,
  type: t.string,
  gsi1pk1: t.string,
  gsi1sk1: t.string,
  windfarm: t.string
});

const WindFarm = t.type({
  pk: t.string,
  sk: t.string,
  kWOut: t.string,
  manufacturer: t.string,
  type: t.string,
  gsi1pk1: t.string,
  gsi1sk1: t.string,
  windfarm: t.string
});

const TurbineReadings = t.type({
  pk: t.string,
  sk: t.string,
  date: t.string,
  kWOut: t.string,
  wind: t.string
});

export type WindTurbineType = t.TypeOf<typeof WindTurbine>;
export type WindFarmType = t.TypeOf<typeof WindFarm>;
export type TurbineReadingsType = t.TypeOf<typeof TurbineReadings>;
