const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    location: { 
      type: String,
      required: true,
    },
    monitoringData: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Project', 
        },
    ],
    cropType: {
      type: String,
      required: true,
  },
    alerts: [{
      message: String,
      timestamp: Date,
  }],
  },{timestamps: true});

  const Farm = mongoose.model('Farm', farmSchema);
  
  module.exports = Farm;
  