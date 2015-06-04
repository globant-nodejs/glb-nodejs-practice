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
          callback(error,{});
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
          callback(error,{});
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
          callback(error,{});
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
          callback(error,{});
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
          callback(error,{});
        }
      }); 
  }
};


