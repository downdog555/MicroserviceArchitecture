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
      return done(null, false);
    }
    
    var getTokenCallback = function(req){
        const { tokenAccess } = req.cookies;
            if (!tokenAccess) {
                        return "";    
                    
                    } else{return tokenAccess;}

    }
    var getIssuer = function(req,payload, done  ){
       return req.CurrentIssuer;
    }
const auth = jwt({secret: secretCallback, algorithms: ['HS512'], isRevoked: isRevokedCallback, getToken: getTokenCallback, issuer: getIssuer}).unless({path:['/Auth/Login', '/favicon.ico']});
module.exports = auth;