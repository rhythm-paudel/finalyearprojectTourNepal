//geoapify a good alternative for google maps

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
    const {geometry} = req.body
    const latitude = geometry?.location?.lat
    const longitude = geometry?.location?.lng
    try{
        const reviewsList = await Reviews.findOne({'location.longitude':longitude,
                                                    'location.latitude':latitude
        });

        if((reviewsList))return res.status(200).json({"reviews":reviewsList.reviews}) 
        res.status(200).json({"reviews":[]})
    }catch(err){
        res.sendStatus(500) //failed to serve due to server error
    }

}



module.exports = {getNearbyPlaces,getReviews}