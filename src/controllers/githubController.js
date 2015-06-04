var githubService=require('../services/githubService.js'),
hal=require('hal');

module.exports={
  getRepositories:function(req, res){      
    githubService.getRepositoriesByUser(req.params.name, function (error,objJSON) {
      if(!error){
        var halres=new hal.Resource({id:'HAL-JSON',name:'Repositories',origin: "Github",
          status: "Public",total: objJSON.length},"/"+req.params.name); 
        var Repos=[];
        for (i = 0; i < objJSON.length; i++) {
          Repos[i] = new hal.Resource({
            name:objJSON[i].name
          }, "/"+req.params.name+"/"+objJSON[i].name);
          Repos[i].link('next','/repos/'+req.params.name+'/'+objJSON[i].name+'/commits');
          Repos[i].link('next','/repos/'+req.params.name+'/'+objJSON[i].name+'/pulls');
        }
        halres.embed("Repos", Repos);
        res.json(halres.toJSON());
      }
      else{
        res.json("Github API: "+error);
      }

    });     
  },
  getCommits:function(req,res){
    githubService.getCommitsByRepository(req.params.name,req.params.repo,function (error,objJSON){
      if(!error){
        var halres=new hal.Resource({id:'HAL-JSON',name:'Commits',origin: "Github",
          total: objJSON.length},"/"+req.params.name+"/"+req.params.repo+"/commits"); 
        var commits=[];
        for (i = 0; i < objJSON.length; i++) {
          commits[i] = new hal.Resource({
            sha:objJSON[i].sha,Commit_Date:objJSON[i].commit.author.date,
            Author:objJSON[i].commit.author.name,Message: objJSON[i].commit.message,
            url:objJSON[i].html_url
          }, "/"+req.params.name+"/"+objJSON[i].author.login+"/"+objJSON[i].commit.author.name);
        }
        halres.embed("Commits", commits);
        res.json(halres.toJSON());
      }
      else{
        res.json("Github API: "+error);
      }
    });
  },
  getPullRequest:function(req,res){
    githubService.getPullRequestByRepositorie(req.params.name,req.params.repo,function (error,objJSON){
      if(!error){
        var halres=new hal.Resource({id:'HAL-JSON',name:'Pull-Requests',origin: "Github",
          total: objJSON.length},"/"+req.params.name+"/"+req.params.repo+"/pulls"); 
        var pullrequests=[];
        for (i = 0; i < objJSON.length; i++) {
          pullrequests[i] = new hal.Resource({
            id:objJSON[i].id,number:objJSON[i].number,title: objJSON[i].title,
            state: objJSON[i].state,url:objJSON[i].html_url
          }, "/"+req.params.name+"/"+objJSON[i].title+"/"+objJSON[i].number);
        }
        halres.embed("Pullrequest", pullrequests);
        res.json(halres.toJSON());
      }
      else{
        res.json("Github API: "+error);
      }
    });
  }
};
