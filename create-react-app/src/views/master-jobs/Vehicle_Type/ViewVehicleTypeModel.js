// ViewWorkOrderModal.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent,  Button } from '@mui/material';

const ViewVehicleTypeModel = ({  onClose }) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>View Work Order</DialogTitle>
      <DialogContent>
       View Vehicle Details 
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ViewVehicleTypeModel;
