//geoapify a good alternative for google maps

const { returnDescription } = require('../api/geminiDescription');
const {getNearbyDestinations} = require('../api/googleMapsInt')
const Reviews = require('../model/Reviews');

const getNearbyPlaces = async (req,res)=>{
    const {location,radius,destinationType} = req.body

    if(!location || !radius) return res.status(400).json({ message: "Location and Latitude are required." });

   

    //now requesting from google maps api
    
    
    const destinations = await  getNearbyDestinations(location,radius,destinationType)
    
    
    
    // destinations.forEach((place)=>{
    //     // const dest
    // })
    res.status(200).json({"ref":destinations})
    
    
}


const getReviews = async (req,res)=>{
    const {lat,lng} = req.query;
    if(!lat||!lng) return res.status(400).json({ message: "Location and Latitude are required." });
    try{
        const reviewsList = await Reviews.findOne({'location.longitude':lng,
                                                    'location.latitude':lat
        });

        if((reviewsList))return res.status(200).json({"reviews":reviewsList.reviews}) 
        res.status(200).json({"reviews":[]})
    }catch(err){
        res.sendStatus(500) //failed to serve due to server error
    }

}


const getDescription = async (req,res) => {
    const {name} = req.body
    
    if(!name){
        return res.status(400).json({"error":"Place name is required"})
    }
   
    const description = await returnDescription(name)
    res.status(200).json({"description":description})
}



module.exports = {getNearbyPlaces,getReviews,getDescription}