// routes/manPowerRoutes.js
const express = require('express');
const db = require('../db');

const router = express.Router();




router.post('/', (req, res) => {
  console.log('Incoming data:', req.body);

  const workOrder = req.body;

  const sql =
    'INSERT INTO tbWorkOrderDetails (JobNo, ServiceDescription, ServiceLineNo, UoM, ContractRate) VALUES ?';

  const values = workOrder.map(item => [
    item.JobNo,
    item.ServiceDescription,
    item.ServiceLineNo,
    item.UoM,
    item.ContractRate,
  ]);

  console.log('Values to be inserted:', values);

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    console.log('Data inserted successfully');
    res.status(201).json({ message: 'Data inserted successfully' });
  });
})










// Get all job ManPower details
router.get('/', (req, res) => {
  // Define the SQL query to retrieve all job ManPower details
  // const sql = 'SELECT * FROM tbNewJobManPowerDetails';


  const sql = 'SELECT * FROM tbWorkOrderDetails';

  // Execute the SQL query to retrieve ManPower detail data
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Job ManPower details retrieved:', rows);
      res.status(200).json(rows); // Send the retrieved data as JSON response
    }
  });
});

module.exports = router;
