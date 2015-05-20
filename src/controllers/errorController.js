module.exports={
  error404:function(err, req, res, next) {
    res.status(err.status || 404);
    res.send({
        message: err.message,
        error: err
    });
  },
  error500A:function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  },
  error500B:function(err, req, res, next) {
        res.status(err.status || 500);
        res.send({
          message: err.message,
          error: {}
        });
  }
};