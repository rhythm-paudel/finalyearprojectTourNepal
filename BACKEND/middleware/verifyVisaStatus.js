

const verifyVisaStatus = async (req,res,next)=>{
    if(req.visaStamp!=="verified") return res.status(401).json({"message":"Sorry the visa is not verified"})
    next()
}