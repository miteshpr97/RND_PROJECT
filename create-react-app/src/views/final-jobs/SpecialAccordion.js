// components/SpecialAccordionjs
import React, { useState, useEffect } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    TextField,
    Grid
  } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const initialFormData = {
  JobNo: '',
  SpecialPackageNo: '',
  TransporterID: '',
  VehicleNo: '',
  DriverName: '',
  WOLineNo: '',
  TaskDate: '',
  BuyCost: ''
};

const SpecialAccordion = ({ expanded, onAccordionChange, setFormData, jobNo }) => {
  const [formList, setFormList] = useState([initialFormData]);

  const [transportCodes, setTransportCodes] = useState([]);

  const [workOrderData, setworkOrderData] = useState([]);

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormList = [...formList];
    updatedFormList[index] = {
      ...updatedFormList[index],
      [name]: value,
      // Preserve the existing JobNo
      JobNo: index === 0 ? jobNo : updatedFormList[index].JobNo
    };
    setFormList(updatedFormList);
    setFormData(updatedFormList); // Update the parent component's formData
  };

  // const handleAddForm = () => {
  //     setFormList([...formList, { ...initialFormData }]);
  // };

  const handleAddForm = () => {
    setFormList([...formList, { ...initialFormData, JobNo: jobNo }]);
  };

  const handleDeleteForm = (index) => {
    if (index !== 0) {
      const updatedFormList = [...formList];
      updatedFormList.splice(index, 1);
      setFormList(updatedFormList);
    }
  };

  useEffect(() => {
    async function fetchTransporter() {
      try {
        const response = await fetch(`${REACT_APP_API_URL}api/transport`);
        if (response.ok) {
          const transporterData = await response.json();

          const codesAndNames = transporterData.map((transport) => ({
            TransporterID: transport.TransporterID,
            Name: transport.Name
          }));
          setTransportCodes(codesAndNames);
        } else console.error('Error fetching customer data');
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    }
    fetchTransporter();
  }, []);

  const transporterDetails = transportCodes.map((transporter) => (
    <MenuItem key={transporter.TransporterID} value={transporter.TransporterID}>
      {`${transporter.TransporterID} - ${transporter.Name}`}
    </MenuItem>
  ));

  useEffect(() => {
    async function fetchWorkOrder() {
      try {
        const response = await fetch(`${REACT_APP_API_URL}api/workOrder/orderByFour`);
        if (response.ok) {
          const workOrderData = await response.json();
          console.log(workOrderData, 'data dilkjhao');

          const codesAndNames = workOrderData.map((workOrder) => ({
            ServiceLineNo: workOrder.ServiceLineNo,
            UoM: workOrder.UoM,
            ContractRate: workOrder.ContractRate
          }));
          setworkOrderData(codesAndNames);
        } else console.error('Error fetching customer data');
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    }

    fetchWorkOrder();

    // Include dependencies in the array if there are any
  }, []); // <-- Add dependencies here if needed

  console.log(workOrderData, 'klsjdkjjd');

  const workDetails = workOrderData.map((workOrder) => (
    <MenuItem key={workOrder.ServiceLineNo} value={workOrder.ServiceLineNo}>
      {`${workOrder.ServiceLineNo}`}
    </MenuItem>
  ));

  const workDetailsUOM = workOrderData.map((UOMData) => (
    <MenuItem key={UOMData.UoM} value={UOMData.UoM}>
      {`${UOMData.UoM}`}
    </MenuItem>
  ));


  console.log(workDetailsUOM)

  return (
    <Accordion
      expanded={expanded}
      sx={{
        border: '0.5px solid #055F85',
        marginTop: '20px'
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={onAccordionChange}
        sx={{
          borderBottom: '1px solid #055F85'
        }}
      >
        <Typography variant="h3">Special Package</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" gutterBottom>
            Special Package are used for this job
          </Typography>
          <Button variant="contained" style={{ backgroundColor: '#055f85', color: 'white' }} onClick={handleAddForm}>
            +Add Logistics
          </Button>
        </div>

        <br />

        {formList.map((formData, index) => (
          <form key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
              {index !== 0 && (
                <Button
                  style={{
                    marginBottom: '20px',
                    marginLeft: 'auto',
                    backgroundColor: '#f7114a', // Set the background color to #f98a86
                    color: 'white' // Set the text color to white (or any other suitable color)
                  }}
                  variant="contained"
                  onClick={() => handleDeleteForm(index)}
                  startIcon={<ClearIcon />}
                >
                  Delete
                </Button>
              )}
            </div>

            <Grid container spacing={3}>
              <Grid item xs={3} md={2}>
                <TextField
                  label="JobNo"
                  fullWidth
                  variant="outlined"
                  name="JobNo"
                  value={formData.JobNo === '' ? jobNo : formData.JobNo}
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={3} md={2}>
                <TextField
                  label="SpecialPackageNo"
                  fullWidth
                  variant="outlined"
                  name="SpecialPackageNo"
                  value={formData.SpecialPackageNo}
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Transporter ID</InputLabel>
                  <Select
                    defaultValue=""
                    label="Transporter ID"
                    name="TransporterID"
                    value={formData.TransporterID}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <MenuItem value="" disabled>
                      Select Transporter ID
                    </MenuItem>
                    {transporterDetails}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3} md={2}>
                <TextField
                  label="VehicleNo"
                  fullWidth
                  variant="outlined"
                  name="VehicleNo"
                  value={formData.VehicleNo}
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={3} md={2}>
                <TextField
                  label="DriverName"
                  fullWidth
                  variant="outlined"
                  name="DriverName"
                  value={formData.DriverName}
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>

              <Grid item xs={6} md={2}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>WOLine No</InputLabel>
                  <Select
                    defaultValue=""
                    label="WOLine No"
                    name="WOLineNo"
                    value={formData.WOLineNo}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <MenuItem value="" disabled>
                      Select WOLine No
                    </MenuItem>
                    {workDetails}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3} md={2}>
                <TextField
                  label="TaskDate"
                  fullWidth
                  variant="outlined"
                  name="TaskDate"
                  type="date"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={formData.TaskDate}
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>
              <Grid item xs={3} md={2}>
                <TextField
                  label="BuyCost"
                  fullWidth
                  variant="outlined"
                  name="BuyCost"
                  value={formData.BuyCost}
                  onChange={(e) => handleChange(e, index)}
                />
              </Grid>

              {/* <Grid item xs={3} md={2}>
                                <Button variant="contained" color="primary" type="submit">
                                    Submit
                                </Button>

                            </Grid> */}
            </Grid>
          </form>
        ))}
        {/* <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button> */}
      </AccordionDetails>
    </Accordion>
  );
};

export default SpecialAccordion;
