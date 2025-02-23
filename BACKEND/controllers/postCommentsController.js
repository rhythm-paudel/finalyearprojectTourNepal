const Reviews = require("../model/Reviews");

const postCommentsController = {
  postComments: async (req, res) => {
    const { location, commentBody } = req.body;
    const { email, firstname, lastname } = req.User;
    let commentID;
    
    
    if (!location || !commentBody)
      return res
        .status(400)
        .json({
          message: "Location, and Comment Body are required.",
        });

    let existingReview = await Reviews.findOne({
      "location.longitude": location.longitude,
      "location.latitude": location.latitude,
    });
    try {
      if (existingReview) {
        existingReview.reviews.push({
          text: commentBody,
          email,
          firstname,
          lastname,
        });
        await existingReview.save();
        commentID = existingReview.reviews.slice(-1)[0]._id;
      } else {
        const result = await Reviews.create({
          location: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          reviews: [
            {
              text: commentBody,
              email,
              firstname,
              lastname,
            },
          ],
        });
        commentID = result.reviews[0]._id;
        console.log(result);
      }
      res.status(201).json({ success: `New Comment Created!`,
                             commentID: commentID
       });  
    } catch (e) {
      res.sendStatus(404);
    }
  },
  updateComments: async (req, res) => {
    const {location,commentBody,commentID} = req.body
    const {email} = req.User

    if(!location || !commentBody || !commentID) return res.status(400).json({ message: "Location, Comment Body and Comment ID are required." });

    try{
        const result = await Reviews.findOneAndUpdate(
            {
                "location.latitude":location.latitude,
                "location.longitude":location.longitude,
                "reviews._id":commentID,
                "reviews": {
                    $elemMatch: {
                        _id: commentID,
                        email: email
                    }
                }
            },
            {
                $set:{"reviews.$.text":commentBody}
            },
            {new:true}
        )
        if(!result){
            res.status(404).json({message:"Comment not found"})
        }
        res.status(200).json({message:"Comment Updated"})
    }catch(e){
      res.sendStatus(404)
    }
  },
  deleteComments: async (req, res) => {
    const {location,commentID} = req.body
    const {email} = req.User

    if(!location || !commentID) return res.status(400).json({ message: "Location and Comment ID are required." });

    try{
        const result = await Reviews.findOneAndUpdate(
            {
                "location.latitude":location.latitude,
                "location.longitude":location.longitude,
                "reviews._id":commentID,
                "reviews": {
                    $elemMatch: {
                        _id: commentID,
                        email: email
                    }
                }
            },
            {
                $pull:{"reviews":{_id:commentID}}
            },
            {new:true}
        )
        if(!result){
            res.status(404).json({message:"Comment not found"})
            return
        }
        res.status(200).json({message:"Comment Deleted"})
    }catch(e){
        res.sendStatus(404);
    }
  },
};

module.exports = { postCommentsController };
