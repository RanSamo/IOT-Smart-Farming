const express = require('express');
const { getAllData,
    getSingleData,
    getLastData,
    createData,
    deleteData,
    updateData
} = require('../controllers/projectController');
const router = express.Router();

// GET all data - irrelevant for now.
//router.get('/', getAllData);

// GET last data
router.get('/getLastData', getLastData); //This GET gets the last data recoreded in the DB.

// GET one data
router.get('/:id', getSingleData);

// POST new data
router.post('/api/data', createData);

// DELETE data
router.delete('/api/data/:id', deleteData);

// PATCH data
router.patch('/api/data/:id', updateData);


module.exports = router; 