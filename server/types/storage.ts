import * as t from 'io-ts';

export const WindTurbine = t.type({
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

export enum WindFarmVariation {
  Land = 'land',
  OffShore = 'offshore'
}

const WindFarmTypeV = t.keyof({
  [WindFarmVariation.Land]: null,
  [WindFarmVariation.OffShore]: null
});

export const WindFarm = t.type({
  pk: t.string,
  sk: t.string,
  kWOut: t.number,
  manufacturer: t.string,
  type: WindFarmTypeV,
  gsi1pk1: t.string,
  gsi1sk1: t.string,
  windfarm: t.string
});

export const TurbineReadings = t.type({
  pk: t.string,
  sk: t.string,
  date: t.string,
  kWOut: t.number,
  wind: t.number
});

export type WindTurbineType = t.TypeOf<typeof WindTurbine>;
export type WindFarmType = t.TypeOf<typeof WindFarm>;
export type TurbineReadingsType = t.TypeOf<typeof TurbineReadings>;
