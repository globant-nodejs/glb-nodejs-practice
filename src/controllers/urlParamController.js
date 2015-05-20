var errorOne=require('./errorController.js');

module.exports={
  controlParam:function(req, res, next, name) {

      if(req.params.name==="MDIAZ88" || req.params.name==="b3nshi"){
        next();
      }else{
        errorOne.error404();
      }

  }
};