const express = require('express');

const router = express.Router();

const { sql, poolPromise } = require('../db'); //not sure this is the correct way to call our DB will investigate later.

router.get('/projects', async (req, res) => { //not sure this is the correct way to call our DB will investigate later.
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Projects');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// GET all data
router.get('/api/data', (req, res) => {
    res.json({message:'GET all data'})
})

// GET one data
router.get('/api/data/:id', (req, res) => {
    res.json({message:'GET one data'})
})

// POST new data
router.post('/api/data', (req, res) => {
    res.json({message:'POST new data'})
})

// DELETE data
router.delete('/api/data/:id', (req, res) => {
    res.json({message:'DELETE data'})
})

// PATCH data
router.patch('/api/data/:id', (req, res) => {
    res.json({message:'UPDATE data'})
})


module.exports = router;