const express = require('express');
const projdata = require('../models/datamodel');
const router = express.Router();

// GET all data
// router.get('/api/data', (req, res) => {
//     res.json({message:'GET all data'})
// })
router.get('/', (req, res) => {
    res.json({message:'GET all data'})
})

// GET one data
router.get('/:id', (req, res) => {   
    res.json({message:'GET one data'})
})

// POST new data
router.post('/api/data', async (req, res) => {
    const { title, reps, load } = req.body;
    try {
        const newData = new projdata({ title, reps, load });
        await newData.save();
        res.status(200).json(newData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    // const {title, reps, load} = req.body
    // try{
    //     const newData = new projdata({title, reps, load})
    //     await newData.save()
    //     res.statusCode(200).json(newData)
    //     res.status(200).json(newData)
    // } catch(err){
    //     res.status(400).json({error: error.message})
    // }
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