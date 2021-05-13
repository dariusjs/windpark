import { windTurbineQuery } from '../server/assetsView';
import Table from '../components/Table';
import React, { useEffect, useMemo, useState } from 'react';
import { WindTurbineType } from '../server/types/storage';
import Link from 'next/link';
import { windTurbine, value } from '../server/types/api';

function WindTurbine({ windTurbine }: windTurbine) {
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'col1',
        Cell: ({ value }: value) => (
          <Link href={{ pathname: '/readings', query: { turbine: value } }}>
            <a>{value}</a>
          </Link>
        )
      },
      {
        Header: 'Manufacturer',
        accessor: 'col2'
      },
      {
        Header: 'Model',
        accessor: 'col3'
      },
      {
        Header: 'Location',
        accessor: 'col4'
      }
    ],
    []
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const allTurbines = windTurbine.map((element: WindTurbineType) => {
        return {
          col1: element.pk,
          col2: element.manufacturer,
          col3: element.model,
          col4: element.location
        };
      });
      setData(allTurbines);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const sk = query.windfarm;

  const windTurbine = await windTurbineQuery(sk);
  return { props: { windTurbine } };
}

export default WindTurbine;
