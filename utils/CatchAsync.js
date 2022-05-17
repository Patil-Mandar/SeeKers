//to avoid repeatation of writing try & catch block
module.exports = function(fn){
    return (req,res,next) => {
        fn(req,res,next).catch(e => next(e))
    }
}