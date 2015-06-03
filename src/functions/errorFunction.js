module.exports={
  error404:function(err, req, res, next) {
    res.status(err.status || 404);
    res.send({
        message: "NOT-Found",
        error: 404
    });
  }  
};