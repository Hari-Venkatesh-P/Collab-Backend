const base64 = require('base64url');
const logger = require('../lib/logger')

function retrievePayloadFromToken(headerToken){
    if(headerToken){
        const jwtParts = headerToken.split('.');
        const payloadInBase64UrlFormat = jwtParts[1];
        const decodedPayload = base64.decode(payloadInBase64UrlFormat);
        return JSON.parse(decodedPayload)
    }
}

function checkIsValidAuth(headerToken){
    if(headerToken==""){
        logger.warn("Header not found")
        return false
    }else{
        const payloadFromToken = retrievePayloadFromToken(headerToken)
        if((payloadFromToken && payloadFromToken.role==="MEMBER" && payloadFromToken.secret =="COLLABS-SERVICES") || (payloadFromToken && payloadFromToken.role==="ADMIN" && payloadFromToken.secret =="COLLABS-SERVICES") ){
            return true
        }else{
            logger.warn("Header Mismatch")
            return false
        }
    }
}

module.exports = {
    checkIsValidAuth
}