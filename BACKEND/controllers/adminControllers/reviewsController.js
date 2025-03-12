const Reviews = require("../../model/Reviews");

const reviewsController ={
    getReviews: async (req, res) => {
        try{
            const reviews = await Reviews.find()
            if(!reviews) return res.status(204).json({"reviews":[]})
            res.status(200).json({"reviews":reviews})
        }catch(e){
            res.sendStatus(500)
        }
    },
    deleteReviews: async (req, res) => {
        const {locationid, reviewid} = req.params
        if(!locationid || !reviewid) res.status(400).json({ message: "Location and Comment ID are required." });
        console.log(locationid, reviewid);
        
        try{
          

            const response =await Reviews.findOneAndUpdate(
                {
                   "_id":locationid,
                   "reviews":{
                    $elemMatch:{
                        _id:reviewid
                    }
                   }
         
                },{
                    $pull:{"reviews":{_id:reviewid}}
                },{
                    new:true
                }
            )
            if(!response) return res.status(404).json({message:"Error occured"});
            res.json({message:"Review Deleted"})
        }catch(e){
            console.log(e.message)
            return res.status(500).json({message: "Server error"});
        }
    }
};

module.exports = {reviewsController}