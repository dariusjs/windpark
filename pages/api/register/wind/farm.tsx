import { either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import { createAsset } from '../../../../server/assetsView';
import { WindFarm, WindFarmType, WindFarmVariation } from '../../../../server/types/storage';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    console.log(req.body);

    const windFarm: WindFarmType = {
      pk: req.body.name,
      sk: req.body.name,
      // type: req.body.type,
      type: WindFarmVariation.Land,
      manufacturer: req.body.manufacturer,
      windfarm: req.body.name,
      gsi1pk1: 'windfarm',
      gsi1sk1: `type#${WindFarmVariation.Land}`,
      kWOut: 0
    };
    console.log(windFarm);
    const validate: WindFarmType = pipe(
      WindFarm.decode(windFarm),
      either.fold(
        (error: any) => {
          console.log('are we failing');
          // res.status(500).json({ name: 'Unable to Process Data' });
          throw error;
        },
        (data: WindFarmType) => {
          return data;
        }
      )
    );
    if (validate) {
      await createAsset(validate);
      res.status(200).json({ name: 'Succesfull post of data' });
    } else {
      res.status(500).json({ name: 'Unable to Process Data' });
    }
  } else {
    res.status(200).json({ user: 'Hello World' });
  }
}
