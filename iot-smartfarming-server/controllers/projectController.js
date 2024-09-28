const projdata = require('../models/datamodel');
const mongoose = require('mongoose');

// get all data
const getAllData = async (req, res) => {
    try{
        const allData = await projdata.find().sort({ createdAt: -1 }); // sort by newest first
        res.status(200).json(allData);
    }
    catch(error){
        res.status(404).json({ error: error.message });
    }
}

// get a single data
const getSingleData = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No data with id: ${id}`); // catch invalid id.

    const singleData = await projdata.findById(id);
    if(!singleData) return res.status(404).json({message: `No data with id: ${id}`});
    res.status(200).json(singleData);
    
}

// post new data
const createData = async (req, res) => {
    const { title, reps, load } = req.body;

    // add to db
    try{
        const newData = await projdata.create({ title, reps, load });
        res.status(200).json(newData);
        console.log("Data added to database");
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}


// delete data
const deleteData = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No data with id: ${id}`); // catch invalid id.

    const data= await projdata.findOneAndDelete({_id: id});

    if (!data) return res.status(404).json({message: `No data with id: ${id}`});
    res.status(200).json({message: 'Data deleted successfully'});
   
}

// update data
const updateData = async (req,res) =>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No data with id: ${id}`); // catch invalid id.
    const data = await projdata.findOneAndUpdate({_id:id},{
        ...req.body // whatever is in the body of the request, update it.
    })
    if (!data) return res.status(404).json({message: `No data with id: ${id}`});
    res.status(200).json(data);
}

module.exports = { 
    getAllData,getSingleData,createData,deleteData,updateData
};