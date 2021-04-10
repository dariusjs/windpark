import { useTable } from 'react-table';
import { windTurbineQuery, windTurbineReadingsQuery } from '../server/assetsView';
import Table from '../components/Table';
import React, { useEffect, useMemo, useState } from 'react';
import { TurbineReadingsType, WindTurbineType } from '../server/types/storage';
import Link from 'next/link';
import axios from 'axios';

function Readings() {
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
      const windTurbine = await windTurbineReadingsQuery('1a29ce7d-31ab-499a-9404-ed3f00402b18');

      const allTurbines = windTurbine.Items.map((element: TurbineReadingsType) => {
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

export default Readings;
