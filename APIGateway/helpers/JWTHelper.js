const jwt = require('express-jwt');

var secretCallback = function(req,payload,done){
    var issuer = payload.iss;
    //Load secret based on issuer...
    
    
    
    
        var secret = "asdasdasda";
        done(null, secret);
    }
    var isRevokedCallback = function(req, payload, done){
        var issuer = payload.iss;
        var tokenId = payload.jti;
      //check if revoked
      var token = "";
      return done(null, !!token);
    }
    
    var getTokenCallback = function(req){
        const { token } = req.cookies;
            if (!token) {
                        return "";    
                    
                    } else{return token;}

    }
    var getIssuer = function(req,payload, done  ){
        return "localhost";
    }
const auth = jwt({secret: secretCallback, algorithms: ['RS256'], isRevoked: isRevokedCallback, getToken: getTokenCallback, issuer: getIssuer});
module.exports = auth;