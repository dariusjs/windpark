import { useTable } from 'react-table';
import { windTurbineQuery } from '../server/assetsView';
import Table from '../components/Table';
import React, { useEffect, useMemo, useState } from 'react';
import { WindTurbineType } from '../server/types/storage';
import Link from 'next/link';
import axios from 'axios';

function WindTurbine() {
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'col1',
        Cell: ({ value }: any) => (
          <Link href="/Readings">
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
      const windTurbine = await windTurbineQuery();

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

export default WindTurbine;
