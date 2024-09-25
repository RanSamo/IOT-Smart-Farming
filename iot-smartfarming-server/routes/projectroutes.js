const express = require('express');

const router = express.Router();

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