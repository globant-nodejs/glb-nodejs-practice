var request = require('request');

module.exports={
  getSingleRepository:function(username,repository,callback){
    request({url:'https://api.github.com/repos/'+username+'/'+repository,
     headers: {'user-agent': 'node.js'},json:true},
      function(error,response,body){
        if (!error && response.statusCode == 200) {
          var objJSON=response.body;
          callback(error,objJSON);
        }
        else{
          callback({Error:response.statusCode,Message:"Repository "+repository+" NOT-Found"});
        }
      });      
  },
  getRepositoriesByUser:function(username,callback){
    request({url:'https://api.github.com/users/' +username +
      '/repos', headers: {'user-agent': 'node.js'},json:true},
      function(error,response,body){
        if (!error && response.statusCode == 200) {
          var objJSON=response.body;
          callback(error,objJSON);
        }
        else{
          callback({Error:response.statusCode,Message:"Username "+username+" NOT-Found"});
        }
      });      
  },
  getSingleCommit:function(username,repository,sha,callback){
    request({url:'https://api.github.com/repos/' +username +
      '/'+repository+'/commits/'+sha, headers: {'user-agent': 'node.js'},json:true},
      function(error,response,body){
        if (!error && response.statusCode == 200) {
          var objJSON=response.body;
          callback(error,objJSON);
        }
        else{
          callback({Error:response.statusCode,Message:"Commit NOT-Found please check the URL"});
        }
      }); 
  },
  getCommitsByRepository:function(username,repository,callback){
    request({url:'https://api.github.com/repos/' +username +
      '/'+repository+'/commits', headers: {'user-agent': 'node.js'},json:true},
      function(error,response,body){
        if (!error && response.statusCode == 200) {
          var objJSON=response.body;
          callback(error,objJSON);
        }
        else{
          callback({Error:response.statusCode,Message:"Commits NOT-Found please check the URL"});
        }
      }); 
  },
  getSinglePullRequest:function(username,repository,pullnumber,callback){
    request({url:'https://api.github.com/repos/' +username +
      '/'+repository+'/pulls/'+pullnumber, headers: {'user-agent': 'node.js'},json:true},
      function(error,response,body){
        if (!error && response.statusCode == 200) {
          var objJSON=response.body;
          callback(error,objJSON);
        }
        else{
          callback({Error:response.statusCode,Message:"Pull Request NOT-Found please check the URL"});
        }
      }); 
  },
  getPullRequestByRepository:function(username,repository,callback){
    request({url:'https://api.github.com/repos/' +username +
      '/'+repository+'/pulls', headers: {'user-agent': 'node.js'},json:true},
      function(error,response,body){
        if (!error && response.statusCode == 200) {
          var objJSON=response.body;
          callback(error,objJSON);
        }
        else{
          console.log(error);
          callback({Error:response.statusCode,Message:"Pull Requests NOT-Found please check the URL"});
        }
      }); 
  }
};


