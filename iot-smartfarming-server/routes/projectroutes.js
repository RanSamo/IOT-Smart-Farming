const express = require('express');
const { getAllData,
    getSingleData,
    getLastData,
    createData,
    deleteData,
    updateData
} = require('../controllers/projectController');
const { getinsights } = require('../insightsAPI');
const router = express.Router();

// GET all data - irrelevant for now.
//router.get('/', getAllData);

// GET last data
router.get('/getLastData', getLastData); //This GET gets the last data recoreded in the DB.

/*
// POST for data to groq API
router.post('/api/insights', async (req, res) =>{
    const message = req.body.message;
    await getinsights(message).then(() =>{
    res.status(200).json({message: 'Chat Completed.'}); 
    }).catch((error) =>{
        res.status(400).json({error: error.message});    
});
});
*/


// the Groq says this is the preffered way to do it, but I think the above works as well, need to check.
//TODO. need to check which of the posts are better for this function, will see after Paz's part in the frontend.
router.post('/api/insights', async (res, req) => {
    await getinsights(res,req);
});

// GET one data
router.get('/:id', getSingleData);

// POST new data
router.post('/api/data', createData);

// DELETE data
router.delete('/api/data/:id', deleteData);

// PATCH data
router.patch('/api/data/:id', updateData);


module.exports = router; 