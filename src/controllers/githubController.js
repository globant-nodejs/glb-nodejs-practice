var githubService=require('../services/githubService.js'),
hal=require('hal');

module.exports={
  getRepository:function(req, res){      
    githubService.getSingleRepository(req.params.name,req.params.repo,function (error,objJSON) {
      if(!error){
        var halres=new hal.Resource({name:objJSON.name,date:objJSON.created_at,
          stars:objJSON.stargazers_count,
          fork:objJSON.fork,fork_count:objJSON.forks_count,
          language:objJSON.language,watchers:objJSON.watchers,
          description:objJSON.description,url:objJSON.html_url,id:'HAL-JSON',Type:'Repository',
          origin: "Github",status: "Public"},"/"+req.params.name+"/"+req.params.repo); 
        res.json(halres.toJSON());
      }
      else{
        res.json(error);
      }

    });     
  },

  getRepositories:function(req, res){      
    githubService.getRepositoriesByUser(req.params.name, function (error,objJSON) {
      if(!error){
        var halres=new hal.Resource({id:'HAL-JSON',name:'Repositories',origin: "Github",
          status: "Public",total: objJSON.length},"/"+req.params.name); 
        var Repos=[];
        for (i = 0; i < objJSON.length; i++) {
          Repos[i] = new hal.Resource({
            name:objJSON[i].name,date:objJSON[i].created_at,stars:objJSON[i].stargazers_count,
            fork:objJSON[i].fork,fork_count:objJSON[i].forks_count,
            language:objJSON[i].language,watchers:objJSON[i].watchers,
            description:objJSON[i].description,url:objJSON[i].html_url
          }, "/"+req.params.name+"/"+objJSON[i].name);
          Repos[i].link('Commits','/'+req.params.name+'/'+objJSON[i].name+'/commits');
          Repos[i].link('PullRequest','/'+req.params.name+'/'+objJSON[i].name+'/pulls');
        }
        halres.embed("Repos", Repos);
        res.json(halres.toJSON());
      }
      else{
        res.json(error);
      }

    });     
},
getOneCommit:function(req,res){
  githubService.getSingleCommit(req.params.name,req.params.repo,req.params.sha,function (error,objJSON){
      if(!error){
        var halres=new hal.Resource({author:objJSON.commit.author.name,
          date:objJSON.commit.author.date,message:objJSON.commit.message,
          url:objJSON.html_url,file:objJSON.files[0].filename,id:'HAL-JSON',type:'Commit',
          origin: "Github"},"/"+req.params.name+"/"+req.params.repo); 
        var Files=[];
        var objfile=objJSON.files;
        for (i = 0; i < objJSON.files.length; i++) {
          Files[i] = new hal.Resource({filename:objfile[i].filename,status:objfile[i].status,
            additions:objfile[i].additions,deletions:objfile[i].deletions,
            changes:objfile[i].changes});
        }
        halres.embed("Files", Files);
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
getOnePullRequest:function(req,res){
  githubService.getSinglePullRequest(req.params.name,req.params.repo,req.params.number,
    function (error,objJSON){
      if(!error){
        res.send(objJSON);
      }
      else{
        res.json(error);
      }
    });
},
getPullRequest:function(req,res){
  githubService.getPullRequestByRepository(req.params.name,req.params.repo,function (error,objJSON){
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
        res.json(error);
      }
    });
}
};
