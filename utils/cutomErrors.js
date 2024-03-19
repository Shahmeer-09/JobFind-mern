const statusCode = require('http-status-codes');

class NotfoundError extends Error{
    constructor(message){
       super(message)
       this.name = 'NotFoundError'
       this.statusCode = statusCode.NOT_FOUND;
    }
}
class  BadrequestError  extends Error{
    constructor(message){
       super(message)
       this.name = 'BadrequestError'
       this.statusCode = statusCode.BAD_REQUEST;
    }
}
class unauthorizedError extends Error{
    constructor(message){
       super(message)
       this.name = 'unauthorizedError'
       this.statusCode = statusCode.FORBIDDEN;
    }
}
class unauthenticated extends Error{
    constructor(message){
       super(message)
       this.name = 'unauthenticated'
       this.statusCode = statusCode.UNAUTHORIZED;
    }
}


module.exports= {NotfoundError, BadrequestError, unauthorizedError, unauthenticated}