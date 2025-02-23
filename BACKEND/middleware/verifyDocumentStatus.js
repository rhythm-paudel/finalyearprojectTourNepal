const User = require('../model/User');

const verifyUserVerification = async (req, res, next) => {
  try {
    const { email } = req;

    const userDB = await User.findOne({ email }).exec();

    if (!userDB) return res.sendStatus(404); //user not found

    if (userDB.verificationStatus !== "verified")
      return res
        .status(403)
        .json({ message: "Sorry the user is not verified" }); //forbidden to post comment

    req.User = userDB;
    next();
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

module.exports = { verifyUserVerification };