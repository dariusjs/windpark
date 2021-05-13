import { windTurbineReadingsQuery } from '../server/assetsView';
import Table from '../components/Table';
import React, { useEffect, useMemo, useState } from 'react';
import { TurbineReadingsType } from '../server/types/storage';

function Readings({ windTurbine }) {
  const columns = useMemo(
    () => [
      {
        Header: 'date',
        accessor: 'col1'
      },
      {
        Header: 'ID',
        accessor: 'col2'
      },
      {
        Header: 'kWOut',
        accessor: 'col3'
      },
      {
        Header: 'wind',
        accessor: 'col4'
      }
    ],
    []
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      // const windTurbine = await windTurbineReadingsQuery(turbine);

      const allTurbines = windTurbine.map((element: TurbineReadingsType) => {
        return {
          col1: element.date,
          col2: element.pk,
          col3: element.kWOut,
          col4: element.wind
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
  const pk = query.turbine;

  const windTurbine = await windTurbineReadingsQuery(pk);
  return { props: { windTurbine } };
}

export default Readings;
