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
    const { PropertyName ,CropName } = req.body;
    // ==> WE HAVE MORE FIELDS IN THE SCHEMA, WE NEED TO ADD THEM HERE AS WELL
    // OR AT LEAST DECIDE WHICH ARE MANDATORY AND WHICH ARE OPTIONAL.
    
    // add to db
    try{
        const newData = await projdata.create({ }); // need to check what and how to add the data to the DB.
        res.status(200).json(newData);
        console.log("Data added to database");
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}


// delete data -  Works on deleting using id, might need to change to delete using other fields.
const deleteData = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No data with id: ${id}`); // catch invalid id.

    const data= await projdata.findOneAndDelete({_id: id});

    if (!data) return res.status(404).json({message: `No data with id: ${id}`});
    res.status(200).json({message: 'Data deleted successfully'});
   
}

// update data - Works on updating using id, might need to change to update using other fields.
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