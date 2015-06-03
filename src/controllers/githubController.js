var githubService=require('../services/githubService.js'),
hal=require('hal');

module.exports={
  getRepositories:function(req, res){      
    githubService.getRepositoriesByUser(req.params.name, function (error,objJSON) {
      if(!error){
        var halres=new hal.Resource({id:'HAL',name:'HAL+JSON-Test',origin: "Github",
          status: "Public",total: objJSON.length},"/"+req.params.name); 
        var Repos=[];
        for (i = 0; i < objJSON.length; i++) {
          Repos[i] = new hal.Resource({
            name:objJSON[i].name
          }, "/"+req.params.name+"/"+objJSON[i].name);
          Repos[i].link('next','/repos/'+req.params.name+'/'+objJSON[i].name+'/commits');
        }
        halres.embed("Repos", Repos);
        res.json(halres.toJSON());
      }
      else{
        res.json(error);
      }

    });     
  },
  getCommits:function(req,res){
    githubService.getCommitsByRepository(req.params.name,req.params.repo,function (error,objJSON){
      if(!error){
        var halres=new hal.Resource({id:'HAL',name:'HAL+JSON-Test2',origin: "Github",
          total: objJSON.length},"/"+req.params.name); 
        var commits=[];
        for (i = 0; i < objJSON.length; i++) {
          commits[i] = new hal.Resource({
            sha:objJSON[i].sha,Commit_Date:objJSON[i].commit.author.date,
            Author:objJSON[i].commit.author.name,Message: objJSON[i].commit.message
          }, "/"+req.params.name+"/"+objJSON[i].author.login+"/"+objJSON[i].sha);
        }
        halres.embed("Commits", commits);
        res.json(halres.toJSON());
      }
      else{
        res.json(error);
      }
    });
  },
  getPullRequest:function(req,res){
    githubService.getPullRequestByRepositorie(req.params.name,req.params.repo,function (error,objJSON){
      if(!error){
        var halres=new hal.Resource({id:'HAL',name:'HAL+JSON-Pull-Requests',origin: "Github",
          total: objJSON.length},"/"+req.params.name); 
        var pullrequests=[];
        for (i = 0; i < objJSON.length; i++) {
          pullrequests[i] = new hal.Resource({
            url:objJSON[i].url,id:objJSON[i].id,
            number:objJSON[i].number,state: objJSON[i].state,title: objJSON[i].title
          }, "/"+req.params.name+"/"+objJSON[i].id+"/"+objJSON[i].number);
        }
        halres.embed("Pullrequest", pullrequests);
        res.json(halres.toJSON());
      }
      else{
        res.json(error);
      }
    });
  }
};
