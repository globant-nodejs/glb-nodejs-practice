var error=require('./errorFunction.js');

module.exports={
  control:function(req, res, next, name) {
      if(req.params.name==="MDIAZ88" || req.params.name==="b3nshi"){
        next();
      }else{
        error.error404();
      }
  }
};