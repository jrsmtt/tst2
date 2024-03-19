// TableModal.js
import React from 'react';
import { Modal, Paper, Typography } from '@mui/material';

const TableModal = ({ open, handleClose, tableViewData }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', width: '50%', maxHeight: '70%', overflow: 'auto', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <Typography variant="h5" gutterBottom>
          Table View Data
        </Typography>
        <Paper elevation={3} style={{ padding: '10px' }}>
          <pre>{JSON.stringify(tableViewData, null, 2)}</pre>
        </Paper>
      </div>
    </Modal>
  );
};

export default TableModal;



// ParentComponent.js
import React, { useState } from 'react';
import TableModal from './TableModal';
import { Button } from '@mui/material';

const ParentComponent = () => {
  const [open, setOpen] = useState(false);
  const [tableViewData, setTableViewData] = useState({/* Your JSON data here */});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Open Modal</Button>
      <TableModal open={open} handleClose={handleClose} tableViewData={tableViewData} />
    </div>
  );
};

export default ParentComponent;







// TableModal.js
import React from 'react';
import { Modal, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const TableModal = ({ open, handleClose, tableViewData }) => {
  const renderTableData = () => {
    return Object.keys(tableViewData).map((key, index) => (
      <TableRow key={index}>
        <TableCell component="th" scope="row">{key}</TableCell>
        <TableCell>{tableViewData[key]}</TableCell>
      </TableRow>
    ));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', width: '50%', maxHeight: '70%', overflow: 'auto', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <Typography variant="h5" gutterBottom>
          Table View Data
        </Typography>
        <Paper elevation={3} style={{ padding: '10px' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Key</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderTableData()}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </Modal>
  );
};

export default TableModal;


