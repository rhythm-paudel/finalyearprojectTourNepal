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


const getReviews = async (geometry)=>{
    const latitude = geometry.location.lat
    const longitude = geometry.location.lng
    try{
        const reviewsList = await Reviews.findOne({'location.longitude':longitude,
                                                    'location.latitude':latitude
        });

        if((reviewsList)) return reviewsList.reviews
        return []
    }catch(err){
        return []
    }

}

const getPhotoStream = async (photo_ref)=>{}

module.exports = {getNearbyPlaces}