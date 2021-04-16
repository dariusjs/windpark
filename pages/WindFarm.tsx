import { windFarmQuery } from '../server/assetsView';
import Table from '../components/Table';
import React, { useEffect, useState } from 'react';
import { WindFarmType, WindTurbineType } from '../server/types/storage';
import Link from 'next/link';

function WindTurbine({ windFarm }: any) {
  const allWindFarms = windFarm.map((element: WindFarmType) => {
    return {
      col1: element.windfarm,
      col2: element.type,
      col3: element.manufacturer,
      col4: element.kWOut
    };
  });

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'col1',
        Cell: ({ value }: any) => (
          <Link href={{ pathname: 'WindTurbine', query: { windfarm: value } }}>
            <a>{value}</a>
          </Link>
        )
      },
      {
        Header: 'Type',
        accessor: 'col2'
      },
      {
        Header: 'Constructor',
        accessor: 'col3'
      },
      {
        Header: 'Total Output kWh',
        accessor: 'col4'
      }
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const allWindFarms = windFarm.map((element: WindFarmType) => {
        return {
          col1: element.pk,
          col2: element.type,
          col3: element.manufacturer,
          col4: element.kWOut
        };
      });
      setData(allWindFarms);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const windFarm = await windFarmQuery();
  return { props: { windFarm } };
}

export default WindTurbine;
