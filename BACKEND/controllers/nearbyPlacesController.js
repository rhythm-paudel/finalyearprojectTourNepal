//geoapify a good alternative for google maps

const { returnDescription } = require('../api/geminiDescription');
const {getNearbyDestinations} = require('../api/googleMapsInt')
const Reviews = require('../model/Reviews');

const getNearbyPlaces = async (req,res)=>{
    const {latitude,longitude,radius,destinationType} = req.query
    const decodedRadius = radius
    //console.log(radius);
    
    if(!latitude ||!longitude|| !radius) return res.status(400).json({ message: "Location and Latitude are required." });

    if(!destinationType) return res.status(400).json({message:"Destination type is required for location fetching."})

    //now requesting from google maps api
    
    
    const destinations = await  getNearbyDestinations(latitude,longitude,decodedRadius,destinationType)
    
    
    
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
    const {name} = req.query
    
    if(!name){
        return res.status(400).json({"error":"Place name is required"})
    }
   
    const description = await returnDescription(name)
    res.status(200).json({"description":description})
}



module.exports = {getNearbyPlaces,getReviews,getDescription}