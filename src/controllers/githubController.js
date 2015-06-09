var githubService=require('../services/githubService.js'),
async=require('async'),
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
        halres.link('repositories','/'+req.params.name);
        halres.link('commits',"/"+req.params.name+"/"+req.params.repo+"/commits");
        halres.link('pull-requests',"/"+req.params.name+"/"+req.params.repo+"/pulls");
        res.json(halres.toJSON());
      }
      else{
        res.status(404).json(error);
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
        res.status(404).json(error);
      }

    });     
},

getOneCommit:function(req,res){
  githubService.getSingleCommit(req.params.name,req.params.repo,req.params.sha,
    function (error,objJSON){
      if(!error){
        var halres=new hal.Resource({author:objJSON.commit.author.name,
          date:objJSON.commit.author.date,message:objJSON.commit.message,
          url:objJSON.html_url,file:objJSON.files[0].filename,id:'HAL-JSON',type:'Commit',
          origin: "Github"},"/"+req.params.name+"/"+req.params.repo+"/commits/"+req.params.sha); 
        var Files=[];
        var objfile=objJSON.files;
        for (i = 0; i < objJSON.files.length; i++) {
          Files[i] = new hal.Resource({filename:objfile[i].filename,status:objfile[i].status,
            additions:objfile[i].additions,deletions:objfile[i].deletions,
            changes:objfile[i].changes});
        }
        halres.embed("Files", Files);
        halres.link('commits',"/"+req.params.name+"/"+req.params.repo+"/commits");
        halres.link('repository',"/"+req.params.name+"/"+req.params.repo);
        halres.link('repositories',"/"+req.params.name);
        res.json(halres.toJSON());
      }
      else{
        res.status(404).json(error);
      }
    });
},

getCommits:function(req,res){
  githubService.getCommitsByRepository(req.params.name,req.params.repo,function (error,objJSON){
    if(!error){
      var halres=new hal.Resource({id:'HAL',name:'HAL+JSON',origin: "Github",type:'Commits',
        total: objJSON.length},"/"+req.params.name+"/"+req.params.repo+"/commits"); 
      var commits=[];
      for (i = 0; i < objJSON.length; i++) {
        commits[i] = new hal.Resource({
          sha:objJSON[i].sha,Commit_Date:objJSON[i].commit.author.date,
          Author:objJSON[i].commit.author.name,Message: objJSON[i].commit.message
        }, "/"+req.params.name+"/"+req.params.repo+"/commits/"+objJSON[i].sha);
      }
      halres.embed("Commits", commits);
      halres.link('pull-requests',"/"+req.params.name+"/"+req.params.repo+"/pulls");
      halres.link('repository',"/"+req.params.name+"/"+req.params.repo);
      halres.link('repositories',"/"+req.params.name);
      res.json(halres.toJSON());
    }
    else{
      res.status(404).json(error);
    }
  });
},
getOnePullRequest:function(req,res){
  githubService.getSinglePullRequest(req.params.name,req.params.repo,req.params.number,
    function (error,objJSON){
      if(!error){
        var halres=new hal.Resource({name:objJSON.title,number:objJSON.number,
          state:objJSON.state,locked:objJSON.locked,
          created_date:objJSON.created_at,updated_date:objJSON.updated_at,
          merged:objJSON.merged, commits:objJSON.commits,additions:objJSON.additions,
          deletions:objJSON.deletions,file_changes:objJSON.changed_files,
          closed_date:'HAL-JSON',type:'Pull-Request',origin: "Github"},
          "/"+req.params.name+"/"+req.params.repo+"/pulls/"+req.params.number); 
        halres.link('pull-requests',"/"+req.params.name+"/"+req.params.repo+"/pulls");
        halres.link('repository',"/"+req.params.name+"/"+req.params.repo);
        halres.link('repositories',"/"+req.params.name);
        res.json(halres.toJSON());
      }
      else{
        res.status(404).json(error);
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
          }, "/"+req.params.name+"/"+req.params.repo+"/pulls/"+objJSON[i].number);
        }
        halres.embed("Pullrequest", pullrequests);
        halres.link('commits',"/"+req.params.name+"/"+req.params.repo+"/commits");
        halres.link('repository',"/"+req.params.name+"/"+req.params.repo);
        halres.link('repositories',"/"+req.params.name);
        res.json(halres.toJSON());
      }
      else{
        res.status(404).json(error);
      }
    });
},
getPullsAndCommits:function(req,res){
  async.parallel([
    function(callback){
      githubService.getPullRequestByRepository(req.params.name,req.params.repo,function(err,objJSON){
        callback(err,objJSON);
      });
    },
    function(callback){
      githubService.getCommitsByRepository(req.params.name,req.params.repo,callback);
    }

  ],function(error,objJSON){
    if(!error){
        var halres=new hal.Resource({id:'HAL-JSON',name:'Pull-Requests And Commits',origin: "Github",
          total_Pulls: objJSON[0].length,total_Commits:objJSON[1].length},"/"+req.params.name+"/"+req.params.repo+"/all"); 
        var pullrequests=[];
        for (i = 0; i < objJSON[0].length; i++) {
          pullrequests[i] = new hal.Resource({
            id:objJSON[0][i].id,number:objJSON[0][i].number,title: objJSON[0][i].title,
            state: objJSON[0][i].state,url:objJSON[0][i].html_url
          }, "/"+req.params.name+"/"+req.params.repo+"/pulls/"+objJSON[0][i].number);
        }
        var commits=[];
        for (i = 0; i < objJSON[1].length; i++) {
          commits[i] = new hal.Resource({
            sha:objJSON[1][i].sha,Commit_Date:objJSON[1][i].commit.author.date,
            Author:objJSON[1][i].commit.author.name,Message: objJSON[1][i].commit.message
          }, "/"+req.params.name+"/"+req.params.repo+"/commits/"+objJSON[1][i].sha);
        }

        halres.embed("Pullrequest", pullrequests);
        halres.embed("Commits", commits);
        halres.link('commits',"/"+req.params.name+"/"+req.params.repo+"/commits");
        halres.link('pull-requests',"/"+req.params.name+"/"+req.params.repo+"/pulls");
        halres.link('repository',"/"+req.params.name+"/"+req.params.repo);
        halres.link('repositories',"/"+req.params.name);
        res.json(halres.toJSON());
      }
      else{
        res.status(404).json(error);
      }
  });
}


};

