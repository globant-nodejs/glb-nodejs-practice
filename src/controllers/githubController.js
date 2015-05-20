var gitService=require('../services/githubService.js'),
    hal=require('hal');

module.exports={
  githubController:function(req, res){
      gitService.githubService(req.params.name, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var objString=response.body;
          var objJSON=JSON.parse(response.body);
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
    });
  }

};