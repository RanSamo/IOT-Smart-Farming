const express = require('express');
const { getAllData,
    getSingleData,
    createData,
    deleteData,
    updateData
} = require('../controllers/projectController');
const router = express.Router();

// GET all data
router.get('/', getAllData);

// GET one data
router.get('/:id', getSingleData);

// POST new data
router.post('/api/data', createData);

// DELETE data
router.delete('/api/data/:id', deleteData);

// PATCH data
router.patch('/api/data/:id', updateData);


module.exports = router; 