const AesEncryption = require('aes-encryption')

const aes = new AesEncryption()

aes.setSecretKey(String(process.env.ENCRYPTION_SECRET_KEY))
// Note: secretKey must be 64 length of only valid HEX characters, 0-9, A, B, C, D, E and F




const encryptRefreshToken = (refreshToken)=>{
   
    return(aes.encrypt(refreshToken))

}

const decryptRefreshToken = (refreshToken)=>{
    return(aes.decrypt(refreshToken))
}


module.exports = {encryptRefreshToken,
     decryptRefreshToken}
