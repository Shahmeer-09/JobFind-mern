const errorHandlermiddlerware = (err, req, res, next) => {
    console.log(err);
    const message = err.message ? err.message : "Internal server error, try again";

   const statusCode = err.statusCode? err.statusCode: 500
   res.status(statusCode).json({
    success:false,
    msg:message,
    statusCode:statusCode
   }) 
}

module.exports = {errorHandlermiddlerware};