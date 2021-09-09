import React from 'react';
import UsersTable from 'components/Table';
import {columnNames, defaultFormValues, initialTableData} from 'data/initialTableData';

function App() {
  return (
      <UsersTable
        columns={Object.values(columnNames)}
        initialTableData={initialTableData}
        defaultFormValues={defaultFormValues}
      />
  );
}

export default App;
