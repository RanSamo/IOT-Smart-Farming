const mongoose = require('mongoose');
const projdata = require('../models/datamodel'); 

const calculateHealthScore = (humidity, lightIntensity, phLevel) => { // the function that gives the score with the given parameters.
    const idealHumidity = 60;
    const idealLightIntensity = 50;
    const idealPhMin = 6;
    const idealPhMax = 7.5;

    let score = 100;

    // Calculate humidity score
    score -= Math.abs(humidity - idealHumidity) * 0.5;

    // Calculate light intensity score
    score -= Math.abs(lightIntensity - idealLightIntensity) * 0.5;

    // Calculate pH level score
    if (phLevel < idealPhMin) {
        score -= (idealPhMin - phLevel) * 10;
    } else if (phLevel > idealPhMax) {
        score -= (phLevel - idealPhMax) * 10;
    }

    return Math.max(0, score); // Ensure score is not negative
};

const getAllAverageData = async () => {
    try {
        const allData = await projdata.aggregate([
            {
                $group: {
                    _id: { // this is to make sure this  func will work for years to come, not only for recent days.
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" }
                    },
                    avgHumidity: { $avg: "$humidity" },
                    avgLightIntensity: { $avg: "$lightIntensity" },
                    avgPhLevel: { $avg: "$phLevel" },
                    avgSoilMoisture: { $avg: "$soilMoisture" },
                    avgTemperature: { $avg: "$temperature" }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } // Sort by date in ascending order.
            }
        ]);

        const results = allData.map(dayData => { // this array generates the data for the health score.
            const { avgHumidity, avgLightIntensity, avgPhLevel, avgSoilMoisture, avgTemperature } = dayData;
            const healthScore = calculateHealthScore(avgHumidity, avgLightIntensity, avgPhLevel);

            return { // after the data was generated, this is what the function returns, for each day.
                date: new Date(Date.UTC(dayData._id.year, dayData._id.month - 1, dayData._id.day)),
                healthScore,
                avgSoilMoisture,
                avgTemperature
            };
        });

        return results;
    } catch (error) {
        console.error("Error fetching average data:", error);
        throw error;
    }
};

module.exports = {getAllAverageData};
