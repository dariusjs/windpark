import { either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import { createAsset } from '../../../../server/assetsView';
import { WindTurbine, WindTurbineType } from '../../../../server/types/storage';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    console.log(req.body);

    const windFarm: WindTurbineType = {
      pk: req.body.name,
      sk: req.body.name,
      type: 'turbine',
      manufacturer: req.body.manufacturer,
      windfarm: req.body.windfarm,
      model: req.body.location,
      location: req.body.location,
      gsi1pk1: 'turbine',
      gsi1sk1: `windfarm#${req.body.windfarm}#id#${req.body.name}`
    };
    console.log(windFarm);
    const validate: WindTurbineType = pipe(
      WindTurbine.decode(windFarm),
      either.fold(
        (error: any) => {
          console.log('are we failing');
          // res.status(500).json({ name: 'Unable to Process Data' });
          throw error;
        },
        (data: WindTurbineType) => {
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
