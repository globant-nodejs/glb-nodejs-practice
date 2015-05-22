var gitHubService=require('../services/githubService.js'),
    hal=require('hal');

module.exports={
  getRepositories:function(req, res){      
         gitHubService.getReposByUser(req.params.name, function (error,objJSON) {
          if(!error){
            var halres=new hal.Resource({id:'HAL',name:'HAL+JSON-Test',origin: "Github",
              status: "Public",total: objJSON.length},"/"+req.params.name); 
            var Repos=[];
            for (i = 0; i < objJSON.length; i++) {
              Repos[i] = new hal.Resource({
                name:objJSON[i].name
              }, "/"+req.params.name+"/"+objJSON[i].name);
            }
            halres.embed("Repos", Repos);
            res.json(halres.toJSON());
          }
          else{
            res.jason(error);
          }
                 
    });     
  }
};