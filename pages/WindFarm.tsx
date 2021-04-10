import { useTable } from 'react-table';
import { windFarmQuery } from '../server/assetsView';
import Table from '../components/Table';
import React from 'react';
import { WindFarmType } from '../server/types/storage';

function WindTurbine({ windFarm }: any) {
  const allTurbines = windFarm.map((element: WindFarmType) => {
    return {
      col1: element.windfarm,
      col2: element.type,
      col3: element.manufacturer,
      col4: element.kWOut
    };
  });

  const data = React.useMemo(() => allTurbines, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'col1'
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

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

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
