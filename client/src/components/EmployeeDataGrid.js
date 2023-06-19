import * as React from 'react';
import { DataGrid, useGridApiContext } from '@mui/x-data-grid';

import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import {  Grid } from '@mui/material';
import { updateEmployee,deleteEmployees} from '../services/EmployeeService';



const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
            updateEmployee(user.id,user).then((response) => {
                resolve(response.data);
            }
            ).catch((error) => {
                alert(error)
                reject(error);
            }
            )


        }, 200);
      }),
    [],
  );
};

function computeMutation(newRow, oldRow) {
    if (newRow.empId !== oldRow.empId) {
        return `empId from ${oldRow.empId} to ${newRow.empId}`;
    }
    if (newRow.firstName !== oldRow.firstName) {
        return `firstName from ${oldRow.firstName} to ${newRow.firstName}`;
    }
    if (newRow.lastName !== oldRow.lastName) {
        return `lastName from ${oldRow.lastName} to ${newRow.lastName}`;
    }
    if (newRow.hourlyRate !== oldRow.hourlyRate) {
        return `salary from ${oldRow.salary} to ${newRow.salary}`;
    }
    if (newRow.contact !== oldRow.contact) {
        return `contact from ${oldRow.contact} to ${newRow.contact}`;
    }
    

  return null;
}

export  function EmployeeDataGrid({employees: rows,setEmployees}) {
    
  const mutateRow = useFakeMutation();
  const yesButtonRef = React.useRef(null);
  const [promiseArguments, setPromiseArguments] = React.useState(null);

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
       
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    [],
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: "Field can't be empty", severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
     yesButtonRef.current?.focus();
  };
  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

   
   
    

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNo}>
            No
          </Button>
          <Button ref ={yesButtonRef} onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  
  const [selectionModel, setSelectionModel] = React.useState([]);
  const handleSelection = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
  };
// given selection model [ 1,2] make it [{id:1},{id:2}]
  const selectedRows = selectionModel.map((row) => {
    return rows.find((r) => r.id === row);
  });

  return (
     <Grid  container spacing={2} marginTop={1}  >
    <Grid item xs={12} minHeight={"50px"} >
    {selectionModel.length>0 && <Button variant="contained" color="error" onClick={async () => {try {
        await deleteEmployees(selectedRows);
        setEmployees(rows.filter((row) => !selectionModel.includes(row.id)));
        setSelectionModel([]);
      } catch (error) {
        alert(error);
      }}}
      >Delete</Button>}
    </Grid>

    <Grid item xs={12} height={"70vh"}>
      {renderConfirmDialog()}
      <DataGrid  rows={rows} columns={columns} processRowUpdate={processRowUpdate} checkboxSelection onRowSelectionModelChange={handleSelection}/>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
      </Grid>
    </Grid>
  );
}

/*
const columns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', editable: true },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    
   
  },
];
*/



const columns = [
    {field: 'employeeNumber', headerName: 'Employee Number', width: 180, editable: true},
    {field: 'firstName', headerName: 'First Name', width: 180, editable: true},
    {field: 'lastName', headerName: 'Last Name', width: 180, editable: true},
    {field: 'hourlyRate', headerName: 'Hourly Rate', width: 180, editable: true},
    {field: 'contact', headerName: 'Contact', width: 180, editable: true}
];
