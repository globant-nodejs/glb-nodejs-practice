var request = require('request');

module.exports={
  getReposByUser:function(username,callback){
    request({url:'https://api.github.com/users/' +username +
    '/repos', headers: {'user-agent': 'node.js'},json:true},function(error,response,body){
          if (!error && response.statusCode == 200) {
            var objJSON=response.body;
            callback(error,objJSON);
          }
          else{
            callback(error,{});
          }
    });      
  },
  getCommitsByRepo:function(username,repository,callback){
    request({url:'https://api.github.com/repos/' +username +
    '/'+repository+'/commits', headers: {'user-agent': 'node.js'},json:true},function(error,response,body){
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


